package org.example.shop.controllers;

import org.example.shop.entities.Account;
import org.example.shop.entities.Product;
import org.example.shop.models.AccountModel;
import org.example.shop.service.AccountService;
import org.example.shop.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<Response<Boolean>> register(@RequestBody Account account){
        try {
            Boolean created = accountService.register(account);
            if(created==true){
            return  ResponseEntity.status(HttpStatus.CREATED).body(new Response<Boolean>(true,"Tạo tài khoản thành công."));
            }
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<Boolean>(false,"Tài khoản đã tồn tại rồi."));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }

    @PostMapping("/login")
    public ResponseEntity<AccountModel> login(@RequestBody Account account) throws  Exception{
        try {
            AccountModel user = accountService.login(account);
        if(user==null){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
            return  ResponseEntity.status(HttpStatus.OK).body(user);

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
    }

    @PutMapping("/update")
    public ResponseEntity<AccountModel> update(@RequestBody Account account) throws  Exception{
        try {
            AccountModel acc = accountService.update(account, account.getUserId());
            if(acc==null){
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return  ResponseEntity.status(HttpStatus.OK).body(acc);

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/lock")
    public ResponseEntity<Response<Boolean>> stopLock(@RequestBody List<String> id){
        try {
            accountService.lockAcc(id);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<Boolean>(true,"OK"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }
    @GetMapping("/getUser")
    public ResponseEntity<Response<AccountModel>> getUserById(@RequestParam("userId") String  userId) throws  Exception{
        try {
            AccountModel user = accountService.getUserById(userId);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<AccountModel>(user,"Ok"));

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<AccountModel>(null,e.getMessage()));

        }
    }

    @GetMapping("/manage")
    public ResponseEntity< Response<List<Account>>> getAllUser(@RequestParam("page") int page , @RequestParam("limit") int limit) {
        try {
            List<Account> products = accountService.getAccount(page, limit);
            long count = accountService.getCount();
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Account>>(count,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Account>>(null,e.getMessage()));
        }
    }


    @GetMapping("/manage/search")
    public ResponseEntity< Response<List<Account>>> getCusByName(@RequestParam("page") int page , @RequestParam("limit") int limit ,
                                                                      @RequestParam("name") String name) {
        try {
            List<Account> a = accountService.getAccByName(page, limit, name);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Account>>(0,a,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Account>>(null,e.getMessage()));
        }
    }



}
