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

// Définition des modes
const usualMode = elo => elo >= 8.5 ? 4 : elo >= 4.5 ? 3 : elo >= 0.5 ? 2 : 1;
const watchedMode = elo => elo >= 8.5 ? 5 : elo >= 7 ? 4 : elo >= 5.5 ? 3 : elo >= 3.5 ? 2 : 1;

// Fonction principale pour créer la fenêtre
function createNGMCManagerWindow() {
    managerWindow = new AMQWindow({
        id: "ngmcWindow",
        title: "Guess Counter",
        width: 300,
        height: 240,
        zIndex: 1054,
        draggable: true
    });

    // Panels
    managerWindow.addPanel({ width: 1.0, height: 50, position: { x: 0, y: 5 }, id: "playerInputPanel" });
    managerWindow.addPanel({ width: 1.0, height: 35, position: { x: 0, y: 35 }, id: "modePanel" });
    managerWindow.addPanel({ width: 1.0, height: 110, position: { x: 0, y: 65 }, id: "counterPanel" });
    managerWindow.addPanel({ width: 1.0, height: 65, position: { x: 0, y: 175 }, id: "customPanel" });

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
    <button id="resetGuesses" class="btn btn-danger" style="width: 48%;">Reset</button>
    <button id="customizeGuesses" style="
        width: 48%;
        padding: 4px 8px;
        background-color: #7f8c8d;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    ">
        Customize Guess
    </button>
`);


    // Événements
    $("#setUsual").click(() => {
        const input = $("#playerInput").val();
        players = [];
        const regex = /(\w+)\s*\((\d+(\.\d+)?)\)/g;
        let match;
        while ((match = regex.exec(input)) !== null) {
            players.push({ name: match[1], elo: parseFloat(match[2]), count: 0 });
        }
        players.sort((a, b) => b.elo - a.elo); // Trier par ELO décroissant
        currentMode = "usual";
        applyGuessMode("usual");
        displayCounters();
    });

    $("#setWatched").click(() => {
        const input = $("#playerInput").val();
        players = [];
        const regex = /(\w+)\s*\((\d+(\.\d+)?)\)/g;
        let match;
        while ((match = regex.exec(input)) !== null) {
            players.push({ name: match[1], elo: parseFloat(match[2]), count: 0 });
        }
        players.sort((a, b) => b.elo - a.elo); // Trier par ELO décroissant
        currentMode = "watched";
        applyGuessMode("watched");
        displayCounters();
    });

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


    $("#customizeGuesses").click(() => {
        const customValues = prompt("Enter custom guess values separated by commas (e.g., 4,3,2,1):");
        if (customValues) {
            const values = customValues.split(",").map(v => parseInt(v.trim(), 10));
            if (values.length !== players.length) return alert("Autant de valeurs que de joueurs !");
            players.forEach((p, i) => p.count = values[i]);
            displayCounters();
        }
    });

    displayCounters();
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

// Envoie le message automatiquement
function updateMessage() {
    const total = players.length > 0 ? players.map(p => p.count).join("") : "5432";
    sendChatMessage(total);
}

// send a regular public message in game chat
function sendChatMessage(message, isTeamMessage) {
    socket.sendCommand({
        type: "lobby",
        command: "game chat message",
        data: {msg: String(message), teamMessage: Boolean(isTeamMessage)}
    });
}

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

$("#qpOptionContainer > div").append($(`<div id="qpasScript" class="clickAble qpOption"><i aria-hidden="true" class="fa fa-calculator qpMenuItem"></i></div>`)
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
    #qpasScript {
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
    .customWindowPanel button {
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
    .customWindowHeader {
        padding: 4px 8px !important;
        height: 28px !important;
    }

    .customWindowHeader .modal-title {
        font-size: 14px !important;
        margin: 0 !important;
    }

    .customWindowBody {
        height: 215px !important;
        overflow-y: hidden !important;
    }
`);


AMQ_addStyle(`
    #ngmcWindow button {
        height: 24px !important;
        font-size: 11px !important;
        padding: 2px 4px !important;
    }
`);
