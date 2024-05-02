package org.example.shop.controllers;

import org.example.shop.entities.Account;
import org.example.shop.entities.Color;
import org.example.shop.entities.Size;
import org.example.shop.repo.ColorRepo;
import org.example.shop.repo.SizeRepo;
import org.example.shop.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/color")
public class ColorController {

    @Autowired
    ColorRepo colorRepo;

    @GetMapping("/")
    public ResponseEntity<Response<List<Color>>> getColor(){
        try {
            List<Color> colors = colorRepo.findAll();
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<List<Color>>(colors,"OKs"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Color>>(null,e.getMessage()));

        }
    }




}
