import { GAME_STATUS, PLAYER_MARKS } from './gameStatus';

/**
 * @typedef {'X' | 'O' | null} Mark
 */

/**
 * @typedef {Object} CellModel
 * @property {number} index
 * @property {Mark} mark
 * @property {boolean} isWinningCell
 */

/**
 * @typedef {'idle' | 'playing' | 'won' | 'draw'} GameStatus
 */

/**
 * @typedef {Object} GameSessionState
 * @property {CellModel[]} board
 * @property {'X' | 'O'} currentPlayer
 * @property {GameStatus} status
 * @property {'X' | 'O' | null} winner
 * @property {number[] | null} winningLine
 * @property {string | null} message
 */

export const GAME_SESSION_CONTRACT = Object.freeze({
  statuses: Object.values(GAME_STATUS),
  players: Object.values(PLAYER_MARKS),
});
