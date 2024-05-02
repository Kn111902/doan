package org.example.shop.service;

import jakarta.transaction.Transactional;
import org.example.shop.entities.*;
import org.example.shop.models.AccountModel;
import org.example.shop.models.ProductModel;
import org.example.shop.models.TopSellingProductDTO;
import org.example.shop.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements  ProductService {

    @Autowired
    ProductRepo productRepo;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    SizeRepo sizeRepo;
    @Autowired
    ColorRepo colorRepo;
    @Autowired
    CategoryRepo categoryRepo;

    public  AccountModel mapToModel (Account account){
        return  AccountModel.builder()
                .userId(account.getUserId())
                .username(account.getUsername())
                .phone(account.getPhone())
                .addressDetail(account.getAddressDetail())
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .isSellers(account.isSellers())
                .province(account.getProvince())
                .district(account.getDistrict())
                .avatar(account.getAvatar())
                .build();
    }

    @Override
    public List<Product> getProducts(int page, int limit) throws Exception {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            return  productRepo.getProducts(pageable);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public List<Product> getProductByName(int page, int limit, String name) throws Exception {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            return  productRepo.getProductByTitle(pageable,name);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public void create(ProductModel p) throws Exception {
        try {
            Optional<Account> user = accountRepo.findById(p.getSellerId());
            Product product = new Product();
            product.setPid(p.getId());
            product.setTitle(p.getTitle());
            product.setDescription(p.getDescription());
            product.setPrice(p.getPrice());
            product.setSeller(user.get());
            Optional<Category> c =  categoryRepo.findById(p.getCategory());
            product.setCategory(c.get());
            List<Color>  colors = colorRepo.findByCidIn(p.getColor());
            List<Size> sizes = sizeRepo.findBySidIn(p.getSize());
            product.setColor(colors);
            product.setSize(sizes);
            productRepo.save(product);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public void update(ProductModel p) throws Exception {
        try {
            Optional<Product>  product =  productRepo.findById(p.getId());
            if(product.isEmpty()){
            throw new Exception("Product not found");
            }
            List<Color> colors = colorRepo.findByCidIn(p.getColor());
            List<Size> sizes = sizeRepo.findBySidIn(p.getSize());
            product.get().setTitle(p.getTitle());
            product.get().setDescription(p.getDescription());
            product.get().setPrice(p.getPrice());
            product.get().setColor(colors);
            Optional<Category> c =  categoryRepo.findById(p.getCategory());
            product.get().setCategory(c.get());
            product.get().setSize(sizes);
            productRepo.save(product.get());
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public Product getProductById(String id) throws Exception {
        try {
            return  productRepo.findById(id).get();
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public List<Product> getProductBySeller(int page, int limit, String userId) throws  Exception{
        try {
            Pageable pageable = PageRequest.of(page, limit);
            return  productRepo.getProductBySeller(pageable,userId);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public List<Product> getProductByCategory( int page, int limit,Long id) throws Exception {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            return  productRepo.getByCategory(pageable,id);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public  long getCount (){
        return  productRepo.count();
    }

    @Override
    @Transactional
    public void stopSale(List<String> ids) {
        for (String id : ids){
            try {
                Optional<Product> p = productRepo.findById(id);
                p.get().setActive(!p.get().isActive());
                productRepo.save(p.get());
            }
            catch (Exception e){
                return;
            }

        }
    }

    public List<TopSellingProductDTO> getTopSellingProducts() {
        List<Object[]> results = productRepo.findTop10ByTotalQuantitySold();

        List<TopSellingProductDTO> topProducts = results.stream()
                .map(obj -> new TopSellingProductDTO((String) obj[0], ((Number) obj[1]).longValue(),((Number) obj[2]).longValue()))
                .collect(Collectors.toList());

        return topProducts;
    }

    @Override
    public List<Product> findProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepo.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<Product> getProductsActive(int page, int limit) throws Exception {
        Pageable pageable = PageRequest.of(page, limit);
        return  productRepo.getProductActive(pageable);
    }

}
