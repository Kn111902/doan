package org.example.shop.controllers;

import org.example.shop.entities.Category;
import org.example.shop.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryRepo categoryRepo;


    @PostMapping("/cretae")
    public ResponseEntity<Boolean> cretae(@RequestBody Category category) {
        try {
            List<Category> categoryInDatabase = categoryRepo.findByTitle(category.getTitle());
            if (categoryInDatabase.size()>0) {
                return ResponseEntity.ok(false);
            }
            category.setUrl("/categoty/"+category.getTitle());
            categoryRepo.save(category);
            return ResponseEntity.ok(true);


        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAll() {
        try {
            List<Category> category = categoryRepo.findAll();
            return ResponseEntity.ok(category);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
