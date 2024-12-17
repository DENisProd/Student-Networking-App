package ru.denis.finder.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.denis.finder.dto.user.UpdateUserProfileDTO;
import ru.denis.finder.dto.user.UserProfileResponseDTO;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.service.MediaService;
import ru.denis.finder.service.UserProfileService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles")
@AllArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final MediaService mediaService;

    @PostMapping("/")
    public ResponseEntity<?> createUserProfile(@RequestParam("userId") Long userId, @RequestParam("name") String name) {
        try {
            return ResponseEntity.ok(userProfileService.createUserProfile(userId, name));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(
            @PathVariable("id") Long userId,
            @RequestHeader(value = "X-User-Id", required = false) Long xUserId
    ) {
        try {
            System.out.println("X-User-Id: " + xUserId);
            return ResponseEntity.ok(userProfileService.getByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateUserProfile(@RequestBody UpdateUserProfileDTO updatedProfile) {
//        try {
            var profile = userProfileService.updateUserProfile(updatedProfile);
            return ResponseEntity.ok(profile);
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }

    }

    @PostMapping("/media")
    public ResponseEntity<?> saveMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam("profileId") Long profileId
    ) throws IOException {
        mediaService.uploadMedia(file, profileId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/random")
    public Page<UserProfileResponseDTO> getRandomUserProfiles(
            @RequestParam(name = "profile", required = false) Long profileId,
            @RequestParam(name = "interests", required = false) List<String> interests,
            @RequestParam(name = "filtered", defaultValue = "false") boolean filtered,
            Pageable pageable
    ) {
        return userProfileService.getRandomUserProfiles(interests, filtered, pageable, profileId);
    }
}
