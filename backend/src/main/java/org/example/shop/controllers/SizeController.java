package org.example.shop.controllers;

import org.example.shop.entities.Account;
import org.example.shop.entities.Size;
import org.example.shop.models.AccountModel;
import org.example.shop.repo.SizeRepo;
import org.example.shop.service.AccountService;
import org.example.shop.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/size")
public class SizeController {

    @Autowired
    SizeRepo sizeRepo;

    @GetMapping("/")
    public ResponseEntity<Response<List<Size>>> register(@RequestBody Account account){
        try {
            List<Size> sizes = sizeRepo.findAll();
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<List<Size>>(sizes,"OK"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Size>>(null,e.getMessage()));

        }
    }




}
