package org.example.shop.repo;

import org.example.shop.entities.Product;
import org.example.shop.models.TopSellingProductDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, String> {
    @Query(value = "select * from products", nativeQuery = true)
    List<Product> getProducts(Pageable pageable);
    @Query(value = "select * from products where LOWER(products.title) like %:title% and active=true", nativeQuery = true)

    List<Product> getProductByTitle(Pageable pageable , String title);

    @Query(value = "insert into  Product(pid,title,price,description,image,size,color) values(:id,:employeeCode,:date,:reason,:status)", nativeQuery = true)
    void create(String id, String employeeCode, String date, String reason, String status);

    @Query(value = "select * from products where products.user_id = :userId", nativeQuery = true)

    List<Product> getProductBySeller(Pageable pageable , String userId);
    @Query(value = "select * from products where products.category_category_id = :id and products.active=true", nativeQuery = true)
    List<Product> getByCategory(Pageable pageable , Long id);

    long count();

    @Query(value = "SELECT p.title, SUM(b.quantity) AS quantity, SUM(b.quantity * p.price) AS revenue\n" +
            "FROM products p \n" +
            "JOIN bills b ON p.pid = b.pid\n" +
            "GROUP BY p.pid \n" +
            "ORDER BY quantity DESC \n" +
            "LIMIT 10;", nativeQuery = true)
    List<Object[]> findTop10ByTotalQuantitySold();

    List<Product> findByPriceBetween(double minPrice, double maxPrice);
    @Query(value = "select * from products where active = true", nativeQuery = true)
    List<Product> getProductActive(Pageable pageable);
}