# Fallout Terminal Hacking Solver (Web App)

A mobile-friendly web application that assists players in solving the terminal hacking minigame from Fallout 3, Fallout: New Vegas, and Fallout 4.

---

## Project Overview

This application helps players deduce the correct password by applying logical constraints based on feedback from each guess.

### Game Rules Recap

- A list of candidate words is provided (all equal length)
- The user has limited attempts to guess the correct password
- After each guess, the system returns:
  - Number of correct letters in the correct position

The application uses this feedback to eliminate impossible words and narrow down the solution.

---

## Key Improvement Over Basic Solvers

This app uses a constraint-based system, not step-by-step filtering.

- All guesses are stored as constraints
- The solution space is recomputed from the original list each time
- Ensures correctness across multiple guesses

---

## How It Works

1. User inputs a list of candidate words
2. The app validates and stores the list
3. User selects a guess
4. User inputs match count
5. The guess is stored as a constraint
6. The app recalculates valid candidates using all constraints
7. Process repeats until one word remains

---

## Tech Stack

- HTML5
- CSS3 (Mobile-first responsive design)
- JavaScript (Vanilla)

---

## Core Concepts Demonstrated

- DOM manipulation
- Event-driven architecture
- State management
- Constraint-based filtering
- Algorithm design
- Responsive UI development

---

## Features

- Mobile-friendly interface
- Tap-to-select word interaction
- Constraint history tracking
- Real-time candidate filtering
- Input validation and error handling

---

## Example Workflow

Input words:

CRANE  
SLATE  
PLANE  
FLAME  

Step 1:

- Guess: CRANE
- Matches: 2

Step 2:

- Guess: SLATE
- Matches: 1

Result:

- Filtered list updates based on both constraints

---

## Project Structure

```bash
fallout-hacking-solver/  
│  
├── index.html  
├── styles.css  
├── app.js  
├── solver.js  
│  
├── README.md  
└── outline.md  
```

---

## Future Enhancements

- Best guess suggestion (information gain strategy)
- Import word lists from file
- Local storage persistence
- Fallout-style terminal theme
- Progressive Web App (PWA)

---

## Portfolio Value

This project demonstrates:

- Translating game mechanics into software systems
- Designing constraint-solving algorithms
- Managing application state without frameworks
- Building responsive, user-friendly interfaces
