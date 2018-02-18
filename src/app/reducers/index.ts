import * as fromStorage from './storage';

export interface State {
  counter: number;
}

export const reducers = {
  counter: fromStorage.counterReducer
};

export const getCurrentCounter = (state: State) => state.counter;
