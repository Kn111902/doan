package org.example.shop.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopSellingProductDTO {
    private String productName;
    private long totalQuantitySold;
    private long revenue;

    // Constructor, getters, and setters
}

