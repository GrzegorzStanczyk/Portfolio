import * as CounterActions from '../actions/counter';

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
