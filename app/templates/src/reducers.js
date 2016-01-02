/**
 * Reducers
 */

export function message(state = 'Hello', action) {
  switch (action.type) {
    case 'MESSAGE':
      return action.message;
    default:
      return state;
  }
}
