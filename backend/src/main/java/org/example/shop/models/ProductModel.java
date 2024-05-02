package org.example.shop.models;

import lombok.Data;

import java.util.List;

@Data
public class ProductModel {
    private String id;

    private String title;
    private double price;
    private String description;
    private List<String> size;
    private List<String> color;
    private String sellerId;
    private Long category;
}
