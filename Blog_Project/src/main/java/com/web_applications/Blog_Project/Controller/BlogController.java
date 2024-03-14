package com.web_applications.Blog_Project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web_applications.Blog_Project.Service.PostService;
import com.web_applications.Blog_Project.model.Post;

@Controller
public class BlogController {

    private final PostService postService;

    @Autowired
    public BlogController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("posts", postService.findAllPosts());
        return "index"; // Zeigt die Hauptseite mit allen Posts an
    }

    @GetMapping("/post/{id}")
    public String viewPost(@PathVariable Long id, Model model) {
        Post post = postService.findPostById(id);
        model.addAttribute("post", post);
        return "post-view"; // Zeigt die Detailansicht eines einzelnen Posts an
    }

    @GetMapping("/post/new")
    public String newPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "post-form"; // Zeigt ein Formular zum Erstellen eines neuen Posts an
    }

    @PostMapping("/post")
    public String savePost(@ModelAttribute Post post, RedirectAttributes redirectAttributes) {
        postService.savePost(post);
        redirectAttributes.addFlashAttribute("message", "Post successfully added!");
        return "redirect:/"; // Speichert den neuen oder bearbeiteten Post und leitet zur Hauptseite um
    }

    @GetMapping("/post/edit/{id}")
    public String editPostForm(@PathVariable Long id, Model model) {
        Post post = postService.findPostById(id);
        model.addAttribute("post", post);
        return "post-form"; // Zeigt ein Formular zum Bearbeiten eines bestehenden Posts an
    }

    @PostMapping("/post/delete/{id}")
    public String deletePost(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        postService.deletePostById(id);
        redirectAttributes.addFlashAttribute("message", "Post successfully deleted!");
        return "redirect:/"; // Löscht den Post und leitet zur Hauptseite um
    }
}
