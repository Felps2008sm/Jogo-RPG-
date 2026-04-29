package com.rpg.controller;

import com.rpg.model.Quest;
import com.rpg.service.QuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quests")
@RequiredArgsConstructor
public class QuestController {
    private final QuestService questService;

    @GetMapping("/{id}")
    public ResponseEntity<Quest> getQuest(@PathVariable Long id) {
        Optional<Quest> quest = questService.getQuestById(id);
        return quest.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Quest>> getQuestsByLevel(@PathVariable Integer level) {
        List<Quest> quests = questService.getQuestsByLevel(level);
        return ResponseEntity.ok(quests);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Quest>> getActiveQuests() {
        List<Quest> quests = questService.getActiveQuests();
        return ResponseEntity.ok(quests);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Quest>> getQuestsByType(@PathVariable String type) {
        List<Quest> quests = questService.getQuestsByType(type);
        return ResponseEntity.ok(quests);
    }

    @GetMapping
    public ResponseEntity<List<Quest>> getAllQuests() {
        List<Quest> quests = questService.getAllQuests();
        return ResponseEntity.ok(quests);
    }

    @PostMapping
    public ResponseEntity<Quest> createQuest(@RequestBody Quest quest) {
        Quest createdQuest = questService.createQuest(quest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quest> updateQuest(@PathVariable Long id, @RequestBody Quest quest) {
        Optional<Quest> existingQuest = questService.getQuestById(id);
        if (existingQuest.isPresent()) {
            quest.setId(id);
            Quest updatedQuest = questService.updateQuest(quest);
            return ResponseEntity.ok(updatedQuest);
        }
        return ResponseEntity.notFound().build();
    }
}
