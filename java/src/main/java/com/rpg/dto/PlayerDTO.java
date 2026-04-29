package com.rpg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDTO {
    private Long id;
    private String name;
    private String className;
    private Integer level;
    private Integer exp;
    private Integer gold;
    private Integer hp;
    private Integer maxHp;
    private Integer mana;
    private Integer maxMana;
    private Integer stamina;
    private Integer maxStamina;
    private Integer attack;
    private Integer defense;
    private Integer speed;
    private Integer luck;
}
