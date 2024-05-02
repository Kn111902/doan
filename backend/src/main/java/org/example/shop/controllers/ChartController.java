package org.example.shop.controllers;

import org.example.shop.models.ChartDataDto;
import org.example.shop.repo.BuyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
@RestController
public class ChartController {
    @Autowired
    BuyRepo buyRepo;
    @GetMapping(value = "/dataChartQty")
    public ResponseEntity<List<ChartDataDto>> dataChart()  {
        List<Object[]> results = buyRepo.findTopProducts();
        List<ChartDataDto> topProducts = results.stream()
                .map(obj -> new ChartDataDto((String) obj[0], (String) obj[1],
                        ((Number) obj[2]).longValue(),((Number)
                        obj[3]).longValue()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(topProducts);
    }
}
