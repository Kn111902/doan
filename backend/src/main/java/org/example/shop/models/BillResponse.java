package org.example.shop.models;

import lombok.Data;
import org.example.shop.entities.Bill;
import org.example.shop.entities.Buy;

import java.util.ArrayList;
import java.util.List;
@Data
public class BillResponse {
    private Bill bill;
    private List<Buy> buyList = new ArrayList<>();
}
