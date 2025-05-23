// ==UserScript==
// @name         AMQ Low Guess Rate Songs Tracker
// @namespace    https://github.com/RomainTho/AMQ-scripts
// @version      1.1
// @description  Automatically manages low Guess Rate songs in local storage based on Guess Rate thresholds.
// @match        https://animemusicquiz.com/*
// @grant        none
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @require      https://github.com/Mxyuki/AMQ-Scripts/raw/master/common/amqWindows.js
// ==/UserScript==

if (window.quiz) {
    setup();
}
function setup() {
    if (!localStorage.getItem('lowGuessRateSongs')) {
        localStorage.setItem('lowGuessRateSongs', JSON.stringify([]));
    }

    const l = new Listener("answer results");
    l.callback = async (data) => {
        // Use a unique identifier if available
        const webm = data.songInfo.videoTargetMap?.catbox?.[720]?.slice(0, 6) ??
                     data.songInfo.videoTargetMap?.catbox?.[480]?.slice(0, 6) ??
                     data.songInfo.uniqueID; // Fallback to unique ID if available
        if (!webm) return;

        const songHistory = JSON.parse(localStorage.getItem('songHistory')) || {};
        const current = songHistory[webm] ?? { count: 0, correctCount: 0, spectatorCount: 0, lastPlayed: 0 };

        let isCorrect;
        if (quiz.gameMode === "Nexus") {
            isCorrect = data.players[0]?.correct;
        } else {
            isCorrect = quiz.isSpectator ? false : data.players.find(player => player.gamePlayerId === quiz.ownGamePlayerId)?.correct;
        }
        current.spectatorCount += quiz.isSpectator;
        songHistory[webm] = {
            count: current.count,
            correctCount: current.correctCount,
            spectatorCount: current.spectatorCount,
            lastPlayed: Date.now()
        };

        // Calculate the Guess Rate ratio
        let validPlayCount = current.count - current.spectatorCount;
        let correctRatio = validPlayCount > 0 ? (current.correctCount / validPlayCount) * 100 : 100;

        if (correctRatio <= 34 && validPlayCount >= 5 && isCorrect !== undefined) {
            setTimeout(() => {
                let songName = document.querySelector('#qpSongName')?.textContent.trim();
                let animeName = document.querySelector('#qpAnimeName')?.textContent.trim();
                console.log("songName" + songName,"AnimeName" + animeName);

                if (songName && animeName) {
                    let lowGuessRateSongs = JSON.parse(localStorage.getItem('lowGuessRateSongs')) || [];

                    // Check if the song is already in the list
                    const songIndex = lowGuessRateSongs.findIndex(song => song.webm === webm);

                    if (songIndex === -1) {
                        // Add new song if not already present
                        lowGuessRateSongs.push({
                            songName,
                            animeName,
                            playCount: current.count,
                            correctCount: current.correctCount,
                            webm // Store the unique identifier
                        });
                        localStorage.setItem('lowGuessRateSongs', JSON.stringify(lowGuessRateSongs));
                        gameChat.systemMessage("Low Guess Rate song added: " + songName + " - " + animeName + " (" + current.correctCount + "/" + validPlayCount + ")");
                    }
                    //update the song if it is already present
                    else {
                        lowGuessRateSongs[songIndex] = {
                            songName,
                            animeName,
                            playCount: current.count,
                            correctCount: current.correctCount,
                            webm // Store the unique identifier
                        };
                        localStorage.setItem('lowGuessRateSongs', JSON.stringify(lowGuessRateSongs));
                        gameChat.systemMessage("Low Guess Rate song updated: " + songName + " - " + animeName + " (" + current.correctCount + "/" + validPlayCount + ")");
                }
            }
            }, 1000); // Wait 1 second
        } else if (correctRatio > 34 && validPlayCount >= 5) {
         // Remove song if Guess Rate improves above threshold
         let lowGuessRateSongs = JSON.parse(localStorage.getItem('lowGuessRateSongs')) || [];

        const songIndex = lowGuessRateSongs.findIndex(song => song.webm === webm);

        if (songIndex !== -1) {
        // Song found, remove it from the list
        const songName = lowGuessRateSongs[songIndex].songName;
        const animeName = lowGuessRateSongs[songIndex].animeName;

        lowGuessRateSongs.splice(songIndex, 1);
        localStorage.setItem('lowGuessRateSongs', JSON.stringify(lowGuessRateSongs));
        gameChat.systemMessage("Low Guess Rate song removed due to improved Guess Rate: " + songName + " - " + animeName);
       
            }
        }
    };
    l.bindListener();
}

