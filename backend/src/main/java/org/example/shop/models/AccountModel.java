package org.example.shop.models;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountModel {
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String district;
    private String province;
    private String avatar;
    private String addressDetail;
    private boolean isSellers;
}
