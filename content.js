// Define the letters and inverseLetters objects
var inverseLetters = {
    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "a": "ф",
    "s": "і",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    "Q": "Й",
    "W": "Ц",
    "E": "У",
    "R": "К",
    "T": "Е",
    "Y": "Н",
    "U": "Г",
    "I": "Ш",
    "O": "Щ",
    "P": "З",
    "A": "Ф",
    "S": "І",
    "D": "В",
    "F": "А",
    "G": "П",
    "H": "Р",
    "J": "О",
    "K": "Л",
    "L": "Д",
    "Z": "Я",
    "X": "Ч",
    "C": "С",
    "V": "М",
    "B": "И",
    "N": "Т",
    "M": "Ь",
    "[": "х",
    "]": "ї",
    "{": "Х",
    "}": "Ї",
    "`": "'",
    "~": "₴",
    ",": "б",
    "<": "Б",
    ".": "ю",
    ">": "Ю",
    "/": ".",
    "?": ",",
    "@": "\"",
    "#": "№",
    "$": ";",
    "^": ":",
    "&": "?"
};

var letters = {
    "й": "q",
    "ц": "w",
    "у": "e",
    "к": "r",
    "е": "t",
    "н": "y",
    "г": "u",
    "ш": "i",
    "щ": "o",
    "з": "p",
    "ф": "a",
    "і": "s",
    "в": "d",
    "а": "f",
    "п": "g",
    "р": "h",
    "о": "j",
    "л": "k",
    "д": "l",
    "я": "z",
    "ч": "x",
    "с": "c",
    "м": "v",
    "и": "b",
    "т": "n",
    "ь": "m",
    "Й": "Q",
    "Ц": "W",
    "У": "E",
    "К": "R",
    "Е": "T",
    "Н": "Y",
    "Г": "U",
    "Ш": "I",
    "Щ": "O",
    "З": "P",
    "Ф": "A",
    "І": "S",
    "В": "D",
    "А": "F",
    "П": "G",
    "Р": "H",
    "О": "J",
    "Л": "K",
    "Д": "L",
    "Я": "Z",
    "Ч": "X",
    "С": "C",
    "М": "V",
    "И": "B",
    "Т": "N",
    "Ь": "M",
    "х": "[",
    "ї": "]",
    "Х": "{",
    "Ї": "}",
    "'": "`",
    "₴": "~",
    "б": ",",
    "Б": "<",
    "ю": ".",
    "Ю": ">",
    ".": "/",
    ",": "?",
    "\"": "@",
    "№": "#",
    ";": "$",
    ":": "^",
    "?": "&"
};


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "command") {
        console.log(request.command);
    }
    if (request.action === "transliterate") {
        // Get the input element
        const inputField = document.activeElement;
        var selectedText = "";
        const start = inputField.selectionStart;
        const end = inputField.selectionEnd;

        if (inputField.tagName === "TEXTAREA" || (inputField.tagName === "INPUT" && inputField.type === "text")) {
            selectedText = inputField.value.substring(start, end);
        } else {
            var selection = window.getSelection();
            if (selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                selectedText = range.toString();
            }
        }

        console.log(selectedText);

        // Check if selected text contains Cyrillic letters
        var containsCyrillic = /[\u0400-\u04FF]/.test(selectedText);

        // Use the appropriate letters object
        var lettersToUse = containsCyrillic ? letters : inverseLetters;

        // Transliterate selected text
        var transliteratedText = "";
        for (var i = 0; i < selectedText.length; i++) {
            var letter = selectedText.charAt(i);
            if (lettersToUse[letter]) {
                transliteratedText += lettersToUse[letter];
            } else {
                transliteratedText += letter;
            }
        }
        console.log(transliteratedText);

        inputField.value = inputField.value.substring(0, start) + transliteratedText + inputField.value.substring(end);
        inputField.setSelectionRange(start, end);
    }
});