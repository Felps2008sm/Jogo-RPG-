package com.rpg.service;

import com.rpg.model.NPC;
import com.rpg.repository.NPCRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NPCService {
    private final NPCRepository npcRepository;

    public Optional<NPC> getNPCById(Long id) {
        return npcRepository.findById(id);
    }

    public NPC getNPCByName(String name) {
        return npcRepository.findByName(name);
    }

    public List<NPC> getNPCsByType(String type) {
        return npcRepository.findByType(type);
    }

    public List<NPC> getNPCsByLocation(String locationName) {
        return npcRepository.findByLocationName(locationName);
    }

    public NPC createNPC(NPC npc) {
        return npcRepository.save(npc);
    }

    public List<NPC> getAllNPCs() {
        return npcRepository.findAll();
    }
}
