# Initial Requirements

Use this document as the starting point for a new project before durable `docs/` files are created.

## Note

- This draft is inferred from the repository name `TicTacToe_game`, `PROJECT_CONTEXT.md`, and the current Expo baseline
- It should be treated as a working assumption until the product direction is explicitly confirmed

## Project Overview

- Project name: TicTacToe Game
- One-sentence summary: A simple offline mobile tic-tac-toe game for two players on one device
- Problem to solve: Provide a lightweight game that can be started immediately without signup, network access, or complex settings

## Users

- Primary users: Families, friends, and casual mobile users who want a quick local game
- Usage context: Short sessions during breaks, commuting, or waiting time
- Accessibility or age considerations: Clear turn indicators, large tap targets, and language simple enough for children and casual users

## Product Goals

- Goal 1: Let users start a game within a few seconds of launching the app
- Goal 2: Make turns, win states, and draw states immediately understandable
- Goal 3: Keep the app fully usable offline with minimal permissions

## In Scope

- Core feature 1: Start a local two-player game on a 3x3 board
- Core feature 2: Alternate turns between `X` and `O` with invalid-move protection
- Core feature 3: Detect win or draw outcomes and offer immediate replay

## Out of Scope

- Non-goal 1: Online multiplayer
- Non-goal 2: User accounts or profiles
- Non-goal 3: Ads, payments, and push notifications

## Screens

- Screen 1: Home screen with game start action
- Screen 2: Game screen with board, turn indicator, and result banner
- Screen 3: Future settings or score board screen

## Technical Constraints

- React Native
- Expo managed workflow
- JavaScript (not TypeScript)
- Node 22
- Expo SDK 54

## Development Rules

- Start command: `npx expo start`
- Remote device testing: `npx expo start --tunnel`
- Expo dependencies must be added with `npx expo install`
- Expo SDK must not be upgraded automatically
- Node version must not be changed automatically

## Device or Platform Features

- Sound: Optional future feedback only
- Haptics: Optional light feedback on moves and results in MVP, with graceful fallback on unsupported devices
- Camera: Not used
- Notifications: Not used
- Offline support: Required for all MVP gameplay

## Acceptance Criteria

- Criterion 1: A user can start a new game from the initial screen in one tap
- Criterion 2: Win and draw states are detected correctly across all core scenarios
- Criterion 3: After a game ends, users can restart without stale board state remaining

## Open Questions

- Question 1: Should the first release target children specifically or general casual players?
- Question 2: Should haptic feedback be on by default or configurable later?
- Question 3: Should score tracking be included in the first release or deferred?
