package com.rpg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "enemies")
@NoArgsConstructor
@AllArgsConstructor
public class Enemy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // goblin, orc, skeleton, etc

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Integer hp;

    @Column(nullable = false)
    private Integer maxHp;

    @Column(nullable = false)
    private Integer attack;

    @Column(nullable = false)
    private Integer defense;

    @Column(nullable = false)
    private Integer speed;

    @Column(nullable = false)
    private Integer expReward;

    @Column(nullable = false)
    private Integer goldReward;
}
