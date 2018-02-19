import * as fromActions from '../actions/counter';
import * as fromCounter from './storage';

describe('CounterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
        const { initialState } = fromCounter;
        const action = new fromActions.SetCounterAction(null);
        const state = fromCounter.counterReducer(undefined, action);

        expect(state).toBe(initialState);
    });
  });

  describe('SETCOUNTER action', () => {
    it('should return passed value', () => {
      const { initialState } = fromCounter;
      const action = new fromActions.SetCounterAction(10);
      const state = fromCounter.counterReducer(initialState, action);

      expect(state).toEqual(10);
    });
  });
});
