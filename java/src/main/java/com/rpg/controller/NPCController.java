package com.rpg.controller;

import com.rpg.model.NPC;
import com.rpg.service.NPCService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/npcs")
@RequiredArgsConstructor
public class NPCController {
    private final NPCService npcService;

    @GetMapping("/{id}")
    public ResponseEntity<NPC> getNPC(@PathVariable Long id) {
        Optional<NPC> npc = npcService.getNPCById(id);
        return npc.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<NPC> getNPCByName(@PathVariable String name) {
        NPC npc = npcService.getNPCByName(name);
        if (npc != null) {
            return ResponseEntity.ok(npc);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<NPC>> getNPCsByType(@PathVariable String type) {
        List<NPC> npcs = npcService.getNPCsByType(type);
        return ResponseEntity.ok(npcs);
    }

    @GetMapping("/location/{locationName}")
    public ResponseEntity<List<NPC>> getNPCsByLocation(@PathVariable String locationName) {
        List<NPC> npcs = npcService.getNPCsByLocation(locationName);
        return ResponseEntity.ok(npcs);
    }

    @GetMapping
    public ResponseEntity<List<NPC>> getAllNPCs() {
        List<NPC> npcs = npcService.getAllNPCs();
        return ResponseEntity.ok(npcs);
    }

    @PostMapping
    public ResponseEntity<NPC> createNPC(@RequestBody NPC npc) {
        NPC createdNPC = npcService.createNPC(npc);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNPC);
    }
}
