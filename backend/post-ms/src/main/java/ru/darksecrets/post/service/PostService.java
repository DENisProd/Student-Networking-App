package ru.darksecrets.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import ru.darksecrets.post.dto.PostCreateDTO;
import ru.darksecrets.post.dto.PostResponseDTO;
import ru.darksecrets.post.dto.ReactionDTO;
import ru.darksecrets.post.exception.ResourceNotFoundException;
import ru.darksecrets.post.model.Post;
import ru.darksecrets.post.model.Reaction;
import ru.darksecrets.post.repository.PostRepository;
import ru.denis.category.CategoryDTO;
import ru.denis.category.CategoryType;
import ru.denis.media.FileSize;
import ru.denis.media.MediaDTO;

import java.util.stream.Collectors;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final RestTemplate restTemplate;
    private final MediaService mediaService;

    private final MongoTemplate mongoTemplate;

    @Value("${api.category_server}")
    private String categoryServerUrl;

    public PostResponseDTO createPost (PostCreateDTO postCreateDTO, Long userId, MultipartFile cover) {
        List<CategoryDTO> categories = fetchCategoriesByIds(postCreateDTO.categories());

        // TODO: check organization

        Post newPost = new Post();
        newPost.setContent(postCreateDTO.content());
        newPost.setTitle(postCreateDTO.title());
        newPost.setOrganizationId(postCreateDTO.organizationId());
        newPost.setAuthor(userId);

        List<MediaDTO> tempMedia = new ArrayList<>();
        tempMedia.add(new MediaDTO("", FileSize.LOADING));
        newPost.setCover(tempMedia);

        List<Long> filteredCategories = categories.stream().filter(category -> category.type() == CategoryType.CATEGORY).map(category -> category.id()).toList();

        newPost.setCategories(new HashSet<>(filteredCategories));

        Post savedPost = postRepository.save(newPost);

        if (cover != null) mediaService.uploadMedia(cover, savedPost.getId());
        // TODO: send to notification

        return toPostDTO(savedPost, categories);
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

    public Post findById(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
    }

    public PostResponseDTO findById(String id, String ip, String clientId) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        viewPost(post.getId(), clientId, ip);

        List<CategoryDTO> categories = fetchCategoriesByIds(post.getCategories().stream().toList());
        return toPostDTO(post, categories);
    }

    public Page<PostResponseDTO> getFeed (String clientId, Long category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Query query = new Query().with(pageable);

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        List<Post> posts = mongoTemplate.find(query, Post.class);
        long total = mongoTemplate.count(query.skip(0).limit(0), Post.class);

        List<PostResponseDTO> postsWithCategories = posts.stream().map(post -> {
            List<CategoryDTO> categories = fetchCategoriesByIds(post.getCategories().stream().toList());
            return toPostDTO(post, categories);
        }).toList();

        return new PageImpl<>(postsWithCategories, pageable, total);
    }

    public Page<Post> searchPosts(String keyword, List<Long> categories, int page, int size) {
        // Создание объекта Pageable
        Pageable pageable = PageRequest.of(page, size);

        // Создание запроса
        Query query = new Query().with(pageable);

        // Фильтр по ключевому слову
        if (keyword != null && !keyword.isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("title").regex(keyword, "i"), // Поиск по заголовку
                    Criteria.where("content").regex(keyword, "i") // Поиск по содержимому
            ));
        }

        // Фильтр по категориям
        if (categories != null && !categories.isEmpty()) {
            query.addCriteria(Criteria.where("categories").in(categories));
        }

        // Получение результатов
        List<Post> posts = mongoTemplate.find(query, Post.class);
        long total = mongoTemplate.count(query.skip(0).limit(0), Post.class); // Подсчет общего числа

        return new PageImpl<>(posts, pageable, total);
    }

    public Boolean reactToPost (String clientId, String ip, ReactionDTO reactionDTO) {
        Post post = postRepository.findById(reactionDTO.getPostId()).orElse(null);
        if (post == null) return false;

        boolean isReactionExisted = post.getReactions().stream()
                .anyMatch(react -> react.getUserId().equals(clientId));

        if (checkUniqueUser(clientId, ip) && !isReactionExisted) {
            Reaction newReaction = new Reaction(reactionDTO.getEmoji(), clientId);
            post.getReactions().add(newReaction);

            postRepository.save(post);
            return true;
        }
        return false;
    }

    private boolean checkUniqueUser(String clientId, String ip) {
        // TODO: send request to remote backend
        return true;
    }

    private void viewPost (String postId, String clientId, String ipAddress) {
        Post post = postRepository.findById(postId).orElse(null);
        post.getUniqueViews().add(clientId);
        postRepository.save(post);
    }

    private PostResponseDTO toPostDTO (Post post, List<CategoryDTO> categoryDTOs) {
        Map<String, Integer> reactions = post.getReactions().stream()
                .collect(Collectors.groupingBy(Reaction::getEmoji, Collectors.summingInt(e -> 1)));

        return new PostResponseDTO(
                post.getId(),
                post.getOrganizationId(),
                post.getOrganizationName(),
                post.getTitle(),
                post.getContent(),
                post.getCover(),
                post.getCreatedAt(),
                reactions,
                new ArrayList<>(),
                post.getUniqueViews().size(),
                categoryDTOs
        );
    }
}
