// ==UserScript==
// @name         AMQ NGMC Guess Counter
// @namespace    https://github.com/RomainTho/AMQ-scripts
// @version      1.4
// @description  AMQ NGMC Guess Counter for tour players
// @author       RomainTho
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqWindows.js
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @grant        none
// ==/UserScript==

if (document.getElementById("startPage")) return;

let players = [];
let currentMode = null;
let managerWindow;
// Variables pour suivre l'état des boutons à cocher
let sendLife = true;
let sendGuess = true;


// Définition des modes
const usualMode = elo => elo >= 8.5 ? 4 : elo >= 4.5 ? 3 : elo >= 0.5 ? 2 : 1;
const watchedMode = elo => elo >= 8.5 ? 5 : elo >= 7 ? 4 : elo >= 5.5 ? 3 : elo >= 3.5 ? 2 : 1;


// Fonction pour vérifier si le message est un message de vie
function isLifeMessage(message) {
    // Vérifie si le message est au format "X-X"
    const lifeMessageRegex = /^\d+-\d+$/;
    return lifeMessageRegex.test(message);
}


// Fonction pour envoyer un message de chat
function sendChatMessage(message, isTeamMessage) {
    console.log(sendLife);
    console.log(sendGuess);
    console.log(message);
    if (sendLife && isLifeMessage(message) ) {
        // Envoie le message de vie
        socket.sendCommand({
            type: "lobby",
            command: "game chat message",
            data: {
                msg: String(message),
                teamMessage: Boolean(isTeamMessage)
            }
        });
    } else if (sendGuess && !isLifeMessage(message)) {
        // Envoie le message de guess
        socket.sendCommand({
            type: "lobby",
            command: "game chat message",
            data: {
                msg: String(message),
                teamMessage: Boolean(isTeamMessage)
            }
        });
    }
}

// Envoie le message automatiquement
function updateMessage() {
    console.log("updateMessage");
    const total = players.length > 0 ? players.map(p => p.count).join("") : "5432";
    sendChatMessage(total);
}

