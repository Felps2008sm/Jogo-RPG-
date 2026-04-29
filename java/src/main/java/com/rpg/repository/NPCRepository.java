package com.rpg.repository;

import com.rpg.model.NPC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NPCRepository extends JpaRepository<NPC, Long> {
    NPC findByName(String name);
    List<NPC> findByType(String type);
    List<NPC> findByLocationName(String locationName);
}
