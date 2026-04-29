package com.rpg.controller;

import com.rpg.model.Player;
import com.rpg.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {
    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playerService.createPlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        Optional<Player> player = playerService.getPlayerById(id);
        return player.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Player> getPlayerByName(@PathVariable String name) {
        Optional<Player> player = playerService.getPlayerByName(name);
        return player.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        Optional<Player> existingPlayer = playerService.getPlayerById(id);
        if (existingPlayer.isPresent()) {
            player.setId(id);
            Player updatedPlayer = playerService.updatePlayer(player);
            return ResponseEntity.ok(updatedPlayer);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/gain-exp")
    public ResponseEntity<Player> gainExp(@PathVariable Long id, @RequestParam Integer exp) {
        Player player = playerService.gainExp(id, exp);
        if (player != null) {
            return ResponseEntity.ok(player);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/gain-gold")
    public ResponseEntity<Player> gainGold(@PathVariable Long id, @RequestParam Integer gold) {
        Player player = playerService.gainGold(id, gold);
        if (player != null) {
            return ResponseEntity.ok(player);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/take-damage")
    public ResponseEntity<Player> takeDamage(@PathVariable Long id, @RequestParam Integer damage) {
        Player player = playerService.takeDamage(id, damage);
        if (player != null) {
            return ResponseEntity.ok(player);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/heal")
    public ResponseEntity<Player> heal(@PathVariable Long id, @RequestParam Integer amount) {
        Player player = playerService.heal(id, amount);
        if (player != null) {
            return ResponseEntity.ok(player);
        }
        return ResponseEntity.notFound().build();
    }
}
