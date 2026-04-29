package com.rpg.service;

import com.rpg.model.Player;
import com.rpg.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepository;

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public Optional<Player> getPlayerByName(String name) {
        return playerRepository.findByName(name);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player updatePlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

    public Player gainExp(Long playerId, Integer exp) {
        Optional<Player> playerOpt = playerRepository.findById(playerId);
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            player.setExp(player.getExp() + exp);
            
            // Check for level up (every 100 exp per level)
            if (player.getExp() >= player.getLevel() * 100) {
                player.setLevel(player.getLevel() + 1);
                player.setMaxHp(player.getMaxHp() + 10 + (player.getLevel() * 2));
                player.setMaxMana(player.getMaxMana() + 6 + (player.getLevel() * 1));
                player.setMaxStamina(player.getMaxStamina() + 7 + (player.getLevel() * 1));
                player.setAttack(player.getAttack() + 2);
                player.setDefense(player.getDefense() + 1);
            }
            
            return playerRepository.save(player);
        }
        return null;
    }

    public Player gainGold(Long playerId, Integer gold) {
        Optional<Player> playerOpt = playerRepository.findById(playerId);
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            player.setGold(player.getGold() + gold);
            return playerRepository.save(player);
        }
        return null;
    }

    public Player takeDamage(Long playerId, Integer damage) {
        Optional<Player> playerOpt = playerRepository.findById(playerId);
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            Integer actualDamage = Math.max(1, damage - (player.getDefense() / 2));
            player.setHp(Math.max(0, player.getHp() - actualDamage));
            return playerRepository.save(player);
        }
        return null;
    }

    public Player heal(Long playerId, Integer amount) {
        Optional<Player> playerOpt = playerRepository.findById(playerId);
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            player.setHp(Math.min(player.getMaxHp(), player.getHp() + amount));
            return playerRepository.save(player);
        }
        return null;
    }
}
