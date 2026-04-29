// Sistema de NPCs

class NPC {
    constructor(name, type, icon, dialog) {
        this.name = name;
        this.type = type; // 'merchant', 'quest_giver', 'companion', 'enemy'
        this.icon = icon;
        this.dialog = dialog;
        this.dialogs = {};
        this.currentDialog = 0;
    }
    
    addDialog(id, text, choices = []) {
        this.dialogs[id] = { text, choices };
    }
    
    getDialog(id) {
        return this.dialogs[id];
    }
    
    getRandomDialog() {
        const dialogKeys = Object.keys(this.dialogs);
        return this.dialogs[dialogKeys[Math.floor(Math.random() * dialogKeys.length)]];
    }
}

// NPCs pré-definidos
const NPCS = {
    old_wizard: new NPC(
        'Velho Mago',
        'quest_giver',
        '🧙',
        'Bem-vindo, aventureiro! Há uma maldição nesta terra...'
    ),
    
    merchant: new NPC(
        'Mercador',
        'merchant',
        '🏪',
        'Bem-vindo à minha loja! Tenho itens raros para vender.'
    ),
    
    blacksmith: new NPC(
        'Ferreiro',
        'merchant',
        '⚒️',
        'Forjo as melhores armas e armaduras da região!'
    ),
    
    guard: new NPC(
        'Guarda Real',
        'quest_giver',
        '👮',
        'Oi, aventureiro! Precisamos de sua ajuda contra os monstros.'
    ),
    
    healer: new NPC(
        'Curandeira',
        'companion',
        '🏥',
        'Deixa eu cuidar de seus ferimentos...'
    )
};

// Adicionar diálogos aos NPCs
NPCS.old_wizard.addDialog('greeting', 
    'Bem-vindo, aventureiro! Há uma maldição nesta terra que precisa ser quebrada.',
    [
        { text: 'Posso ajudar?', nextDialog: 'quest_offer' },
        { text: 'Qual é a maldição?', nextDialog: 'curse_story' }
    ]
);

NPCS.merchant.addDialog('greeting',
    'Bem-vindo à minha loja! Tenho itens raros para vender.',
    [
        { text: 'Mostrar itens', action: 'shop' },
        { text: 'Adeus', action: 'close' }
    ]
);
