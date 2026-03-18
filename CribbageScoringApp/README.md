# Cribbage Hand Scoring App

A browser-based Cribbage scoring calculator built with **HTML, CSS, and JavaScript**.

This application allows users to select a Cribbage hand and automatically calculates the score according to official rules.

---

## Features

### Hand Scoring

Users can select:

- Four cards for their hand
- One flip card (starter card)

The application then calculates the total score.

---

### Score Breakdown

The score is broken down by category:

- Fifteens
- Pairs
- Runs
- Flush
- Knobs

Example output:

Total Score: 12

15s: 4  
Pairs: 2  
Runs: 3  
Flush: 2  
Knobs: 1

---

### Crib Mode

A toggle that switches scoring rules for the **crib**.

Flush rules change:

Normal Hand:

- 4-card flush allowed

Crib:

- Flush only counts if all **5 cards match**

---

## Card Interface

Cards are displayed using a simple visual design:

```
┌─────────┐
│ K       │
│    ♠    │
│       K │
└─────────┘
```

Each card includes:

- Rank in top-left
- Suit icon in center
- Rank in bottom-right

Suit icons:

- ♥ Hearts
- ♦ Diamonds
- ♣ Clubs
- ♠ Spades

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

Concepts demonstrated:

- DOM manipulation
- Event handling
- Game rule algorithms
- Responsive layout
- Modular JavaScript design

---

## Project Structure

```
cribbage-scoring-app
│
├── index.html
├── style.css
├── script.js
│
├── assets
│ ├── suits
│ │ ├── hearts.png
│ │ ├── diamonds.png
│ │ ├── clubs.png
│ │ └── spades.png
│
├── outline.md
└── README.md
```

---

## How to Use

1. Select four cards for your hand.
2. Select the flip card.
3. Click **Calculate Score**.
4. View the total score and scoring breakdown.

Optional:

Enable **Crib Mode** to apply crib scoring rules.

---

## Future Improvements

Possible enhancements include:

- Drag-and-drop card selection
- Full deck visual picker
- Pegging simulator
- Mobile interface improvements
- Hand probability analysis

---

## Author

Robert Breutzmann

Web Development Portfolio Project
