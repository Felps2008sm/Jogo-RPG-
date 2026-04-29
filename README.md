# Jogo RPG 🎮

Um jogo RPG interativo desenvolvido em HTML, CSS, JavaScript e Java.

## 📋 Características

- **Sistema de Personagem**: Crie e personalize seu personagem
- **Sistema de Combate**: Enfrente inimigos com estratégia
- **Inventário**: Colete e gerencie itens
- **NPCs**: Interaja com personagens não-jogáveis
- **Missões**: Complete quests e ganhe experiência
- **Sistema de Leveling**: Aumente seu nível e aprenda novos poderes
- **Mapa do Mundo**: Explore diferentes locais
- **Salvamento**: Salve seu progresso

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Java (Spring Boot)
- **Banco de Dados**: JSON (local storage) / MySQL (opcional)

## 📂 Estrutura do Projeto

```
Jogo-RPG-/
├── index.html              # Página principal
├── styles/
│   ├── main.css           # Estilos principais
│   ├── game.css           # Estilos do jogo
│   └── responsive.css     # Responsividade
├── js/
│   ├── game.js            # Lógica principal do jogo
│   ├── player.js          # Sistema do jogador
│   ├── combat.js          # Sistema de combate
│   ├── inventory.js       # Sistema de inventário
│   ├── npc.js             # Sistema de NPCs
│   ├── quest.js           # Sistema de missões
│   ├── map.js             # Sistema de mapa
│   └── utils.js           # Funções utilitárias
├── java/
│   ├── pom.xml            # Dependências Maven
│   └── src/main/java/com/rpg/
│       ├── Application.java
│       ├── model/
│       │   ├── Player.java
│       │   ├── Enemy.java
│       │   ├── Item.java
│       │   ├── Quest.java
│       │   └── NPC.java
│       ├── service/
│       │   ├── GameService.java
│       │   ├── CombatService.java
│       │   ├── InventoryService.java
│       │   └── QuestService.java
│       └── controller/
│           └── GameController.java
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
└── .gitignore
```

## 🚀 Como Executar

### Frontend
1. Abra `index.html` no navegador

### Backend (Java)
```bash
cd java
mvn clean install
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

## 📖 Como Jogar

1. **Criar Personagem**: Escolha seu nome, classe e aparência
2. **Explorar o Mapa**: Navegue por diferentes regiões
3. **Enfrentar Inimigos**: Participe de combates
4. **Completar Missões**: Ganhe experiência e recompensas
5. **Aumentar Nível**: Desbloqueie novas habilidades

## 🎨 Customização

Todos os valores do jogo podem ser ajustados em `js/game.js`:
- Dificuldade
- Valores de combate
- Quantidade de experiência
- Número de NPCs e inimigos

## 📝 Licença

MIT License

## 👨‍💻 Autor

Felps2008sm
