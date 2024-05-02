package org.example.shop.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "sizes")
public class Size {
    @Id
    @Column(name = "sid")
    private String sid;
    private String name;
}
