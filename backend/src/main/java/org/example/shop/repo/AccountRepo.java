package org.example.shop.repo;

import org.example.shop.entities.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo  extends JpaRepository<Account , String> {
    Optional<Account> findByUsername(String username);
    Optional<Account> findByUsernameAndPasswordAndActive(String username , String password , boolean active);
    @Query(value = "select * from users", nativeQuery = true)
    List<Account> getAccounts(Pageable pageable);
    @Query(value = "select * from users where LOWER(users.full_name) like %:name% ", nativeQuery = true)
    List<Account> getAccByTitle(Pageable pageable, String name);
}
