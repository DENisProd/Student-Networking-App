package ru.denis.finder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import ru.denis.category.CategoryDTO;
import ru.denis.category.CategoryType;
import ru.denis.finder.dto.user.UpdateUserProfileDTO;
import ru.denis.finder.dto.user.UserProfileResponseDTO;
import ru.denis.finder.model.*;
import ru.denis.finder.repository.UserProfileRepository;
import ru.denis.media.FileSize;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    @Value("${api.category_server}")
    private String categoryServerUrl;

    public static final String defaultUserName = "Без имени";

    private final UserProfileRepository userProfileRepository;
    private final RestTemplate restTemplate;
    private final RatingService ratingService;

    public UserProfile createUserProfile(Long userId, String name) {
        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(userId);
        userProfile.setName(name);
        userProfile.setLastActivityAt(LocalDateTime.now());
        userProfile.setIsOnline(true);
        // TODO: hide sensitive fields
        return userProfileRepository.save(userProfile);
    }

    public void updateActivity(Long id, boolean isOnline) {
        userProfileRepository.findById(id).map(userProfile -> {
            if (isOnline) userProfile.setLastActivityAt(LocalDateTime.now());
            userProfile.setIsOnline(isOnline);
            return userProfileRepository.save(userProfile);
        });
    }

    public UserProfile getByIdWithoutCategories (Long profileId) {
        return userProfileRepository.findById(profileId).orElse(null);
    }
    public UserProfile getByUserIdWithoutCategories (Long userId) {
        return userProfileRepository.findByUserId(userId).orElse(null);
    }

    @Transactional
    public UserProfileResponseDTO getByUserId(Long userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    if (!doesUserExist(userId)) {
                        throw new NoSuchElementException("User does not exist");
                    }
                    return createUserProfile(userId, defaultUserName);
                });

        return getUserProfileWithCategories(userProfile);
    }

    // Check if user exists in auth server
    private boolean doesUserExist(Long userId) {
        return true;
    }

    @Transactional
    public UserProfileResponseDTO updateUserProfile(UpdateUserProfileDTO updatedProfile) {
        UserProfile profile = userProfileRepository.findById(updatedProfile.id()).orElseThrow(() -> new IllegalArgumentException("UserProfile ID must not be null"));
        profile.setName(updatedProfile.name());
        profile.setAbout(updatedProfile.about());
        profile.setDescription(updatedProfile.description());
        profile.setAge(updatedProfile.age());

        try {
            SexType sexType = SexType.valueOf(updatedProfile.sex().toUpperCase());
            profile.setSex(sexType);
        } catch (IllegalArgumentException ignored) {
        }

        try {
            if (updatedProfile.targetId() != 0) {
                String url = categoryServerUrl + "/" + updatedProfile.targetId();
                CategoryDTO targetCategory = restTemplate.getForObject(url, CategoryDTO.class);

                if (targetCategory.type() == CategoryType.TARGET) {
                    profile.setTarget(targetCategory.id());
            }
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        profile.getInterests().clear();
        updatedProfile.interests().forEach(interestId -> {
            addInterestToUserProfile(profile.getId(), interestId);
        });

        List<CategoryDTO> categories = fetchCategoriesByIds(updatedProfile.interests());
        categories.forEach(category -> {
            if (category.type() == CategoryType.INTERESTS) {
                profile.getInterests().add(category.id());
            }
        });

        updateActivity(updatedProfile.id(), true);

        profile.setRating(ratingService.getRatingForUserProfile(profile));
        userProfileRepository.save(profile);

        return getUserProfileWithCategories(profile);
    }

    @Transactional
    public Page<UserProfileResponseDTO> getRandomUserProfiles(List<String> interests, boolean filtered, Pageable pageable) {
        Page<UserProfile> userProfiles;

        if (filtered) {
            userProfiles = userProfileRepository.findRandomByMatchingInterests(interests, pageable);
        } else {
            userProfiles = userProfileRepository.findRandom(pageable);
        }

        List<UserProfileResponseDTO> dtoList = userProfiles.getContent()
                .stream()
                .map(this::getUserProfileWithCategories)
                .toList();

        return new PageImpl<>(dtoList, pageable, userProfiles.getTotalElements());
    }

    @Transactional
    public void addInterestToUserProfile(Long userProfileId, Long interestId) {
        UserProfile userProfile = userProfileRepository.findById(userProfileId)
                .orElseThrow(() -> new RuntimeException("UserProfile not found"));

//        Category interest = new Category();
//        Category interest = categoryService.findById(interestId)
//                .orElseThrow(() -> new RuntimeException("Interest category not found"));

//        if (interest.getType() == CategoryType.INTERESTS) {
//            userProfile.getInterests().add(interest);
//            userProfileRepository.save(userProfile);
//        } else {
//            throw new IllegalArgumentException("Category type mismatch: expected INTERESTS type");
//        }
    }

    private UserProfileResponseDTO getUserProfileWithCategories (UserProfile userProfile) {
        List<Long> requestedCategories = new ArrayList<>();
        requestedCategories.addAll(userProfile.getInterests().stream().toList());
        requestedCategories.add(userProfile.getTarget());
        List<CategoryDTO> categories = fetchCategoriesByIds(requestedCategories);

        List<CategoryDTO> interests = categories.stream()
                .filter(category -> category.type() == CategoryType.INTERESTS)
                .toList();

        CategoryDTO target = categories.stream()
                .filter(category -> category.type() == CategoryType.TARGET)
                .findFirst()
                .orElse(null);

        return convertToProfileDTO(userProfile, interests, target);
    }

    private List<CategoryDTO> fetchCategoriesByIds(List<Long> categoryIds) {
        if (categoryIds == null) {
            return List.of();
        }

        categoryIds = categoryIds.stream()
                .filter(Objects::nonNull)
                .toList();

        if (categoryIds.isEmpty()) {
            return List.of();
        }
        try {
            String idsParam = String.join(",", categoryIds.stream().map(String::valueOf).toList());
            String url = categoryServerUrl + "/ids?ids=" + idsParam;

            ResponseEntity<List<CategoryDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<CategoryDTO>>() {}
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch categories", e);
        }
    }

    private UserProfileResponseDTO convertToProfileDTO (UserProfile profile, List<CategoryDTO> interests, CategoryDTO target) {
        return new UserProfileResponseDTO(
                profile.getId(),
                profile.getUserId(),
                profile.getName(),
                profile.getAbout(),
                profile.getDescription(),
                profile.getAge(),
                profile.getSex(),
                interests,
                target,
                profile.getMediaList()
        );
    }
}
