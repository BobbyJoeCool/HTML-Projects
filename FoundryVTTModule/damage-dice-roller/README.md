# Damage Dice Roller

A Foundry VTT module that provides a simple and intuitive interface for rolling damage dice in tabletop RPG games like Dungeons & Dragons.

## Description

This module was developed as a portfolio project to demonstrate skills in JavaScript, HTML, CSS, and Foundry VTT module development. It allows Game Masters and players to quickly build and roll damage formulas with various dice types, static damage modifiers, and damage types, complete with visual icons for easy identification.

## Features

- **Dice Selection**: Buttons for common dice types (d4, d6, d8, d10, d12, d20)
- **Damage Types**: Support for all standard D&D damage types with corresponding icons
- **Static Damage**: Add flat damage modifiers to your rolls
- **Formula Building**: Construct complex damage formulas before rolling
- **Chat Integration**: Rolls are sent to the Foundry chat with appropriate flavor text
- **Visual Feedback**: Damage results displayed with type-specific icons
- **Minimize/Restore**: Window can be minimized to save screen space

## Installation

1. Download the module files or clone the repository.
2. Place the `damage-dice-roller` folder in your Foundry VTT `Data/modules` directory.
3. Launch Foundry VTT and enable the module in the Module Management menu.
4. The Damage Dice Roller window will appear automatically when you start a world with the module enabled.

## Usage

1. **Adding Dice**: Click the dice buttons (d4, d6, etc.) to increment the count for each die type.
2. **Static Damage**: Enter a number in the "Static Damage" field to add flat damage.
3. **Damage Type**: Select the appropriate damage type from the dropdown menu.
4. **Add to Formula**: Click "Add Damage" to append the current configuration to the formula list.
5. **Roll**: Click "Roll" to execute all formulas in the list. Results will appear in the chat and in the module window with icons.
6. **Reset**: Use the "Reset" button to clear all inputs and start over.

## Compatibility

- **Foundry VTT**: Version 13 (verified)
- **Systems**: Compatible with any system that supports standard dice notation

## Author

Robert Breutzmann

## Version

1.0.0
