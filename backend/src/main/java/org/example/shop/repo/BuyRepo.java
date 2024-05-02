package org.example.shop.repo;

import org.example.shop.entities.Buy;
import org.example.shop.models.ChartDataDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepo extends JpaRepository<Buy, Long> {

    List<Buy> findByBillId(Long id);
    void  deleteByBillId(Long id);

    @Query(value = "SELECT b.product_id, b.product_name, SUM(b.quantity) AS sum, SUM(b.quantity * b.price) AS revenue " +
            "FROM buy b " +
            "GROUP BY b.product_id, b.product_name " +
            "LIMIT 10", nativeQuery = true)
    List<Object[]> findTopProducts();

}
