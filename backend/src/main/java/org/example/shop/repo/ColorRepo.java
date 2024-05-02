package org.example.shop.repo;

import org.example.shop.entities.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepo extends JpaRepository<Color , String> {
    List<Color> findByCidIn(List<String> ids);
}
