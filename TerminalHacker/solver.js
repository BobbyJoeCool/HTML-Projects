/*
 *   This module contains the solving logic for the app.
 *   The module contains three functions:
 *       - Validate the list of words entered by are all the same length.
 * 		 - Validate the array of objects that contains the history of attempts
 *       - Check the list of words for the criteria entered.
 */

/**
 * This function reveives a list of words and makes sure they are
 * a valid list of words for the terminal hacker program
 *
 * @param {string[]} words - A list of words entered by the user.
 *
 * @return {boolean} - True if the list is valid, otherwise an error if it isn't.
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
 * @param {{guess: string, matches: number }[]} attempts 
 * 
 * @return {boolean} - True if the list is valid, otherwise an error if it isn't.
 */
function isAttemptsValid(attempts) {
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
 * Contains the solver logic for the program.
 * 
 * @param {string[]} words - The remaining list of possible matches
 * @param {{guess: string, matches: number }[]} attempts - This is the guess history from the user
 * 
 * @returns {string[]} - The remaining list of possible matches or an error message.
 */
function listSolver(words, attempts) {
	let newList = []
	
	isListValid(words)

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
