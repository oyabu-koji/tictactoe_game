import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, within } from '@testing-library/react-native';

import { AppNavigator } from '../../../app/navigation/AppNavigator';
import { GameScreen } from '../screens/GameScreen';
import { renderWithProviders } from '../../../shared/test-support/renderWithProviders';

function pressCells(indices) {
  indices.forEach((index) => {
    fireEvent.press(screen.getByTestId(`cell-${index}`));
  });
}

describe('core gameplay flow', () => {
  it('starts a game from the home screen', () => {
    renderWithProviders(<AppNavigator />);

    fireEvent.press(screen.getByTestId('start-game-button'));

    expect(screen.getByTestId('game-board')).toBeTruthy();
    expect(screen.getByText('Turn: X')).toBeTruthy();
  });

  it('shows the winning result and blocks further input', () => {
    renderWithProviders(<GameScreen onExit={jest.fn()} />);

    pressCells([0, 3, 1, 4, 2]);

    expect(screen.getByText('Winner: X')).toBeTruthy();
    expect(screen.getByTestId('play-again-button')).toBeTruthy();

    const oMarksBefore = screen.queryAllByText('O').length;
    fireEvent.press(screen.getByTestId('cell-5'));
    expect(screen.queryAllByText('O')).toHaveLength(oMarksBefore);
  });

  it('resets the board after replaying from a winning state', () => {
    renderWithProviders(<GameScreen onExit={jest.fn()} />);

    pressCells([0, 3, 1, 4, 2]);

    expect(screen.getByText('Winner: X')).toBeTruthy();

    fireEvent.press(screen.getByTestId('play-again-button'));

    expect(screen.queryByText('Winner: X')).toBeNull();
    expect(screen.getByText('Turn: X')).toBeTruthy();
    expect(screen.queryByTestId('play-again-button')).toBeNull();
    expect(
      within(screen.getByTestId('cell-0')).queryByText('X')
    ).toBeNull();
    expect(
      within(screen.getByTestId('cell-4')).queryByText('O')
    ).toBeNull();
  });

  it('shows a draw and resets the board on replay', () => {
    renderWithProviders(<GameScreen onExit={jest.fn()} />);

    pressCells([0, 1, 2, 4, 3, 5, 7, 6, 8]);

    expect(screen.getByText('Draw game')).toBeTruthy();

    fireEvent.press(screen.getByTestId('play-again-button'));

    expect(screen.getByText('Turn: X')).toBeTruthy();
    expect(
      within(screen.getByTestId('cell-0')).queryByText('X')
    ).toBeNull();
    expect(
      within(screen.getByTestId('cell-4')).queryByText('O')
    ).toBeNull();
  });
});
