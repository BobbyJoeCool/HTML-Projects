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

/*
 * test.js
 * Test harness for Fallout Solver
 */

/* =========================
   TEST DATA GENERATION
========================= */

/**
 * Runs a valid test scenario
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
        ]
	console.log("Generated Words:", words);

	const attempts = [{ guess: words[0], matches: 2 }];
    console.log("Attempt:", attempts)

	try {
		const result = listSolver(words, attempts);
		console.log("Filtered Result:", result);
	} catch (e) {
		console.error("Error:", e.message);
	}
}

function testInvalidWordList() {
	console.log("=== INVALID WORD LIST ===");

	const badWords = ["TEST", "BAD", 123];

	try {
		isListValid(badWords);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

function testEmptyList() {
	console.log("=== EMPTY LIST ===");

	try {
		isListValid([]);
	} catch (e) {
		console.error("Expected Error:", e.message);
	}
}

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

function runAllTests() {
	runValidTest();
	testInvalidWordList();
	testEmptyList();
	testInvalidAttempts();
	testImpossibleCase();
}

runAllTests();