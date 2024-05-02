package org.example.shop.controllers;

import org.example.shop.entities.Account;
import org.example.shop.entities.Product;
import org.example.shop.models.AccountModel;
import org.example.shop.models.ProductModel;
import org.example.shop.models.TopSellingProductDTO;
import org.example.shop.service.ProductService;
import org.example.shop.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;


    @GetMapping("")
    public ResponseEntity< Response<List<Product>>> getAllProducts(@RequestParam("page") int page , @RequestParam("limit") int limit) {
        try {
            List<Product> products = productService.getProducts(page, limit);
            long count = productService.getCount();
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>(count,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Product>>(null,e.getMessage()));
        }
    }

    @GetMapping("/active")
    public ResponseEntity< Response<List<Product>>> getAllProductsActive(@RequestParam("page") int page , @RequestParam("limit") int limit) {
        try {
            List<Product> products = productService.getProductsActive(page, limit);
            long count = productService.getCount();
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>(count,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Product>>(null,e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity< Response<List<Product>>> getAllProductsActive(@RequestParam("page") int page , @RequestParam("limit") int limit ,
                                                                      @RequestParam("name") String name) {
        try {
            List<Product> products = productService.getProductByName(page, limit, name);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>(0,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Product>>(null,e.getMessage()));
        }
    }

    @GetMapping("/manage/products")
    public ResponseEntity< Response<List<Product>>> getProductBySeller(@RequestParam("page") int page , @RequestParam("limit") int limit ,
                                                                      @RequestParam("userId") String userId) {
        try {
            List<Product> products = productService.getProductBySeller(page, limit, userId);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>(0,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Product>>(null,e.getMessage()));
        }
    }

    @GetMapping("/top-selling")
    public ResponseEntity<Response<List<TopSellingProductDTO>>>  getTopSellingProducts() {
        try {
            List<TopSellingProductDTO> products = productService.getTopSellingProducts();
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<TopSellingProductDTO>>(0,products,"Ok"));
        }catch (Exception e ){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<TopSellingProductDTO>>(null,e.getMessage()));
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Response<Boolean>> create(@RequestBody ProductModel p){
        try {
        productService.create(p);
                return  ResponseEntity.status(HttpStatus.CREATED).body(new Response<Boolean>(true,"Thêm sản phẩ thành công"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }

    @PutMapping("/update")
    public ResponseEntity<Response<Boolean>> update(@RequestBody ProductModel p){
        try {
            productService.update(p);
            return  ResponseEntity.status(HttpStatus.CREATED).body(new Response<Boolean>(true,"Thêm sản phẩ thành công"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }
    @PutMapping("/stopSale")
    public ResponseEntity<Response<Boolean>> stopSale(@RequestBody List<String> id){
        try {
            productService.stopSale(id);
            return  ResponseEntity.status(HttpStatus.CREATED).body(new Response<Boolean>(true,"OK"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }
    @GetMapping("/getById")
    public ResponseEntity<Response<Product>> getById(@RequestParam("id") String id){
        try {
            Product p =  productService.getProductById(id);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<Product>(p,"Ok"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Product>(null,e.getMessage()));

        }
    }


    @GetMapping("/category")
    public ResponseEntity<Response<List<Product>>> getByCategory(@RequestParam("page") int page , @RequestParam("limit") int limit ,
                                                           @RequestParam("category") Long id){
        try {
            List<Product> p =  productService.getProductByCategory(page, limit,id);
            long count = productService.getCount();
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>( count,p,"Ok"));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<List<Product>>(null,e.getMessage()));
        }
    }

    @GetMapping("/price")
    public ResponseEntity<Response<List<Product>>> findProductsByPriceRange(
            @RequestParam("minPrice") double minPrice,
            @RequestParam("maxPrice") double maxPrice) {
        List<Product> products = productService.findProductsByPriceRange(minPrice, maxPrice);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  ResponseEntity.status(HttpStatus.OK).body(new Response<List<Product>>( 0,products,"Ok"));


    }

}
