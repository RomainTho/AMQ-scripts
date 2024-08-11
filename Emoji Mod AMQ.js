// ==UserScript==
// @name         AMQ EmojiMode
// @version      1.0
// @description  Press [Alt + C] to activate Emoji Mode. Converts typed letters into special characters.
// @author       Swapin
// @match        https://animemusicquiz.com/*
// ==/UserScript==

if (document.getElementById("loginPage")) return;

let isEmojiMode = false;

const charMap = {
    'A': '🅰', 'B': '🅱', 'C': '🅲', 'D': '🅳', 'E': '🅴',
    'F': '🅵', 'G': '🅶', 'H': '🅷', 'I': '🅸', 'J': '🅹',
    'K': '🅺', 'L': '🅻', 'M': '🅼', 'N': '🅽', 'O': '🅾',
    'P': '🅿', 'Q': '🆀', 'R': '🆁', 'S': '🆂', 'T': '🆃',
    'U': '🆄', 'V': '🆅', 'W': '🆆', 'X': '🆇', 'Y': '🆈', 'Z': '🆉'
};

document.addEventListener('keyup', (event) => {
    if (event.altKey && event.keyCode === 67) { // Alt + C
        isEmojiMode = !isEmojiMode;
        if (!gameChat.isShown()) return;
        gameChat.systemMessage(isEmojiMode ? "Emoji Mode is Enabled. Press [ALT+C] to disable." : "Emoji Mode is Disabled. Press [ALT+C] to enable.");
    }
});

document.getElementById("gcInput").addEventListener('input', function(event) {
    if (isEmojiMode) {
        let inputField = document.getElementById("gcInput");
        let cursorPosition = inputField.selectionStart;
        let inputValue = inputField.value.toUpperCase();
        let newValue = '';

        for (let char of inputValue) {
            newValue += charMap[char] || char;
        }

        inputField.value = newValue;
        inputField.setSelectionRange(cursorPosition, cursorPosition); // To keep the cursor position
    }
});
