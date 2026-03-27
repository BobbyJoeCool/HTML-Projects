# Terminal Hacking Solver (Web App)

A mobile-friendly browser app that helps players solve the Fallout terminal hacking puzzle by filtering candidate passwords using exact-match feedback.

---

## Project Overview

This app lets the user enter a list of candidate words, then select guesses and enter the number of exact letter matches returned by the game.

### Game Rules Recap

- Candidate words must all be the same length
- The user selects one guess from the candidate list
- The game returns the number of letters in the correct position
- The app eliminates words that cannot satisfy all previous guesses

The solver recomputes the valid word list from the original candidate set each time a guess is submitted.

---

## How It Works

1. The user enters a list of password candidates in the textarea
2. The app validates the list and switches into solve mode
3. Available words appear as selectable buttons
4. The user selects a word and enters the match count
5. The guess is added to the attempt history
6. The app filters candidate words using all stored constraints
7. The remaining candidates update instantly

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)

---

## Core Concepts Demonstrated

- DOM manipulation
- Event-driven UI updates
- Application state management
- Constraint-based filtering logic
- Input validation and user feedback
- Responsive layout design

---

## Features

- Responsive terminal-style UI
- Word list input via textarea
- CTRL+ENTER or button submit for words
- Tap/click selection of candidate words
- Match count input with validation
- Live filtered candidate list
- Attempt history display
- Error messaging for invalid input

---

## Example Workflow

Input words:

CRANE  
SLATE  
PLANE  
PRESS  

Step 1:

- Guess: CRANE
- Matches: 2

Step 2:

- Guess: SLATE
- Matches: 1

Result:

- The candidate list updates to only words satisfying both guesses

---

## Project Structure

```bash
TerminalHacker/
├── index.html
├── style.css
├── app.js
├── solver.js
├── test.html
├── test.js
├── README.md
├── outline.md
└── VersionNotes.md
```

---

## Future Enhancements

- Suggest the best next guess using information gain
- Import/export word lists
- Save progress with localStorage
- Add more Fallout-inspired terminal styling
- Convert to a PWA

---

## Portfolio Value

This project shows how to:

- turn a game puzzle into a working frontend app
- implement constraint propagation in JavaScript
- manage state without frameworks
- build a responsive and accessible interface
