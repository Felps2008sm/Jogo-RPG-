package com.rpg.service;

import com.rpg.model.Enemy;
import com.rpg.model.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CombatService {
    private final Random random = new Random();

    public Integer calculateDamage(Integer baseDamage) {
        double variance = baseDamage * 0.2;
        return (int) (baseDamage + (random.nextDouble() * variance * 2) - variance);
    }

    public boolean isCriticalHit(Integer luck) {
        double critChance = 0.15 + (luck / 100.0);
        return random.nextDouble() < critChance;
    }

    public Integer playerAttack(Player player, Enemy enemy) {
        Integer damage = calculateDamage(player.getAttack());
        
        if (isCriticalHit(player.getLuck())) {
            damage = (int) (damage * 1.5);
        }
        
        Integer actualDamage = Math.max(1, damage - (enemy.getDefense() / 2));
        enemy.setHp(Math.max(0, enemy.getHp() - actualDamage));
        
        return actualDamage;
    }

    public Integer enemyAttack(Player player, Enemy enemy) {
        Integer damage = calculateDamage(enemy.getAttack());
        
        if (isCriticalHit(enemy.getLuck() != null ? enemy.getLuck() : 5)) {
            damage = (int) (damage * 1.3);
        }
        
        Integer actualDamage = Math.max(1, damage - (player.getDefense() / 2));
        player.setHp(Math.max(0, player.getHp() - actualDamage));
        
        return actualDamage;
    }

    public boolean isPlayerTurn(Player player, Enemy enemy) {
        return player.getSpeed() >= enemy.getSpeed();
    }

    public boolean isAlive(Integer hp) {
        return hp > 0;
    }
}
