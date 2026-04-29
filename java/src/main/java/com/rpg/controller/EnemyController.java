package com.rpg.controller;

import com.rpg.model.Enemy;
import com.rpg.service.EnemyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enemies")
@RequiredArgsConstructor
public class EnemyController {
    private final EnemyService enemyService;

    @GetMapping("/{id}")
    public ResponseEntity<Enemy> getEnemy(@PathVariable Long id) {
        Optional<Enemy> enemy = enemyService.getEnemyById(id);
        return enemy.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Enemy>> getEnemiesByLevel(@PathVariable Integer level) {
        List<Enemy> enemies = enemyService.getEnemiesByLevel(level);
        return ResponseEntity.ok(enemies);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Enemy>> getEnemiesByType(@PathVariable String type) {
        List<Enemy> enemies = enemyService.getEnemiesByType(type);
        return ResponseEntity.ok(enemies);
    }

    @PostMapping
    public ResponseEntity<Enemy> createEnemy(@RequestBody Enemy enemy) {
        Enemy createdEnemy = enemyService.createEnemy(enemy);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEnemy);
    }

    @GetMapping("/random/{level}")
    public ResponseEntity<Enemy> getRandomEnemyByLevel(@PathVariable Integer level) {
        Enemy enemy = enemyService.getRandomEnemyByLevel(level);
        if (enemy != null) {
            return ResponseEntity.ok(enemy);
        }
        return ResponseEntity.notFound().build();
    }
}
