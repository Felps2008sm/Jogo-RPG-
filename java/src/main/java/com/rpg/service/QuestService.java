package com.rpg.service;

import com.rpg.model.Quest;
import com.rpg.repository.QuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestService {
    private final QuestRepository questRepository;

    public Optional<Quest> getQuestById(Long id) {
        return questRepository.findById(id);
    }

    public List<Quest> getQuestsByLevel(Integer level) {
        return questRepository.findByLevel(level);
    }

    public List<Quest> getActiveQuests() {
        return questRepository.findByActive(true);
    }

    public List<Quest> getQuestsByType(String type) {
        return questRepository.findByType(type);
    }

    public Quest createQuest(Quest quest) {
        return questRepository.save(quest);
    }

    public List<Quest> getAllQuests() {
        return questRepository.findAll();
    }

    public Quest updateQuest(Quest quest) {
        return questRepository.save(quest);
    }
}
