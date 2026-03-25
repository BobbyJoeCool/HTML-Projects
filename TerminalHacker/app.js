/**
 * This module controls the functionality of the
 * UI for the Terminal Solver progrgram.
 */

/**
 * Global application state
 */
const appState = {
  masterList: [],     // Original word list entered by the user
  currentList: [],    // Filtered list of possible passwords
  attempts: [],       // Array of objects {guess: string, matches: number}
  selectedWord: null, // Currently selected word from UI
};

/**
 * Validates and stores the master word list, and switches UI to solving mode
 *
 * @param {string[]} wordsArray - Array of words entered by the user
 */
function storeWords(wordsArray) {
  // TODO: Validate wordsArray
  // TODO: Copy to appState.masterList and appState.currentList
  // TODO: Switch UI to solver mode
  // TODO: Render word list
}

/**
 * Hides the word entry area and shows the solver area
 */
function switchToSolvingMode() {
  // TODO: Hide word entry section
  // TODO: Show solver/selection section
}

/**
 * Handles selecting a word from the available list
 *
 * @param {string} word - Word selected by the user
 */
function selectWord(word) {
  // TODO: Store selection in appState.selectedWord
  // TODO: Highlight selected word in UI
}

/**
 * Submits the match count for the currently selected word,
 * calls the solver, updates attempts, and renders results
 *
 * @param {number} matchCount - Number of letters matching the correct position
 */
function submitMatchCount(matchCount) {
  // TODO: Check a word is selected
  // TODO: Push attempt to appState.attempts
  // TODO: Call listSolver with currentList and attempts
  // TODO: Update appState.currentList
  // TODO: Render word list and attempts
  // TODO: Reset selectedWord
  // TODO: Handle errors
}

/**
 * Renders the current list of possible words in the UI
 */
function renderWordList() {
  // TODO: Iterate through appState.currentList
  // TODO: Display each word as a clickable element
}

/**
 * Renders the history of guesses and their match counts
 */
function renderAttempts() {
  // TODO: Iterate through appState.attempts
  // TODO: Display each attempt in a readable format
}

/**
 * Displays an error message in the output/error area
 *
 * @param {string} message - Error message to display
 */
function showError(message) {
  // TODO: Update output area with message
}

/**
 * Highlights the currently selected word in the UI
 *
 * @param {string} word - Word to highlight
 */
function highlightSelectedWord(word) {
  // TODO: Add/remove CSS class for visual feedback
}

/**
 * Resets the app to initial state
 */
function resetApp() {
  // TODO: Clear appState
  // TODO: Reset UI sections
  // TODO: Show word entry area
}

/* =======================
   Event Listeners
======================= */

// Word list submission button
document.getElementById("submit-word-list").addEventListener("click", () => {
  // TODO: Read word input value, split into array, call storeWords()
});

// Match count submission button
document.getElementById("submit-match").addEventListener("click", () => {
  // TODO: Read match count input value, parseInt, call submitMatchCount()
});