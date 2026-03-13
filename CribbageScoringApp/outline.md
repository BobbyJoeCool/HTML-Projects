# Cribbage Hand Scoring App — Project Outline

## 1. Project Overview
The Cribbage Hand Scoring App is a browser-based tool built with **HTML, CSS, and JavaScript** that calculates the score of a Cribbage hand.

Users will select:
- **Four cards for their hand**
- **One flip card**

The application will then compute the **total Cribbage score** according to official rules and provide a **detailed breakdown of scoring categories**.

The goal of the project is to demonstrate:
- DOM manipulation
- Interactive UI design
- Algorithmic logic in JavaScript
- Clean modular code organization
- Game rule implementation

---

# 2. Core Features (MVP)

## Card Selection
Users can select:

- 4 cards representing their hand
- 1 flip card (starter card)

Cards will be chosen from a visual card interface.

### Card Representation
Cards will display:

Top left:  
- Rank (A–K)

Center:  
- Suit icon

Bottom right:  
- Rank

Suit icons will include:

- Hearts
- Diamonds
- Clubs
- Spades

Each card will be rendered using a reusable card component.

---

## Score Calculation

The application will calculate the hand score based on standard Cribbage rules.

Scoring categories include:

### Fifteens
All combinations of cards that total **15**.

Score:  
2 points per combination.

---

### Pairs
Any matching ranks.

Score values:

Pair = 2 points  
Three of a kind = 6 points  
Four of a kind = 12 points

---

### Runs
Sequential card values.

Examples:

Run of 3 → 3 points  
Run of 4 → 4 points  
Run of 5 → 5 points  

Multiple runs must be detected (e.g., double runs).

---

### Flush
Four or five cards of the same suit.

Rules:
- 4 card flush in the hand = 4 points
- 5 card flush (including flip) = 5 points

---

### Knobs (His Nobs)
Jack in hand matching the **suit of the flip card**.

Score:  
1 point

---

# 3. Enhanced Features

## Score Breakdown
Instead of displaying only the final score, the program will show:

Total Score

Breakdown including:
- Fifteens
- Pairs
- Runs
- Flush
- Knobs

Example output:

Total Score: 12

15s: 4 points  
Pairs: 2 points  
Runs: 3 points  
Flush: 2 points  
Knobs: 1 point

---

## Crib Mode
A toggle allowing the user to score a **crib hand**.

Crib rules difference:

Flush only counts if **all 5 cards match the suit**.

Implementation:

Toggle button:

- Hand Mode
- Crib Mode

The scoring logic will adjust flush rules accordingly.

---

# 4. Interface Layout

## Layout Structure

Header

Card Selection Area

[Card 1] [Card 2] [Card 3] [Card 4]

Flip Card

[Starter Card]

Buttons
Calculate Score
Reset Hand
Toggle Crib Mode

Score Display

Total Score

Breakdown List


---

# 5. Technical Design

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)

Optional enhancements:
- CSS Grid / Flexbox
- Modular JavaScript
- Local storage for remembering last hand

---

## Data Model

Each card will be represented as an object.

Example:


{
rank: "5",
value: 5,
suit: "hearts"
}


Card values will follow Cribbage rules:

A = 1  
2–10 = face value  
J, Q, K = 10

---

## Core Logic Modules

### Card Module
Handles:
- Card creation
- Card rendering
- Suit icons

---

### Hand Manager
Handles:
- Card selection
- Preventing duplicate cards
- Managing the 4 hand cards + flip card

---

### Scoring Engine

Functions include:

- calculateFifteens()
- calculatePairs()
- calculateRuns()
- calculateFlush()
- calculateKnobs()

Final function:


scoreHand(handCards, flipCard)


Returns:


{
total: number,
fifteens: number,
pairs: number,
runs: number,
flush: number,
knobs: number
}


---

# 6. Visual Design

## Card Style

Cards will resemble physical playing cards.

Layout:


```
┌─────────┐
│ A       │
│    ♥    │
│       A │
└─────────┘
```


Design considerations:

- Rounded corners
- Subtle shadow
- Suit color coding
- Responsive scaling

---

# 7. Future Enhancements

Possible future upgrades:

- Drag-and-drop card selection
- Mobile optimized layout

---

# 8. Learning Goals

This project demonstrates proficiency in:

- JavaScript algorithms
- DOM event handling
- Dynamic UI updates
- Modular project structure
- Implementing game rules in code

---

# 9. Deliverables

Final project will include:

- Functional scoring app
- Clean UI
- Source code with comments
- README documentation
- GitHub repository