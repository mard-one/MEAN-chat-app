export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export class MessageActions {
  static addMessage(message: string) {
    return {
      type: 'ADD_MESSAGE',
      payload: {message: message}
    };
  }
  static deleteMessage(message: string) {
    return {
      type: 'DELETE_MESSAGE',
      payload: {message: message}
    };
  }
}
