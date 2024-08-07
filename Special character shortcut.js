// ==UserScript==
// @name         AMQ Special Characters Shortcut
// @version      1.0
// @description  Use Alt+1, Alt+2, etc., to insert special characters ★, ×, ♪ into the chat input field.
// @author       Swapin
// @match        https://animemusicquiz.com/*
// ==/UserScript==

if (document.getElementById("loginPage")) return;

const specialCharacters = {
    49: '☆', // Alt+1
    50: '×', // Alt+2
    51: '♪',  // Alt+3
    52: 'Δ',
    53: 'Ω',
    54: '†',
    55: '∬'
};

document.addEventListener('keyup', (event) => {
    if (event.altKey && specialCharacters[event.keyCode]) {
        insertSpecialCharacter(specialCharacters[event.keyCode]);
    }
});

function insertSpecialCharacter(char) {
    const inputField = document.getElementById("qpAnswerInput");
    if (!inputField) return;

    const start = inputField.selectionStart;
    const end = inputField.selectionEnd;
    const value = inputField.value;

    inputField.value = value.slice(0, start) + char + value.slice(end);
    inputField.selectionStart = inputField.selectionEnd = start + char.length;
    inputField.focus();
}
