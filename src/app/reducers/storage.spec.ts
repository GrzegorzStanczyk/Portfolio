import { Message } from '@app/shared';
import { SaveMessageAction } from './../actions/message';
import * as fromCounterActions from '../actions/counter';
import * as fromMessageActions from '../actions/message';
import * as fromStorage from './storage';

describe('CounterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromStorage;
      const action = new fromCounterActions.SetCounterAction(null);
      const state = fromStorage.counterReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SETCOUNTER action', () => {
    it('should return passed value', () => {
      const { initialState } = fromStorage;
      const action = new fromCounterActions.SetCounterAction(10);
      const state = fromStorage.counterReducer(initialState, action);

      expect(state).toEqual(10);
    });
  });
});

describe('MessageReducer', () => {
  describe('undefined action', () => {
    it('should return default state', () => {
      const { initialMessage } = fromStorage;
      const action = new fromMessageActions.SaveMessageAction(null);
      const state = fromStorage.messageReducer(undefined, action);

      expect(state).toEqual(initialMessage);
    });
  });

  describe('SAVEMESSAGE action', () => {
    it('should return passed value', () => {
      const { initialMessage } = fromStorage;
      const message: Message = {
        title: 'title',
        email: 'email',
        message: 'message',
        honey: ''
      };
      const action = new fromMessageActions.SaveMessageAction(message);
      const state = fromStorage.messageReducer(initialMessage, action);

      expect(state).toEqual(action.payload);
    });
  });
});
