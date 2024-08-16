// ==UserScript==
// @name         AMQ Low Guess Rate Songs Manager
// @namespace    https://github.com/RomainTho/AMQ-scripts
// @version      1.2
// @description  Manage low Guess Rate songs by number with a simple interface.
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqWindows.js
// @author       RomainTho
// @match        https://animemusicquiz.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

if (document.getElementById("startPage")) return;

let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        createSongsManagerWindow();
        clearInterval(loadInterval);
    }
}, 500);

let songs = JSON.parse(localStorage.getItem("lowGuessRateSongs")) || [];

// Refreshes the song data from local storage
function refreshSongs() {
    songs = JSON.parse(localStorage.getItem("lowGuessRateSongs")) || [];
}

// Shows all songs in the chat
function showAllSongs() {
    if (songs.length === 0) {
        gameChat.systemMessage("No songs found.");
        return;
    }

    let message = "----------------------<br>";
    message += "Low Guess Rate Songs:<br>";
    songs.forEach((song, index) => {
        message += `${index + 1}- ${song.songName} - ${song.animeName} (${song.correctCount}/${song.playCount})<br>`;
    });
    message += "----------------------";
    gameChat.systemMessage(message);
}

// Updates the UI by refreshing data and then showing it
function updateUI() {
    refreshSongs();
    showAllSongs();
}

// Deletes a song by its number
function deleteSongByNumber(number) {
    updateUI(); // Ensure the UI is updated before deleting
    if (isNaN(number) || number < 1 || number > songs.length) {
        gameChat.systemMessage("Invalid song number.");
        return;
    }

    songs.splice(number - 1, 1); // Remove song at the specified index
    localStorage.setItem("lowGuessRateSongs", JSON.stringify(songs));
    gameChat.systemMessage("Song number " + number + " deleted.");
}

// Deletes the last song added
function deleteLastSong() {
    updateUI(); // Ensure the UI is updated before deleting
    if (songs.length === 0) {
        gameChat.systemMessage("No songs to delete.");
        return;
    }

    songs.pop(); // Remove the last song
    localStorage.setItem("lowGuessRateSongs", JSON.stringify(songs));
    gameChat.systemMessage("Last song deleted.");
}

let managerWindow;

// Creates the manager window for the UI
function createSongsManagerWindow() {
    managerWindow = new AMQWindow({
        id: "songsManagerWindow",
        title: "Low Guess Rate Songs Manager",
        width: 400, // Adjusted width
        height: 340, // Increased height to fit new button
        zIndex: 1054,
        draggable: true
    });

    managerWindow.addPanel({
        width: 1.0,
        height: 40, // Increased height for better visibility
        zIndex: 1055,
        position: {
            x: 0,
            y: 25
        },
        id: "songNumberToDelete"
    });

    managerWindow.addPanel({
        width: 1.0,
        height: 40, // Increased height for better visibility
        zIndex: 1056,
        position: {
            x: 0,
            y: 75,
        },
        id: "deleteButton"
    });

    managerWindow.addPanel({
        width: 1.0,
        height: 40, // Increased height for better visibility
        zIndex: 1057,
        position: {
            x: 0,
            y: 125,
        },
        id: "deleteLastButton"
    });

    managerWindow.addPanel({
        width: 1.0,
        height: 40, // Increased height for better visibility
        zIndex: 1058,
        position: {
            x: 0,
            y: 175,
        },
        id: "showButton"
    });

    managerWindow.panels[0].panel.append(
        $(`<div id="songNumberToDeleteTextBox"></div>`)
        .append($(`<input id="songNumberToDeleteText" type="number" placeholder="Song Number to Delete">`))
    );

    managerWindow.panels[1].panel.append(
        $(`<div id="deleteButton"></div>`)
        .append(
            $(`<button id="deleteButton" class="btn btn-primary">Delete Song</button>`).click(function () {
                const number = parseInt($("#songNumberToDeleteText").val(), 10);
                deleteSongByNumber(number);
            })
        )
    );

    managerWindow.panels[2].panel.append(
        $(`<div id="deleteLastButton"></div>`)
        .append(
            $(`<button id="deleteLastButton" class="btn btn-primary">Delete Last Song</button>`).click(function () {
                deleteLastSong();
            })
        )
    );

    managerWindow.panels[3].panel.append(
        $(`<div id="showButton"></div>`)
        .append(
            $(`<button id="showButton" class="btn btn-primary">Show All Songs</button>`).click(function () {
                updateUI(); // Show updated list
            })
        )
    );
}

// Adjust the UI button placement
let oldWidth = $("#qpOptionContainer").width();
$("#qpOptionContainer").width(oldWidth + 35);
$("#qpOptionContainer > div").append($(`<div id="qpasScript" class="clickAble qpOption"><i aria-hidden="true" class="fa fa-bars qpMenuItem"></i></div>`)
  .click(() => {
    if (managerWindow.isVisible()) {
      managerWindow.close();
    } else {
      managerWindow.open(() => { }); // Add an empty handler for proper window opening
    }
  })
  .popover({
    content: "Low GuessRate Songs Manager",
    trigger: "hover",
    placement: "bottom"
  })
);

AMQ_addStyle(`
    #songsManagerWindow {
        background-color: #625D60; /* Window color */
        color: #D9D9D9; /* Text color */
    }
    #qpasScript {
        width: 27px;
        margin-right: 5px;
    }
    #songNumberToDeleteTextBox {
        width: 100%;
        margin-top: 5px;
        text-align: center;
    }
    #songNumberToDeleteText {
        width: 350px; /* Adjusted width */
        text-align: center;
        background-color: #2E2E2E;
        border: #2E2E2E;
        font-size: 14px; /* Text size */
    }
    #deleteButton, #deleteLastButton, #showButton {
        width: 350px; /* Adjusted width */
        text-align: center;
    }
    #deleteButton > button, #deleteLastButton > button, #showButton > button {
        text-align: center;
        width: 90%;
        margin: 5px 15px;
        font-size: 14px;
    }
    #deleteButton > button {
        background-color: #FF0000; /* Button color */
    }
    #deleteLastButton > button {
        background-color: #FF4500; /* Button color */
    }
    #showButton > button {
        background-color: #70AAE5; /* Button color */
    }
`);
