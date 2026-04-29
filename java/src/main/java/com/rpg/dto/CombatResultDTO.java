package com.rpg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CombatResultDTO {
    private boolean playerWon;
    private Integer playerDamage;
    private Integer enemyDamage;
    private Integer expGained;
    private Integer goldGained;
    private String message;
}
