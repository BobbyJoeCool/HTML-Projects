/**
 * Represents a playing card used in cribbage scoring.
 * @typedef {Object} Card
 * @property {string} rank - Card rank ("A", "2"-"10", "J", "Q", "K").
 * @property {string} suit - Card suit ("hearts", "diamonds", "clubs", "spades").
 * @property {number} value - Numerical value used for 15 calculations.
 */

/**
 * Represents the breakdown of cribbage scoring categories.
 * @typedef {Object} Scoring
 * @property {{label: string, points: number}} fifteens
 * @property {{label: string, points: number}} pairs
 * @property {{label: string, points: number}} runs
 * @property {{label: string, points: number}} flush
 * @property {{label: string, points: number}} knobs
 * @property {number} total
 */

/**
 * Builds the deck of cards and renders it in the DOM.
 * Creates a row for each suit and adds cards for each rank within that suit.
 */
function buildDeck() {
	const suits = ["hearts", "diamonds", "clubs", "spades"];
	const ranks = [
		"A",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"J",
		"Q",
		"K",
	];

	const deckContainer = document.getElementById("deck");

	suits.forEach((suit) => {
		// create a row for each suit
		const row = document.createElement("div");
		row.classList.add("suit-row");

		ranks.forEach((rank) => {
			// create the card
			const card = document.createElement("div");
			card.classList.add("card", `suit-${suit}`);
			card.dataset.rank = rank;
			card.dataset.suit = suit;
			card.dataset.value = cardValue(rank);

			row.appendChild(card);
		});

		deckContainer.appendChild(row);
	});
}

const handSlots = document.querySelectorAll("#hand .card-slot");
const cutSlot = document.querySelector("#cut-card .card-slot");

let handIndex = 0;
let cutFilled = false;

document.addEventListener("click", function (e) {
	const card = e.target.closest(".card");
	if (!card) return;

	if (card.closest("#hand") || card.closest("#cut-card")) {
		return;
	}

	// fill the hand first
	if (handIndex < handSlots.length) {
		handSlots[handIndex].appendChild(card);
		handIndex++;
	}
	// then fill the cut card
	else if (!cutFilled) {
		cutSlot.appendChild(card);
		cutFilled = true;
	}
});

/**
 * Resets the game state by clearing the deck, hand slots, cut card, and score.
 * Rebuilds the deck after clearing.
 */
function reset() {
	const deck = document.getElementById("deck");

	// remove everything from deck
	deck.innerHTML = "";

	// clear hand slots
	handSlots.forEach((slot) => {
		slot.innerHTML = "";
	});

	// clear cut card
	cutSlot.innerHTML = "";

	// reset state variables
	handIndex = 0;
	cutFilled = false;

	// reset Score
	const scoreContainer = document.getElementById("show-score");
	scoreContainer.textContent = `Score:`;

	// rebuild the deck
	buildDeck();
}

