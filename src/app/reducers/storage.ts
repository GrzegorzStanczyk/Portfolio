import { Message } from './../shared/Interfaces/message';
import * as CounterActions from '../actions/counter';
import * as MessageActions from '../actions/message';

export const initialState: number = null;

export function counterReducer(state: number = initialState, action: CounterActions.Actions): number {
  switch (action.type) {
    case CounterActions.INCREMENT:
      return state + 1;
    case CounterActions.DECREMENT:
      return state - 1;
    case CounterActions.SETCOUNTER:
      return action.payload;
    default: {
      return state;
    }
  }
}

export const initialMessage: Message = {
  title: '',
  email: '',
  message: '',
  honey: ''
};

export function messageReducer(state: Message = initialMessage, action: MessageActions.Actions): Message {
  switch (action.type) {
    case MessageActions.SAVEMESSAGE:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
}
