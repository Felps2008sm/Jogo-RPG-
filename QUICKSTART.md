# Começando Rápido 🚀

## Requisitos

- Node.js (para desenvolvimento frontend)
- Java 17+ (para backend)
- Maven (para build Java)
- Navegador moderno

## Instalação e Execução

### Frontend (Local)

1. Clone o repositório:
```bash
git clone https://github.com/Felps2008sm/Jogo-RPG-.git
cd Jogo-RPG-
```

2. Abra `index.html` em seu navegador:
```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

### Backend (Java Spring Boot)

1. Acesse a pasta Java:
```bash
cd java
```

2. Build do projeto:
```bash
mvn clean install
```

3. Execute a aplicação:
```bash
mvn spring-boot:run
```

O servidor estará disponível em: `http://localhost:8080`

### API Endpoints

#### Jogadores
- `POST /api/players` - Criar jogador
- `GET /api/players/{id}` - Obter jogador
- `GET /api/players/name/{name}` - Obter por nome
- `GET /api/players` - Listar todos
- `PUT /api/players/{id}` - Atualizar
- `DELETE /api/players/{id}` - Deletar
- `POST /api/players/{id}/gain-exp` - Ganhar XP
- `POST /api/players/{id}/gain-gold` - Ganhar ouro
- `POST /api/players/{id}/take-damage` - Tomar dano
- `POST /api/players/{id}/heal` - Curar

#### Inimigos
- `GET /api/enemies/{id}` - Obter inimigo
- `GET /api/enemies/level/{level}` - Por nível
- `GET /api/enemies/type/{type}` - Por tipo
- `GET /api/enemies/random/{level}` - Aleatório
- `POST /api/enemies` - Criar inimigo

#### Itens
- `GET /api/items/{id}` - Obter item
- `GET /api/items/name/{name}` - Por nome
- `GET /api/items/type/{type}` - Por tipo
- `GET /api/items/rarity/{rarity}` - Por raridade
- `GET /api/items` - Listar todos
- `POST /api/items` - Criar item

#### Missões
- `GET /api/quests/{id}` - Obter missão
- `GET /api/quests/level/{level}` - Por nível
- `GET /api/quests/active` - Ativas
- `GET /api/quests/type/{type}` - Por tipo
- `GET /api/quests` - Listar todas
- `POST /api/quests` - Criar
- `PUT /api/quests/{id}` - Atualizar

#### NPCs
- `GET /api/npcs/{id}` - Obter NPC
- `GET /api/npcs/name/{name}` - Por nome
- `GET /api/npcs/type/{type}` - Por tipo
- `GET /api/npcs/location/{locationName}` - Por local
- `GET /api/npcs` - Listar todos
- `POST /api/npcs` - Criar NPC

## Exemplo de Requisição

### Criar um Jogador
```bash
curl -X POST http://localhost:8080/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Herói",
    "className": "warrior",
    "level": 1,
    "exp": 0,
    "gold": 0,
    "hp": 150,
    "maxHp": 150,
    "mana": 20,
    "maxMana": 20,
    "stamina": 100,
    "maxStamina": 100,
    "attack": 15,
    "defense": 12,
    "speed": 7,
    "luck": 5
  }'
```

## Dados de Teste

O banco de dados H2 vem vazio. Você pode inserir dados através da API ou do console H2 em:
`http://localhost:8080/h2-console`

## Troubleshooting

### O jogo não inicia?
1. Verifique se tem Java 17+: `java -version`
2. Limpe a cache: `mvn clean`
3. Reconstrua: `mvn install`

### Erro de porta?
Mude a porta em `java/src/main/resources/application.properties`:
```properties
server.port=8081
```

### CORS Error?
Verifique se o backend está rodando e acessível

## Desenvolvimento

Para modificar o jogo:

1. **Frontend**: Edite arquivos em `js/`, `styles/` ou `index.html`
2. **Backend**: Edite classes Java em `java/src/main/java/com/rpg/`
3. **Banco**: Configure em `java/src/main/resources/application.properties`

## Próximos Passos

- [x] Implementar sistema básico
- [ ] Adicionar mais inimigos
- [ ] Implementar multiplicador
- [ ] Criar mobile app
- [ ] Deploy em produção

## Suporte

Tem dúvidas? Abra uma issue no GitHub!
