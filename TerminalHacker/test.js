/*
 * test.js
 * Test harness for Fallout Solver
 */

/* =========================
   TEST DATA GENERATION
========================= */

/**
 * Generates a list of random uppercase words
 *
 * @param {number} count - Number of words
 * @param {number} length - Length of each word
 * @returns {string[]}
 */
function generateWords(count, length) {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const words = [];

	for (let i = 0; i < count; i++) {
		let word = "";
		for (let j = 0; j < length; j++) {
			word += letters[Math.floor(Math.random() * letters.length)];
		}
		words.push(word);
	}

	return words;
}

/**
 * Runs a normal test scenario using a valid word list and a starter guess.
 *
 * @returns {void}
 */
function runValidTest() {
	console.log("=== VALID TEST ===");

	const words = [
        "CRANE", 
        "SLATE", 
        "PLANE",
        "STORE",
        "ASIDE",
        "MERRY",
        "HAPPY",
        "BONES",
        "DRAKE",
        "ALIVE",
        "DEATH",
        "PRIDE"
        ];
	console.log("Generated Words:", words);

	const attempts = [{ guess: words[0], matches: 2 }];
    console.log("Attempt:", attempts);

	try {
		const result = listSolver(words, attempts);
		console.log("Filtered Result:", result);
	} catch (e) {
		console.error("Error:", e.message);
	}
}

/**
 * Verifies that a malformed word list throws validation errors.
 *
 * @returns {void}
 */
function testInvalidWordList() {
	console.log("=== INVALID WORD LIST ===");

	const badWords = ["TEST", "BAD", 123];

	try {
		isListValid(badWords);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

/**
 * Verifies that an empty word list is rejected by the validator.
 *
 * @returns {void}
 */
function testEmptyList() {
	console.log("=== EMPTY LIST ===");

	try {
		isListValid([]);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

/**
 * Verifies that malformed attempt objects are rejected by the solver.
 *
 * @returns {void}
 */
function testInvalidAttempts() {
	console.log("=== INVALID ATTEMPTS ===");

	const words = generateWords(5, 5);

	const badAttempts = [
		{ guess: "ABCDE", matches: "two" }, // invalid type
	];

	try {
		listSolver(words, badAttempts);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

/**
 * Verifies that an impossible combination of attempts produces an error.
 *
 * @returns {void}
 */
function testImpossibleCase() {
	console.log("=== IMPOSSIBLE CASE ===");

	const words = ["AAAAA", "BBBBB", "CCCCC"];

	const attempts = [
		{ guess: "AAAAA", matches: 5 },
		{ guess: "BBBBB", matches: 5 }, // impossible combo
	];

	try {
		const result = listSolver(words, attempts);
		console.log(result);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

/**
 * Runs all available test cases for the solver harness.
 *
 * @returns {void}
 */
function runAllTests() {
	runValidTest();
	testInvalidWordList();
	testEmptyList();
	testInvalidAttempts();
	testImpossibleCase();
}

runAllTests();