// Fonction principale pour créer la fenêtre
function createNGMCManagerWindow() {
    managerWindow = new AMQWindow({
        id: "ngmcWindow",
        title: "Guess Counter",
        width: 300,
        height: 360,
        zIndex: 1054,
        draggable: true
    });

    // Panels
    managerWindow.addPanel({ width: 1.0, height: 50, position: { x: 0, y: 5 }, id: "playerInputPanel" });
    managerWindow.addPanel({ width: 1.0, height: 35, position: { x: 0, y: 35 }, id: "modePanel" });
    managerWindow.addPanel({ width: 1.0, height: 110, position: { x: 0, y: 65 }, id: "counterPanel" });
    managerWindow.addPanel({ width: 1.0, height: 55, position: { x: 0, y: 170 }, id: "customPanel" });
    managerWindow.addPanel({ width: 1.0, height: 90, position: { x: 0, y: 195 }, id: "lifePanel" });


    // Zone de saisie
    $("#playerInputPanel").append(`
        <input id="playerInput" placeholder="" style="width: 100%; height: 24px; background-color: white; color: black; border: 1px solid #ccc; border-radius: 4px; padding: 5px; box-sizing: border-box;">
    `);

    // Boutons de mode
    $("#modePanel").append(`
        <button id="setUsual" class="btn btn-info" style="width: 48%;">Usual</button>
        <button id="setWatched" class="btn btn-warning" style="width: 48%;">Watched</button>
    `);

   // Zone custom
$("#customPanel").append(`
    <button id="resetGuesses" class="btn btn-danger" style="width: 48%;">Reset Guesses</button>
    <button id="resetLives" style="
        width: 48%;
        padding: 4px 8px;
        background-color: #7f8c8d;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    ">
        Reset Lives
    </button>
`);

// Zone des vies
    $("#lifePanel").append(`
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 5px;">
                <button id="leftLifeMinus" class="btn btn-danger">-</button>
                <span id="leftLife" style="min-width: 20px; text-align: center;">5</span>
                <button id="leftLifePlus" class="btn btn-success">+</button>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; font-weight: bold;">
                <span> - </span>
                <div style="display: flex; gap: 40px; font-weight: normal; font-size: 12px;">
                    <span>Team 1</span>
                    <span>Team 2</span>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 5px;">
                <button id="rightLifeMinus" class="btn btn-danger">-</button>
                <span id="rightLife" style="min-width: 20px; text-align: center;">5</span>
                <button id="rightLifePlus" class="btn btn-success">+</button>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; padding-left: 5px;">
            <label><input type="checkbox" id="chatEnabledGuesses" checked> Activate chat guesses</label>
            <label><input type="checkbox" id="chatEnabledLives" checked> Activate chat lives</label>
        </div>
    `);



// Ajoutez les écouteurs d'événements pour les cases à cocher
$(document).ready(function() {
    $("#chatEnabledGuesses").change(function() {
        toggleGuessCheckbox();
    });

    $("#chatEnabledLives").change(function() {
        toggleLifeCheckbox();
    });
});
// Fonction pour basculer l'état du bouton à cocher des vies
function toggleLifeCheckbox() {
    sendLife = !sendLife;
}

// Fonction pour basculer l'état du bouton à cocher des guess
function toggleGuessCheckbox() {
    sendGuess = !sendGuess;
}


displayCounters();
let leftLife = 5;
let rightLife = 5;

function updateLifeDisplay() {
    $("#leftLife").text(leftLife);
    $("#rightLife").text(rightLife);

    // Utilisez la fonction sendChatMessage pour envoyer le message de vie
    sendChatMessage(`${leftLife}-${rightLife}`, false);
}

$("#leftLifeMinus").click(() => {
    if (leftLife > 0) leftLife--;
    updateLifeDisplay();
});

$("#leftLifePlus").click(() => {
    if (leftLife < 9) leftLife++;
    updateLifeDisplay();
});

$("#rightLifeMinus").click(() => {
    if (rightLife > 0) rightLife--;
    updateLifeDisplay();
});

$("#rightLifePlus").click(() => {
    if (rightLife < 9) rightLife++;
    updateLifeDisplay();
});





    // Événements

$("#setUsual").click(() => {
    const input = $("#playerInput").val();
    players = parsePlayersInput(input);
    if (players.length === 0) return;
    players.sort((a, b) => b.elo - a.elo); // Tri décroissant
    currentMode = "usual";
    applyGuessMode("usual");
    displayCounters();
});

$("#setWatched").click(() => {
    const input = $("#playerInput").val();
    players = parsePlayersInput(input);
    if (players.length === 0) return;
    players.sort((a, b) => b.elo - a.elo); // Tri décroissant
    currentMode = "watched";
    applyGuessMode("watched");
    displayCounters();
});

    function parsePlayersInput(input) {
    const players = [];

    // Format (nom (elo))
    const regex = /(\w+)\s*\((\d+(\.\d+)?)\)/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
        players.push({ name: match[1], elo: parseFloat(match[2]), count: 0 });
    }

    // Sinon, format noms + elos groupés
    if (players.length === 0) {
        const parts = input.trim().split(/\s+/);
        const half = parts.length / 2;
        if (parts.length % 2 !== 0 || parts.slice(half).some(v => isNaN(v))) {
            alert("Entrée invalide. Utilise soit : nom (elo) soit nom1 nom2 ... elo1 elo2 ...");
            return [];
        }

        for (let i = 0; i < half; i++) {
            players.push({
                name: parts[i],
                elo: parseFloat(parts[half + i]),
                count: 0
            });
        }
    }

    return players;
}


    $("#resetGuesses").click(() => {
    const totalGuesses = players.reduce((acc, p) => acc + p.count, 0);

    if (totalGuesses > 1) {
        if (!confirm("Are you sure you want to reset even if you have more than 1 guess left?")) {
            return;
        }
    }

    if (currentMode) {
        applyGuessMode(currentMode);
        displayCounters();
    }
});


    // Fonction pour réinitialiser les vies
$("#resetLives").click(() => {
    const defaultLifeValue = 5; // Valeur par défaut pour les vies
      if (leftLife > 0 || rightLife > 0) {
        if (!confirm("Are you sure you want to reset lives even if both teams have lives left?")) {
            return;
        }
    }
    leftLife = defaultLifeValue;
    rightLife = defaultLifeValue;
    updateLifeDisplay();
});
}

