package org.example.shop.entities;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "buy")
public class Buy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private double price;

    @Column(name = "size")
    private String size;

    @Column(name = "color_pid")
    private String colorPid;

    @Column(name = "image")
    private String image;
    private String productName;
    private String productId;
    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;
}

