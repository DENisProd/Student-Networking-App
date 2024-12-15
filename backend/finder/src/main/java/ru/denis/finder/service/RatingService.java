package ru.denis.finder.service;

import org.springframework.stereotype.Service;
import ru.denis.finder.model.UserProfile;
import ru.denis.media.FileSize;

@Service
public class RatingService {

    public Float getRatingForUserProfile(UserProfile userProfile) {
        int ageThreshold = 16;
        int interestThreshold = 3;
        Float rating = 0f;

        if (userProfile == null) {
            throw new IllegalArgumentException("UserProfile cannot be null");
        }

        if (!userProfile.getName().equals(UserProfileService.defaultUserName)) rating += 5f;
        if (userProfile.getAge() > ageThreshold) rating += 5f;
        if (userProfile.getDescription() != null && userProfile.getDescription().length() > 10) rating += 5f;
        if (userProfile.getAbout() != null && userProfile.getAbout().length() > 10) rating += 5f;

        if (userProfile.getTarget() != null) rating += 5f;
        if (!userProfile.getInterests().isEmpty()) rating += 2.5f;
        if (userProfile.getInterests().size() > interestThreshold) rating += 2.5f;

        if (userProfile.getMediaList() != null) {
            long smallMediaCount = userProfile.getMediaList().stream()
                    .filter(media -> media != null && media.getSize() == FileSize.SMALL)
                    .count();
            rating += smallMediaCount * 5f;
        }

        return rating;
    }

}
