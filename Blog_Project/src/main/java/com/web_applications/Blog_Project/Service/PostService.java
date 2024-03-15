package com.web_applications.Blog_Project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web_applications.Blog_Project.model.Post;
import com.web_applications.Blog_Project.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Post findPostById(Long id) {
        Optional<Post> result = postRepository.findById(id);
        return result.orElseThrow(() -> new RuntimeException("Post not found for id: " + id));
    }

   public Post savePost(Post post) {
    return postRepository.save(post);
}

    public void deletePostById(Long id) {
        postRepository.deleteById(id);
    }

    public Post updatePost(Long id, Post postDetails) {
        return postRepository.findById(id)
            .map(existingPost -> {
                existingPost.setTitle(postDetails.getTitle());
                existingPost.setContent(postDetails.getContent());
                // Set any other properties that need to be updated
                return postRepository.save(existingPost);
            })
            .orElseThrow(() -> new RuntimeException("Post not found for id: " + id));
    }
    
}
