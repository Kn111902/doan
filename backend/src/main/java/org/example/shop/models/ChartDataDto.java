package org.example.shop.models;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class ChartDataDto {
    private String productId;
    private String productName;
    private Long count;
    private long reverse;
}
