package org.example.shop.models;

import lombok.Data;

import java.util.List;

@Data

public class BillRequest {
    private Long billId;
    private String userId;
    private String fullName;
    private String address;
    private String phone;
    private float sum;
}
