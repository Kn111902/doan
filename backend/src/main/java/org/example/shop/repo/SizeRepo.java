package org.example.shop.repo;

import org.example.shop.entities.Color;
import org.example.shop.entities.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepo extends JpaRepository<Size , String> {
    List<Size> findBySidIn(List<String> ids);
}