// Appliquer un mode
function applyGuessMode(mode) {
    players.forEach(p => {
        p.count = mode === "usual" ? usualMode(p.elo) : watchedMode(p.elo);
    });
    updateMessage();
}

// Affichage des compteurs
function displayCounters() {
    $("#counterPanel").empty();
    if (players.length === 0) {
        for (let i = 0; i < 4; i++) {
            const defaultPlayer = { name: `Player ${i + 1}`, count: 5 - i };
            const row = createPlayerRow(defaultPlayer, i);
            $("#counterPanel").append(row);
        }
    } else {
        players.forEach((p, i) => {
            const row = createPlayerRow(p, i);
            $("#counterPanel").append(row);
        });
    }
}

function createPlayerRow(p, i) {
    return $(`
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 2px 10px;">
            <span style="flex: 1; font-weight: bold;">${p.name}</span>
            <button class="btn btn-danger" id="minus${i}">-</button>
            <span id="count${i}" style="width: 30px; text-align: center;">${p.count}</span>
            <button class="btn btn-success" id="plus${i}">+</button>
        </div>
    `).on("click", `#plus${i}`, () => {
        p.count++;
        $(`#count${i}`).text(p.count);
        updateMessage();
    }).on("click", `#minus${i}`, () => {
        if (p.count > 0) p.count--;
        $(`#count${i}`).text(p.count);
        updateMessage();
    });
}



let chatEnabled = $("#chatEnabled").prop("checked");

$("#chatEnabled").on("change", function () {
    chatEnabled = $(this).prop("checked");
});





// send a client side message to game chat
function sendSystemMessage(message, message2) {
    if (gameChat.open) {
        if (message2) {
            setTimeout(() => { gameChat.systemMessage(String(message), String(message2)) }, 1);
        }
        else {
            setTimeout(() => { gameChat.systemMessage(String(message)) }, 1);
        }
    }
    else if (nexus.inCoopLobby) {
        setTimeout(() => { nexusCoopChat.displayServerMessage({message: String(message)}) }, 1);
    }
}

let loadInterval = setInterval(() => {
    if ($("#loadingScreen").hasClass("hidden")) {
        createNGMCManagerWindow();
        clearInterval(loadInterval);
    }
}, 500);

// Ajoute le bouton en haut à droite
let oldWidth = $("#qpOptionContainer").width();
$("#qpOptionContainer").width(oldWidth + 35);

$("#qpOptionContainer > div").append($(`<div id="ngmcqpasScript" class="clickAble qpOption"><i aria-hidden="true" class="fa fa-calculator qpMenuItem"></i></div>`)
  .click(() => {
    if (managerWindow.isVisible()) {
      managerWindow.close();
    } else {
      managerWindow.open(() => { });
    }
  })
  .popover({
    content: "NGMC Counting",
    trigger: "hover",
    placement: "bottom"
  })
);

// Style identique
AMQ_addStyle(`

    #ngmcWindow {
        background-color: #2e2e2e;
        color: #fff;
    }
    #ngmcqpasScript {
        width: 27px;
        margin-right: 5px;
    }
`);
AMQ_addStyle(`
    #ngmcWindow .modal-header {
        padding: 8px;
    }

    #ngmcWindow .modal-title {
        font-size: 14px;
    }
`);
AMQ_addStyle(`
    /* Réduction de la taille des boutons */
    #ngmcWindow .customWindowPanel button {
        height: 22px !important;
        padding: 1px 4px !important;
        font-size: 12px !important;
    }

    /* Compacter les entrées */
    #playerInput {
        height: 22px !important;
        padding: 2px 4px !important;
        font-size: 12px !important;
    }

    /* Réduction du padding du header */
    #ngmcWindow .customWindowHeader {
        padding: 4px 8px !important;
        height: 28px !important;
    }

    #ngmcWindow .customWindowHeader .modal-title {
        font-size: 14px !important;
        margin: 0 !important;
    }


`);


AMQ_addStyle(`
    #ngmcWindow button {
        height: 24px !important;
        font-size: 11px !important;
        padding: 2px 4px !important;
    }
`);
