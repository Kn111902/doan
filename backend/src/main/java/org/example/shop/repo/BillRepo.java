package org.example.shop.repo;

import org.example.shop.entities.Bill;
import org.example.shop.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepo extends JpaRepository<Bill, Long> {

    @Query(value = "select * from bills", nativeQuery = true)
    List<Bill> getBills(Pageable pageable);
    @Query(value = "select * from bills where bills.user_id = :userId", nativeQuery = true)
    List<Bill> getBillByUser(String userId);

//    List<Bill> findByAccountFullNameContaining(String keyword);
    List<Bill> findByUserId(String userId);
    List<Bill> findByFullNameContaining(String userId);
}
