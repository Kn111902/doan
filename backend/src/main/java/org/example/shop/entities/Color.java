package org.example.shop.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "colors")
public class Color {
    @Id
    @Column(name = "cid")
    private String cid;
    private String name;

}
