package org.example.shop.models;

import lombok.Data;

@Data
public class BuyRequest {
    private String name;
    private double price;
    private int quantity;
    private String image;
    private String size;
    private String color;
    private Long billId;
    private String productId;
}