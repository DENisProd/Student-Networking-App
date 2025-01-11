package ru.darksecrets.post.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.darksecrets.post.dto.PostCreateDTO;
import ru.darksecrets.post.dto.PostResponseDTO;
import ru.darksecrets.post.dto.ReactionDTO;
import ru.darksecrets.post.model.Post;
import ru.darksecrets.post.service.PostService;

import java.util.List;

@RestController
@RequestMapping("api/v2/post/")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
//    @PostMapping
    public PostResponseDTO createPost (
            @RequestHeader(value = "X-User-ID", required = false) String userId,
            @RequestPart(name = "post") PostCreateDTO postCreateDTO,
            @RequestPart(name = "cover", required = false) MultipartFile cover
    ) {
        return postService.createPost(postCreateDTO, Long.parseLong(userId), cover);
    }

    @GetMapping("search")
    public Page<Post> searchPosts(
            @RequestParam("keyword") String keyword,
            @RequestParam(name = "categories", required = false) List<Long> categories,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return postService.searchPosts(keyword, categories, page, size);
    }

    @GetMapping("feed")
    public Page<PostResponseDTO> getFeed(
            @RequestHeader(value = "X-Client-ID", required = false) String clientId,
            @RequestParam(name = "category", required = false) Long category,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return postService.getFeed(clientId, category, page, size);
    }

    @PostMapping("react")
    public Boolean reactToPost (
            @RequestHeader(value = "X-Client-ID") String clientId,
            @RequestHeader(value = "X-Real-IP") String ip,
            @RequestBody ReactionDTO reactionDTO
            ) {
        return postService.reactToPost(clientId, ip, reactionDTO);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> fetchOne (
            @PathVariable("id") String id,
            @RequestHeader(value = "X-Client-ID", required = false) String clientId,
            @RequestHeader(value = "X-Real-IP", required = false) String ip
    ) {
//        @RequestHeader(value = "X-User-ID", required = false) String userId,
        return ResponseEntity.ok(postService.findById(id, ip, clientId));
    }
}
