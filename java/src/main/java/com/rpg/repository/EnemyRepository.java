package com.rpg.repository;

import com.rpg.model.Enemy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EnemyRepository extends JpaRepository<Enemy, Long> {
    List<Enemy> findByLevel(Integer level);
    List<Enemy> findByType(String type);
}
