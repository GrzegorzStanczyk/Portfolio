import * as CounterActions from '../actions/counter';

export function counterReducer(state: number = null, action: CounterActions.Actions): number {
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
