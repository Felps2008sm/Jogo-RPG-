package com.rpg.controller;

import com.rpg.model.Item;
import com.rpg.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Item> getItemByName(@PathVariable String name) {
        Item item = itemService.getItemByName(name);
        if (item != null) {
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Item>> getItemsByType(@PathVariable String type) {
        List<Item> items = itemService.getItemsByType(type);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/rarity/{rarity}")
    public ResponseEntity<List<Item>> getItemsByRarity(@PathVariable String rarity) {
        List<Item> items = itemService.getItemsByRarity(rarity);
        return ResponseEntity.ok(items);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item createdItem = itemService.createItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }
}
