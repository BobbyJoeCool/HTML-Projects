/**
 * This module controls the functionality of the
 * UI for the Terminal Solver progrgram.
 */

/**
 * Global application state
 */
const appState = {
	masterList: [], // Original word list entered by the user
	currentList: [], // Filtered list of possible passwords
	attempts: [], // Array of objects {guess: string, matches: number}
	selectedWord: null, // Currently selected word from UI
};

/** =======================
 * Variables holding HTML elements for listeners
 */
const UI = {
	systemMessage: document.getElementById("output-message"),
	wordInput: document.getElementById("word-input"),
	wordListButton: document.getElementById("load-btn"),
	activeWordList: document.getElementById("word-list"),
    selectedWord: document.getElementById("selected-word"),
	matchInput: document.getElementById("match-input"),
	submitButton: document.getElementById("submit-attempt"),
	historyList: document.getElementById("history-list"),
	resultsList: document.getElementById("results-list"),
    setupClass: document.getElementById("input-section"),
    runtimeClass: document.getElementById("runtime"),
};

/**
 * Validates and stores the master word list, and switches UI to solving mode
 *
 * @param {string[]} wordsArray - Array of words entered by the user
 */
function storeWords(wordsArray) {
	isListValid(wordsArray);

	appState.masterList = wordsArray;
    appState.currentList = wordsArray;

    UI.setupClass.classList.add("hidden");
    UI.runtimeClass.classList.remove("hidden");

	renderWordList();
    clearError();
    UI.systemMessage.textContent = "Select a word and number of matching characters."
}

/**
 * Handles selecting a word from the available list
 *
 * @param {string} word - Word selected by the user
 */
function selectWord(clickedButton) {
    appState.selectedWord = clickedButton.textContent;
    const allButtons = document.querySelectorAll(".word-btn");

    allButtons.forEach(btn => {
        if (btn === clickedButton) {
            // Highlight the clicked button
            btn.classList.add("selected");
            btn.classList.remove("unselected");
        } else {
            // Unhighlight other buttons
            btn.classList.remove("selected");
            if (!btn.classList.contains("eliminated")) {
                btn.classList.add("unselected");
            }
        }
    });

    // Get the word from the button
    const selectedWord = clickedButton.textContent;

    // Store or use the selected word
    appState.selectedWord = selectedWord;
    UI.selectedWord.textContent = selectedWord;
}


UI.submitButton.addEventListener("click", submitMatchCount);
/**
 * Submits the match count for the currently selected word, validates input,
 * updates the attempt history, and refreshes the candidate list.
 *
 * @returns {void}
 */
function submitMatchCount() {
    if (!appState.selectedWord) {
        showError("No word selected.");
        return;
    }

    const rawValue = UI.matchInput.value.trim();
    const matchCount = Number(rawValue);

    if (rawValue === "") {
        showError("Match Count cannot be empty.");
        return;
    } else if (!Number.isInteger(matchCount)) {
        showError("Match Count must be a whole number.");
        return;
    }

    appState.attempts.push({
        guess: appState.selectedWord,
        matches: matchCount,
    });

    try {
        appState.currentList = listSolver(appState.currentList, appState.attempts);
    } catch (e) {
        showError(e.message);
        return;
    }

    renderWordList();
    renderAttempts();
    UI.matchInput.value = "";
    UI.selectedWord.textContent = "";
}

/**
 * Builds the list of word candidate buttons and applies elimination styling.
 *
 * @returns {void}
 */
function renderWordList() {
    // Clear the list
    const originalList = appState.masterList;
    const currentList = appState.currentList;

    UI.activeWordList.textContent = "";
    
    for (const word of originalList) {
        // Create a button element for each word
        const wordBtn = document.createElement("button");
        wordBtn.textContent = word;
        wordBtn.classList.add("word-btn");
        wordBtn.classList.add("unselected");
        if (!currentList.includes(word)) {
            wordBtn.classList.add("eliminated");
            wordBtn.disabled = true;
        }

        // add a click listener for selecting this word
        wordBtn.addEventListener("click", () => {
            selectWord(wordBtn); // sends the button pressed
        });

        // Append the button to the word list
        UI.activeWordList.appendChild(wordBtn);
    }
}

/**
 * Renders the history of guesses and their match counts
 */
function renderAttempts() {
    let attemptString = "";

	appState.attempts.forEach(attempt => {
        attemptString += "> ";
        attemptString += attempt.guess + " ";
        attemptString += "-".repeat(30 - appState.masterList[0].length);
        attemptString += " " + attempt.matches;
        attemptString += "<br>";
    });
	
    UI.historyList.innerHTML = attemptString;
}

/**
 * Displays an error message in the output/error area
 *
 * @param {string} message - Error message to display
 */
function showError(message) {
	UI.systemMessage.textContent = message;
    UI.systemMessage.classList.add("error");
    UI.systemMessage.classList.remove("message");
}

/**
 * Clears any visible error message and restores the default informational styling.
 *
 * @returns {void}
 */
function clearError() {
	UI.systemMessage.textContent = "";
    UI.systemMessage.classList.add("message");
    UI.systemMessage.classList.remove("error");
}

/**
 * Resets the application state and UI back to the initial word entry screen.
 *
 * @returns {void}
 */
function resetApp() {
    appState.masterList = [];
    appState.currentList = [];
    appState.attempts = [];
    appState.selectedWord = null;
    UI.setupClass.classList.remove("hidden");
    UI.runtimeClass.classList.add("hidden");
    clearError();
    UI.systemMessage.textContent = "Enter Password Candidates";
    UI.historyList.textContent = "";
    UI.activeWordList.textContent = "";
    UI.matchInput.value = "";
}

/** ===============
 *  Event Listeners
 */

// ===== Submit Word List =====

UI.wordListButton.addEventListener("click", wordListSubmitButton);
UI.wordInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter" && e.ctrlKey) {
		e.preventDefault(); // stop newline
		wordListSubmitButton();
	}
});

/**
 * Reads the user's word list input, validates the format, and advances the app to solving mode.
 *
 * @returns {void}
 */
function wordListSubmitButton() {
	clearError();
	const inputText = UI.wordInput.value.trim();
	if (!inputText) {
		showError("Please enter a list of words.");
		return;
	}

	// Split input into array by newlines, spaces, or commas
	const wordsArray = inputText
		.toUpperCase()
		.split(/[\s,]+/)
		.map((w) => w.trim())
		.filter((w) => w.length > 0);

	try {
		storeWords(wordsArray);
	} catch (e) {
		showError(e.message);
	}
}
