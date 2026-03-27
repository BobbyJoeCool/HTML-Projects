/*
 *   This module contains the solving logic for the app.
 *   The module contains three functions:
 *       - Validate the list of words entered by are all the same length.
 * 		 - Validate the array of objects that contains the history of attempts
 *       - Check the list of words for the criteria entered.
 */

/**
 * This function receives a list of words and validates that they are all
 * the same length and properly formatted for the terminal hacker program.
 *
 * @param {string[]} words - A list of words entered by the user.
 * @throws {Error} When the input is not a valid, same-length string array.
 * @returns {boolean} - True if the list is valid.
 */
function isListValid(words) {
	if (!Array.isArray(words)) {
		throw new Error("Input must be an array")
	}

	if (words.length === 0) {
		throw new Error("Word list cannot be empty")
	}

	const wordLength = words[0].length;

	for (const word of words) {
		if (typeof word !== "string") {
			throw new Error("All items must be strings")
		}

		if (word.length !== wordLength) {
			throw new Error("All words must be the same length")
		}
	}

	return true;
}

/**
 * Checks the array of attempts to ensure that it is valid.
 * 
 * @param {{guess: string, matches: number }[]} attempts - Validation history for the solver.
 * @param {number} wordLength - The expected length of each guess word.
 * @throws {Error} When any attempt is malformed or violates length/match constraints.
 * @returns {boolean} - True if the list is valid.
 */
function isAttemptsValid(attempts, wordLength) {
	if (!Array.isArray(attempts)) {
		throw new Error("Attempts must be an array")
	}

	for (const attempt of attempts) {
		if (
			typeof attempt.guess !== "string" ||
			typeof attempt.matches !== "number"
		) {
			throw new Error("Invalid attempt format")
		}

		if (attempt.guess.length !== wordLength) {
			throw new Error("Attempt guess length mismatch")
		}

		if (attempt.matches < 0 || attempt.matches > wordLength) {
			throw new Error("Invalid match count")
		}
	}

	return true
}

/**
 * Applies the solver logic to return words that satisfy all provided attempts.
 *
 * @param {string[]} words - The remaining list of possible matches.
 * @param {{guess: string, matches: number }[]} attempts - The guess history from the user.
 * @throws {Error} When the input is invalid or the constraints eliminate all options.
 * @returns {string[]} - The filtered list of valid matching words.
 */
function listSolver(words, attempts) {
	let newList = []
	
	isListValid(words)
	isAttemptsValid(attempts, words[0].length)

	for (const word of words) {
		let isValid = true

		for (const attempt of attempts) {
			let count = 0

			for (let i = 0; i < word.length; i++) {
				if (word[i] === attempt.guess[i]) {
					count++
				}
			}

			if (count !== attempt.matches) {
				isValid = false
				break
			}
		}

		if (isValid) {
			newList.push(word)
		}
	}

	if (newList.length === 0) {
		throw new Error("New constraints eliminate all words.")
	}

	return newList

}
