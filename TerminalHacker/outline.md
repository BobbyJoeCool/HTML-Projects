# Project Outline: Fallout Terminal Hacking Solver

## 1. Problem Definition

Develop a responsive web application that solves the Fallout terminal hacking puzzle using constraint-based logic.

---

## 2. Inputs and Outputs

### Inputs

- List of candidate words (equal length)
- User-selected guess
- Match count (correct letters in correct position)

### Outputs

- Filtered list of valid candidate words

---

## 3. System Architecture

- Client-side only application
- Runs entirely in browser
- No backend required
- State-driven UI updates

---

## 4. Core Modules

### 4.1 UI Layer (index.html, styles.css)

Responsibilities:

- Input area for word list
- Display candidate words
- Allow word selection (tap/click)
- Input for match count
- Display guess history
- Render filtered results

---

### 4.2 State Management (app.js)

State Model:

{
  originalWords: [],
  filteredWords: [],
  wordLength: null,
  selectedGuess: null,
  history: []
}

Responsibilities:

- Handle user interactions
- Maintain application state
- Trigger solver recalculation
- Update UI dynamically

---

### 4.3 Solver Logic (solver.js)

countMatches(word1, word2)

- Compares characters by position
- Returns number of exact matches

applyConstraints(words, history)

- Applies all previous guesses as constraints
- Returns only valid candidate words

---

## 5. Application Flow

Input words  
↓  
Validate input  
↓  
Store original words  
↓  
Display candidates  
↓  
User selects guess  
↓  
User enters match count  
↓  
Store constraint (history)  
↓  
Recalculate valid words  
↓  
Update UI  
↓  
Repeat  

---

## 6. Algorithm Details

### Match Counting

- Compare characters index-by-index
- Increment counter for matches

Time Complexity: O(m)

---

### Constraint Filtering

- For each word:
  - Check against all constraints
  - Keep only valid words

Time Complexity: O(n × m × k)

- n = number of words  
- m = word length  
- k = number of guesses  

---

## 7. UI / UX Considerations

### Mobile-First Design

- Vertical layout
- Large touch targets
- Scrollable word list

### Interaction Design

- Tap to select guess
- Numeric input for matches
- Immediate feedback

### Enhancements

- Display guess history
- Disable invalid inputs
- Optional animations

---

## 8. Edge Cases

- Words of different lengths
- Empty input
- Duplicate words
- Invalid match count
- No guess selected
- No remaining valid words

---

## 9. Testing Strategy

### Unit Testing

- countMatches
- applyConstraints

### Integration Testing

- Full workflow simulation
- Multi-constraint validation

---

## 10. Development Plan

### Phase 1

- Solver logic

### Phase 2

- UI structure

### Phase 3

- Interaction + state

### Phase 4

- Validation + UX polish

### Phase 5

- Best guess feature

---

## 11. End Goal

Deliver a polished, responsive web application that:

- Accurately solves the puzzle
- Provides intuitive UX
- Demonstrates strong frontend engineering practices
