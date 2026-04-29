package com.rpg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "npcs")
@NoArgsConstructor
@AllArgsConstructor
public class NPC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // merchant, quest_giver, companion

    @Column(nullable = false)
    private String icon;

    @Column(nullable = false, length = 500)
    private String dialog;

    @Column(nullable = false)
    private String locationName;
}
