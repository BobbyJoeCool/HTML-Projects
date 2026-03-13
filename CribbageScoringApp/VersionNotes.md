# Version Notes

## Version 1.0

**Initial Release – Core Functionality**

- JavaScript Deck object initializes the card deck.
- User selects a hand and a cut card.
- Score button calculates and displays the total hand score.
- Reset button restores the app to its initial state.

## Version 1.1

**Documentation and UI Improvements**

- Added JSDoc comments throughout the codebase.
- Added user instructions.
- Added application header: “Cribbage Scoring App.”

## Version 2.0

**Scoring Breakdown and UI Redesign**

- Expanded JSDocs with object and array descriptions.
- Implemented scoring breakdown by category.
- Introduced a Scoring object that stores a score label and its point value.
- Score sections display only when applicable (e.g., Fifteens appear only if present).
- Reorganized layout:
    - Moved instructions to a side panel and added scoring instructions.
    - Reduced card display size to fit scoring information above the deck.
- Updated visual design:
    - Background changed to a card-table style theme.
    - Adjusted font colors for readability.
- Added section headers for Hand and Cut Card.

## Future Enhancements

- Add crib scoring option
- Add mobile layout improvements
- Add animated card dealing
- Add random hand dealing.
- Add "game mode" where a hand is dealt (6 cards), and two cards are put in the crib, then score.
    - Add additional functionality where the crib is then scored with 2 more random cards added.