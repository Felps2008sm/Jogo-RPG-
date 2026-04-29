package com.rpg.service;

import com.rpg.model.Item;
import com.rpg.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item getItemByName(String name) {
        return itemRepository.findByName(name);
    }

    public List<Item> getItemsByType(String type) {
        return itemRepository.findByType(type);
    }

    public List<Item> getItemsByRarity(String rarity) {
        return itemRepository.findByRarity(rarity);
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
