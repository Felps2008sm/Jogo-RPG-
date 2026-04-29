// Funções Utilitárias

// Gerar número aleatório entre min e max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gerar número aleatório com distribuição normal
function randomNormal(min, max) {
    return (randomInt(min, max) + randomInt(min, max)) / 2;
}

// Calcular dano com variação
function calculateDamage(baseDamage, variance = 0.2) {
    const variation = baseDamage * variance;
    return Math.round(randomNormal(baseDamage - variation, baseDamage + variation));
}

// Calcular crítico
function isCriticalHit(critChance = 0.15) {
    return Math.random() < critChance;
}

// Formatar números grandes
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
}

// Salvar dados no localStorage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Erro ao salvar dados:', e);
        return false;
    }
}

// Carregar dados do localStorage
function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Erro ao carregar dados:', e);
        return null;
    }
}

// Remover dados do localStorage
function removeData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Erro ao remover dados:', e);
        return false;
    }
}

// Animar elemento
function animateElement(element, animation, duration = 300) {
    element.style.animation = `${animation} ${duration}ms ease`;
    setTimeout(() => {
        element.style.animation = 'none';
    }, duration);
}

// Criar notificação de flutuante de dano
function showFloatingText(text, element, color = '#FF6B6B') {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.cssText = `
        position: absolute;
        color: ${color};
        font-weight: bold;
        pointer-events: none;
        font-size: 1.2rem;
        text-shadow: 0 0 5px rgba(0,0,0,0.8);
        animation: floatUp 1s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(floatingText);
    
    setTimeout(() => floatingText.remove(), 1000);
}

// Adicionar CSS animation se não existir
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) opacity(1);
            }
            100% {
                transform: translateY(-50px) opacity(0);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px currentColor; }
            50% { box-shadow: 0 0 20px currentColor; }
        }
    `;
    document.head.appendChild(style);
}

// Log no console com timestamp
function gameLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
    console.log(`${prefix} ${message}`);
}

// Converter classe para emoji
function classToEmoji(className) {
    const classEmojis = {
        warrior: '⚔️',
        mage: '🧙',
        rogue: '🗡️',
        paladin: '✨'
    };
    return classEmojis[className] || '👤';
}

// Converter classe para nome português
function classToPortuguese(className) {
    const classNames = {
        warrior: 'Guerreiro',
        mage: 'Mago',
        rogue: 'Ladino',
        paladin: 'Paladino'
    };
    return classNames[className] || className;
}

// Obter stats base por classe
function getClassStats(className) {
    const classStats = {
        warrior: {
            hp: 150,
            mana: 20,
            stamina: 100,
            attack: 15,
            defense: 12,
            speed: 7,
            luck: 5
        },
        mage: {
            hp: 80,
            mana: 120,
            stamina: 60,
            attack: 8,
            defense: 5,
            speed: 10,
            luck: 8
        },
        rogue: {
            hp: 100,
            mana: 40,
            stamina: 120,
            attack: 12,
            defense: 8,
            speed: 14,
            luck: 12
        },
        paladin: {
            hp: 130,
            mana: 80,
            stamina: 90,
            attack: 13,
            defense: 14,
            speed: 8,
            luck: 10
        }
    };
    return classStats[className] || classStats.warrior;
}

// Obter habilidades por classe
function getClassAbilities(className) {
    const abilities = {
        warrior: [
            { name: 'Golpe Forte', icon: '⚔️', cost: 20, cooldown: 2 },
            { name: 'Grito de Guerra', icon: '📢', cost: 15, cooldown: 3 }
        ],
        mage: [
            { name: 'Bola de Fogo', icon: '🔥', cost: 30, cooldown: 3 },
            { name: 'Congelamento', icon: '❄️', cost: 25, cooldown: 2 }
        ],
        rogue: [
            { name: 'Ataque Furtivo', icon: '🗡️', cost: 20, cooldown: 2 },
            { name: 'Esquiva', icon: '💨', cost: 15, cooldown: 1 }
        ],
        paladin: [
            { name: 'Golpe Sagrado', icon: '✨', cost: 25, cooldown: 2 },
            { name: 'Cura Divina', icon: '🙏', cost: 40, cooldown: 4 }
        ]
    };
    return abilities[className] || [];
}

// Delay assíncrono
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
