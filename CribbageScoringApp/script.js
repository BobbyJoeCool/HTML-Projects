
function buildDeck() {

    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const deckContainer = document.getElementById("deck");

    suits.forEach(suit => {

        // create a row for each suit
        const row = document.createElement("div");
        row.classList.add("suit-row");

        ranks.forEach(rank => {

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

document.addEventListener("click", function(e) {

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

function reset() {
    const deck = document.getElementById("deck");

    // remove everything from deck
    deck.innerHTML = "";

    // clear hand slots
    handSlots.forEach(slot => {
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

function scoreHand() {
    let score = 0;
    const cards = getAllCards()
    score += score15s(cards);
    score += scorePairs(cards);
    score += scoreRuns(cards);
    score += scoreFlush(cards);
    score += scoreKnobs(cards);
    displayScore(score);
}

function score15s(cards) {

    const values = cards.map(card => card.value)

    let combinations = 0;

    // Nested For Loop using a Bitwise Function to iterate through all possible combinations of cards to look for 15s.
    for (let mask = 1; mask < (1 << values.length); mask++) {

        let sum = 0;

        for (let i = 0; i < values.length; i++) {

            if (mask & (1 << i)) {
                sum += values[i];
            }
        }

        if (sum === 15) combinations++

    }

    return combinations * 2;

}

function scorePairs(cards) {

    const rankCounts = {};

    // Count how many of each rank
    cards.forEach(card => {

        if (!rankCounts[card.rank]) {
            rankCounts[card.rank] = 0;
        }

        rankCounts[card.rank]++;

    });

    let score = 0;

    // convert counts into pairs
    Object.values(rankCounts).forEach(count => {
        if (count >= 2) {
            score += count * (count - 1);
        }
    });

    return score;

}

function scoreRuns(cards) {

    const values = cards.map(card => rankForRuns(card.rank));

    const counts = {};
    values.forEach(v => {
        counts[v] = (counts[v] || 0) + 1;
    });

    const uniqueValues = Object.keys(counts)
        .map(v => parseInt(v))
        .sort((a, b) => a - b);
    
    let maxRunLength = 0;
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
                score = runLength * runMultiplier;
            } else if (runLength === maxRunLength) {
                score += runLength * runMultiplier;
            }
        }
    }

    return score;
}

function scoreFlush(cards) {
    let score = 0;
    const suits = cards.map(card => card.suit)

    if (suits[0] === suits[1] && suits [1] === suits[2] && suits[2] === suits[3]) {
        score += 4;
        if (suits[0] === suits[4]) {
            score += 1;
        };
    };

    return score;

}

function scoreKnobs(cards) {
    for (let i = 0; i < 4; i++) {
        if (cards[i].rank === "J" && cards[i].suit === cards[4].suit) {
            return 1;  // One point for his Knobs.
        }
    }

    return 0; // No knobs found.
}

function displayScore(score) {
    const scoreContainer = document.getElementById("show-score");
    scoreContainer.textContent = `Score: ${score}`;
}

function cardValue(rank) {
    if (rank === "A") return 1;
    if (["K", "Q", "J"].includes(rank)) return 10;

    return parseInt(rank);
}

function getAllCards() {
    const cards = [];

    handSlots.forEach(slot => {
        const card = slot.querySelector(".card");

        cards.push({
            rank: card.dataset.rank,
            suit: card.dataset.suit,
            value: Number(card.dataset.value)
        });
    });

    const cut = cutSlot.querySelector(".card");

    cards.push({
        rank: cut.dataset.rank,
        suit: cut.dataset.suit,
        value: Number(cut.dataset.value)
    });

    return cards;
}

function rankForRuns(rank) {
    if (rank === "A") return 1;
    if (rank === "J") return 11;
    if (rank === "Q") return 12;
    if (rank === "K") return 13;
    return parseInt(rank);
}

buildDeck();