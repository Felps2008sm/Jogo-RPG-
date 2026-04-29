package com.rpg.repository;

import com.rpg.model.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    List<Quest> findByLevel(Integer level);
    List<Quest> findByActive(Boolean active);
    List<Quest> findByType(String type);
}
