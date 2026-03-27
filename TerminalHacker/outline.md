# Project Outline: Terminal Hacking Solver

## 1. Problem Definition

Build a responsive web application that helps players solve the Fallout terminal hacking puzzle by filtering candidate passwords based on exact-match feedback.

---

## 2. Inputs and Outputs

### Inputs

- List of candidate words entered through a textarea
- A selected guess from the displayed word list
- Match count: number of letters in the correct position

### Outputs

- Updated list of valid candidate words
- Attempt history showing previous guesses and match counts
- Error messages for invalid input

---

## 3. System Architecture

- Client-side web application
- Runs entirely in the browser
- No backend required
- Static assets include HTML, CSS, and JavaScript

---

## 4. Core Modules

### 4.1 UI Layer (`index.html`, `style.css`)

Responsibilities:

- Render the terminal-style interface
- Collect word list input
- Display selectable candidate words
- Show selected guess and match input
- Display attempt history and feedback messages

---

### 4.2 State Management (`app.js`)

State Model:

```js
{
  masterList: [],
  currentList: [],
  attempts: [],
  selectedWord: null,
}
```

Responsibilities:

- Validate and store the input word list
- Manage user selections and attempt history
- Call solver logic on each submitted guess
- Update the UI based on state changes

---

### 4.3 Solver Logic (`solver.js`)

Functions:

- `isListValid(words)`
  - Validates the word list structure and equal length requirement
- `isAttemptsValid(attempts, wordLength)`
  - Validates each guess/match record
- `listSolver(words, attempts)`
  - Filters candidate words to those consistent with all guess constraints

---

### 4.4 Test Harness (`test.html`, `test.js`)

Responsibilities:

- Provide example test cases for solver behavior
- Validate invalid input handling
- Confirm impossible constraint detection

---

## 5. Application Flow

Input words → Validate list → Store list → Display candidates → Select guess → Enter match count → Submit attempt → Recalculate valid words → Update UI → Repeat

---

## 6. Algorithm Details

### Match Counting

- Compare characters at each index between a guess and a candidate
- Count positions where letters match exactly

Time Complexity: O(m) per comparison, where `m` is word length

---

### Constraint Filtering

- For each candidate word:
  - Verify it matches every guess exactly in the required positions
  - Keep only valid candidates

Time Complexity: O(n × k × m)

- `n` = number of candidate words
- `k` = number of submitted attempts
- `m` = word length

---

## 7. UI / UX Considerations

### Mobile-Friendly

- Single-column terminal container
- Large buttons and input controls
- Scrollable candidate list for small screens

### Interaction Design

- CTRL+ENTER or button to submit word list
- Click/tap a word to choose it
- Enter match count and submit each guess
- Immediate filtering and history updates

### Feedback

- Error messages for invalid formats or empty input
- Highlight selected word visibly
- Disable eliminated candidate buttons

---

## 8. Edge Cases

- Empty or missing word list
- Words with mixed lengths
- Non-string or malformed entries
- Invalid match count values
- No word selected when submitting
- All candidates eliminated by constraints

---

## 9. Testing Strategy

### Unit Tests

- Validate word list structure
- Validate attempt history format
- Filter candidate words with `listSolver`

### Integration Tests

- Run the full app flow with example inputs
- Test invalid user inputs and error messaging
- Confirm the solver updates candidate lists consistently

---

## 10. Development Plan

### Phase 1

- Build solver and input validation

### Phase 2

- Create the terminal-style UI

### Phase 3

- Wire interactions and state updates

### Phase 4

- Add history, validation, and UX polish

### Phase 5

- Add optional features like guess suggestions and persistence

---

## 11. End Goal

Create a clean, responsive web app that:

- helps players solve Fallout terminal hacking puzzles
- surfaces valid candidate words after each guess
- demonstrates practical frontend state management and algorithm design
