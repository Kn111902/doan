package org.example.shop.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    private String pid;
    private String title;
    private double price;
    private String description;
    private String image;
    @ManyToOne
    private Category category;
    @ManyToMany
    private List<Size> size;
    @ManyToMany
    private List<Color> color;
    @ManyToOne
    @JoinColumn(name = "userId")
    private Account seller;
    private  boolean active ;
    @Column(nullable = true)
    private  Boolean hot ;
    @Column(nullable = true)
    private  Boolean newProduct ;
    @PrePersist
    protected void onCreate() {
        active = true;
    }


}
