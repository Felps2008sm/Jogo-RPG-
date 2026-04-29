package com.rpg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "quests")
@NoArgsConstructor
@AllArgsConstructor
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private String type; // kill, collect, talk, explore

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private Integer targetQuantity;

    @Column(nullable = false)
    private Integer expReward;

    @Column(nullable = false)
    private Integer goldReward;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Boolean active;
}
