package com.web_applications.Blog_Project.repository;

import com.web_applications.Blog_Project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Hier können zusätzliche Methoden definiert werden, falls spezielle Datenabfragen benötigt werden.
}
