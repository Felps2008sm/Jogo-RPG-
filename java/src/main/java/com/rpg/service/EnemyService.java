package com.rpg.service;

import com.rpg.model.Enemy;
import com.rpg.repository.EnemyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EnemyService {
    private final EnemyRepository enemyRepository;
    private final Random random = new Random();

    public Optional<Enemy> getEnemyById(Long id) {
        return enemyRepository.findById(id);
    }

    public List<Enemy> getEnemiesByLevel(Integer level) {
        return enemyRepository.findByLevel(level);
    }

    public List<Enemy> getEnemiesByType(String type) {
        return enemyRepository.findByType(type);
    }

    public Enemy createEnemy(Enemy enemy) {
        return enemyRepository.save(enemy);
    }

    public Enemy getRandomEnemyByLevel(Integer level) {
        List<Enemy> enemies = getEnemiesByLevel(level);
        if (!enemies.isEmpty()) {
            return enemies.get(random.nextInt(enemies.size()));
        }
        return null;
    }
}
