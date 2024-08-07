// ==UserScript==
// @name         AMQ Low Accuracy Songs Tracker
// @namespace    https://github.com/RomainTho/AMQ-scripts
// @version      1.0
// @description  Automatically manages low accuracy songs in local storage based on accuracy thresholds.
// @author       RomainTho
// @match        https://animemusicquiz.com/*
// @grant        none
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @require      https://github.com/Mxyuki/AMQ-Scripts/raw/master/common/amqWindows.js
// ==/UserScript==

if (window.quiz) {
    setup();
}

function setup() {
    if (!localStorage.getItem('lowAccuracySongs')) {
        localStorage.setItem('lowAccuracySongs', JSON.stringify([]));
    }

    const l = new Listener("answer results");
    l.callback = async (data) => {
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
        current.correctCount = isCorrect;
        current.spectatorCount += quiz.isSpectator;
        songHistory[webm] = {
            count: current.count,
            correctCount: current.correctCount,
            spectatorCount: current.spectatorCount,
            lastPlayed: Date.now()
        };
        localStorage.setItem('songHistory', JSON.stringify(songHistory));

        // Calculate the accuracy ratio
        let validPlayCount = current.count - current.spectatorCount;
        let correctRatio = validPlayCount > 0 ? (current.correctCount / validPlayCount) * 100 : 100;

        if (correctRatio <= 33.33 && validPlayCount >= 3) {
            setTimeout(() => {
                let songName = document.querySelector('#qpSongName')?.textContent.trim();
                let animeName = document.querySelector('#qpAnimeName')?.textContent.trim();

                if (songName && animeName) {
                    let lowAccuracySongs = JSON.parse(localStorage.getItem('lowAccuracySongs')) || [];

                    // Check if the song is already in the list
                    const songIndex = lowAccuracySongs.findIndex(song => song.webm === webm);

                    if (songIndex === -1) {
                        // Add new song if not already present
                        lowAccuracySongs.push({
                            songName,
                            animeName,
                            playCount: current.count,
                            correctCount: current.correctCount,
                            webm // Store the unique identifier
                        });
                        localStorage.setItem('lowAccuracySongs', JSON.stringify(lowAccuracySongs));
                        gameChat.systemMessage("Low accuracy song added: " + songName + " - " + animeName + " (" + current.correctCount + "/" + validPlayCount + ")");
                    }
                }
            }, 1000); // Wait 1 second
        } else if (correctRatio > 33.33 && validPlayCount >= 3) {
            // Remove song if accuracy improves above threshold
            let lowAccuracySongs = JSON.parse(localStorage.getItem('lowAccuracySongs')) || [];

            if (songName && animeName) {
                const songIndex = lowAccuracySongs.findIndex(song => song.webm === webm);
                if (songIndex !== -1) {
                    lowAccuracySongs.splice(songIndex, 1);
                    localStorage.setItem('lowAccuracySongs', JSON.stringify(lowAccuracySongs));
                    gameChat.systemMessage("Low accuracy song removed due to improved accuracy: " + songName + " - " + animeName);
                }
            }
        }
    };
    l.bindListener();
}
