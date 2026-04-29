package com.rpg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "players")
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String className; // warrior, mage, rogue, paladin

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Integer exp;

    @Column(nullable = false)
    private Integer gold;

    @Column(nullable = false)
    private Integer hp;

    @Column(nullable = false)
    private Integer maxHp;

    @Column(nullable = false)
    private Integer mana;

    @Column(nullable = false)
    private Integer maxMana;

    @Column(nullable = false)
    private Integer stamina;

    @Column(nullable = false)
    private Integer maxStamina;

    @Column(nullable = false)
    private Integer attack;

    @Column(nullable = false)
    private Integer defense;

    @Column(nullable = false)
    private Integer speed;

    @Column(nullable = false)
    private Integer luck;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastPlayedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastPlayedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastPlayedAt = LocalDateTime.now();
    }
}
