package com.rpg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "items")
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // heal, mana, stamina, weapon, armor

    @Column(nullable = false)
    private String icon;

    @Column(nullable = false)
    private Integer value;

    @Column(nullable = false)
    private String rarity; // comum, raro, épico, lendário

    @Column(nullable = false)
    private String description;
}
