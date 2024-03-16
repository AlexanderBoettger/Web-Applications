package com.web_applications.Blog_Project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.web_applications.Blog_Project.Service.PostService;
import com.web_applications.Blog_Project.model.Post;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostRestController {

    private final PostService postService;

    @Autowired
    public PostRestController(PostService postService) {
        this.postService = postService;
    }

    // Erstellen eines neuen Posts
    @PostMapping("")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post newPost = postService.savePost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    // Abrufen aller Posts
    @GetMapping("")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.findAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // Abrufen eines spezifischen Posts nach ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
    Post post = postService.findPostById(id);
    return new ResponseEntity<>(post, HttpStatus.OK);
    }


    // Aktualisieren eines Posts
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(id, postDetails);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    // Löschen eines Posts
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable Long id) {
        postService.deletePostById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

