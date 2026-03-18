# Version Notes

This document outlines the version history, current features, and planned enhancements for the Damage Dice Roller module.

## Version 1.0.0 (Current Release)

### Features

- **Dice Selection Interface**: Interactive buttons for incrementing counts of standard dice types (d4, d6, d8, d10, d12, d20).
- **Static Damage Addition**: Input field for adding flat damage modifiers to rolls.
- **Damage Type Selection**: Dropdown menu with all standard D&D 5e damage types (Acid, Bludgeoning, Cold, Fire, Force, Lightning, Necrotic, Piercing, Poison, Psychic, Radiant, Slashing, Thunder).
- **Formula Building**: Ability to construct and accumulate multiple damage formulas before rolling.
- **Dice Rolling**: Executes all built formulas, sending individual rolls to Foundry chat with flavor text and damage type.
- **Visual Feedback**: Displays roll results in the module window with damage type icons for quick identification.
- **Chat Integration**: Rolls are posted to the chat with appropriate speaker and roll mode settings.
- **Window Controls**: Minimize/restore functionality to save screen space, and close button.
- **Reset Functionality**: Clears all inputs and formulas with a single button press.
- **Automatic Rendering**: Module window appears on world load when enabled.

### Bug Fixes

- None reported.

### Known Issues

- None identified.

## Planned Enhancements

### High Priority

- **Custom Dice Support**: Allow users to input custom dice formulas (e.g., 3d100, 2d3).
- **Preset Formulas**: Save and load frequently used damage combinations.
- **Critical Hit Handling**: Option to double dice on critical hits or apply multipliers.

### Medium Priority

- **Keyboard Shortcuts**: Hotkeys for common actions (e.g., roll, reset, add dice).
- **Settings Menu**: Configurable options like default damage type, window position, and icon display.
- **Undo/Redo**: Ability to remove the last added formula or undo actions.
- **Roll History**: Keep a log of previous rolls within the session.

### Low Priority

- **Localization**: Support for multiple languages.
- **Integration with Character Sheets**: Pull damage from equipped weapons or spells.
- **Advantage/Disadvantage**: Options for rolling with advantage or disadvantage on damage.
- **Export/Import**: Share formulas between users or save/load from files.
- **Theming**: Customizable UI themes and icon sets.
- **Macro Support**: Generate macros for complex damage routines.

### Future Considerations

- **Multi-System Compatibility**: Adapt for systems beyond D&D (e.g., Pathfinder, custom systems).
- **Advanced Dice Mechanics**: Support for exploding dice, rerolls, or custom modifiers.
- **Performance Optimizations**: For large numbers of rolls or complex formulas.
- **Accessibility Improvements**: Better screen reader support and keyboard navigation.

If you have suggestions or encounter issues, please report them to the author.