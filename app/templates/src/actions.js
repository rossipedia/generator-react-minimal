const MESSAGE = 'MESSAGE';

export function setMessage(message) {
  return {
    type: MESSAGE,
    message
  };
}