/**
 * Calculates the total score for the current hand by summing all scoring categories.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function scoreHand() {
	const scoring = {
		fifteens: { label: "", points: 0 },
		pairs: { label: "", points: 0 },
		runs: { label: "", points: 0 },
		flush: { label: "", points: 0 },
		knobs: { label: "", points: 0 },
		total: 0,
	};
	const cards = getAllCards();
	score15s(cards, scoring);
	scorePairs(cards, scoring);
	scoreRuns(cards, scoring);
	scoreFlush(cards, scoring);
	scoreKnobs(cards, scoring);
	displayScore(scoring);
}

/**
 * Scores combinations of cards that sum to 15.
 * Each combination of cards that add up to 15 scores 2 points.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function score15s(cards, scoring) {
	const values = cards.map((card) => card.value);

	let combinations = 0;

	// Nested For Loop using a Bitwise Function to iterate through all possible combinations of cards to look for 15s.
	for (let mask = 1; mask < 1 << values.length; mask++) {
		// cycles through each combination

		let sum = 0;

		for (let i = 0; i < values.length; i++) {
			// cycles through each card

			if (mask & (1 << i)) {
				// checks if the bit is active in this bit
				sum += values[i];
			}
		}

		if (sum === 15) combinations++;
	}

	const points = combinations * 2;

	scoring.fifteens.label = `${combinations} Fifteen${combinations !== 1 ? "s" : ""}:`;
	scoring.fifteens.points = points;
	scoring.total += points;
}

/**
 * Scores pairs in the hand.
 * Two of a kind: 2 points, three of a kind: 6 points, four of a kind: 12 points.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function scorePairs(cards, scoring) {
	const rankCounts = {};

	// Count how many of each rank
	cards.forEach((card) => {
		if (!rankCounts[card.rank]) {
			rankCounts[card.rank] = 0;
		}

		rankCounts[card.rank]++;
	});

	let score = 0;
	let pairs = 0;
	let triple = false;
	let quad = false;

	// convert counts into pairs
	Object.values(rankCounts).forEach((count) => {
		if (count >= 2) {
			score += count * (count - 1);
		}

		if (count === 2) pairs++;
		if (count === 3) triple = true;
		if (count === 4) quad = true;
	});

	let label = "";

	if (quad) label = "Four of a Kind:";
	else if (triple) label = "Three of a Kind:";
	else if (pairs === 2) label = "Two Pairs:";
	else if (pairs === 1) label = "One Pair:";

	scoring.pairs.label = label;
	scoring.pairs.points = score;
	scoring.total += score;
}

/**
 * Scores runs (sequences) in the hand.
 * A run of 3 cards: 3 points, 4 cards: 4 points, etc.
 * Multipliers apply for duplicate ranks in the run.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function scoreRuns(cards, scoring) {
	const values = cards.map((card) => rankForRuns(card.rank));

	const counts = {};
	values.forEach((v) => {
		counts[v] = (counts[v] || 0) + 1;
	});

	const uniqueValues = Object.keys(counts)
		.map((v) => parseInt(v))
		.sort((a, b) => a - b);

	let maxRunLength = 0;
	let bestMultiplier = 1;
	let score = 0;

	for (let start = 0; start < uniqueValues.length; start++) {
		let runLength = 1;
		let runMultiplier = counts[uniqueValues[start]];

		for (let next = start + 1; next < uniqueValues.length; next++) {
			if (uniqueValues[next] === uniqueValues[next - 1] + 1) {
				runLength++;
				runMultiplier *= counts[uniqueValues[next]];
			} else {
				break;
			}
		}

		if (runLength >= 3) {
			if (runLength > maxRunLength) {
				maxRunLength = runLength;
				bestMultiplier = runMultiplier;
				score = runLength * runMultiplier;
			} else if (runLength === maxRunLength) {
				score += runLength * runMultiplier;
			}
		}
	}

	let label = "";

	if (maxRunLength >= 3) {
		if (bestMultiplier === 4) label = "Double Double Run of";
		else if (bestMultiplier === 3) label = "Triple Run of";
		else if (bestMultiplier === 2) label = "Double Run of";
		else label = "Run of";

		label = `${label} ${maxRunLength}:`;
	}

	scoring.runs.label = label;
	scoring.runs.points = score;
	scoring.total += score;
}

/**
 * Scores flushes in the hand.
 * 4 cards of the same suit: 4 points, plus 1 if the cut card matches: 5 points total.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function scoreFlush(cards, scoring) {
	let score = 0;
	const suits = cards.map((card) => card.suit);

	if (suits[0] === suits[1] && suits[1] === suits[2] && suits[2] === suits[3]) {
		score += 4;
		if (suits[0] === suits[4]) {
			score += 1;
		}

		let label = `${score} card flush of ${suits[0]}:`;
		scoring.flush.label = label;
		scoring.flush.points = score;
		scoring.total += score;
	}
}

/**
 * Scores knobs (right jack).
 * 1 point if any jack in the hand matches the suit of the cut card.
 * @param {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function scoreKnobs(cards, scoring) {
	const cutSuit = cards[4].suit;

	for (let i = 0; i < 4; i++) {
		if (cards[i].rank === "J" && cards[i].suit === cutSuit) {
			scoring.knobs.label = "One for his Knobs:";
			scoring.knobs.points = 1;
			scoring.total += 1;
			return;
		}
	}
}

/**
 * Displays the calculated score in the UI.
 * @param {Scoring} scoring - Score breakdown object that will be updated.
 */
function displayScore(scoring) {
	let scoringString = `<p id="scoring-breakdown"><strong>Scoring Breakdown:</strong><br>`;

	for (const category in scoring) {
		if (category === "total") continue;

		if (scoring[category].label) {
			scoringString += `${scoring[category].label} ${scoring[category].points}<br>`;
		}
	}

	scoringString += `</p><strong>Total: ${scoring.total}</strong>`;

	const scoreContainer = document.getElementById("show-score");
	scoreContainer.innerHTML = `${scoringString}`;
}

/**
 * Gets the numerical value of a card rank for scoring purposes.
 * A=1, 2-10=face value, J/Q/K=10.
 * @param {string} rank - The card rank (A,2-10,J,Q,K).
 * @returns {number} The numerical value.
 */
function cardValue(rank) {
	if (rank === "A") return 1;
	if (["K", "Q", "J"].includes(rank)) return 10;

	return parseInt(rank);
}

/**
 * Retrieves all cards currently in the hand and cut card slots.
 * @returns {Card[]} cards - The five cards in the hand (four hand cards plus the cut card).
 */
function getAllCards() {
	const cards = [];

	handSlots.forEach((slot) => {
		const card = slot.querySelector(".card");

		cards.push({
			rank: card.dataset.rank,
			suit: card.dataset.suit,
			value: Number(card.dataset.value),
		});
	});

	const cut = cutSlot.querySelector(".card");

	cards.push({
		rank: cut.dataset.rank,
		suit: cut.dataset.suit,
		value: Number(cut.dataset.value),
	});

	return cards;
}

/**
 * Converts card rank to numerical value for run detection.
 * A=1, J=11, Q=12, K=13, others as is.
 * @param {string} rank - The card rank.
 * @returns {number} The numerical value for run calculation.
 */
function rankForRuns(rank) {
	if (rank === "A") return 1;
	if (rank === "J") return 11;
	if (rank === "Q") return 12;
	if (rank === "K") return 13;
	return parseInt(rank);
}

buildDeck();
