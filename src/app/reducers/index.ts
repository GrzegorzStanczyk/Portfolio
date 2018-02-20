import { Message } from './../shared/Interfaces/message';
import { ActionReducerMap } from '@ngrx/store';
import * as fromStorage from './storage';

export interface AppState {
  counter: number;
  message: Message;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: fromStorage.counterReducer,
  message: fromStorage.messageReducer
};

export const getCurrentCounter = (state: AppState) => state.counter;
export const getMessage = (state: AppState) => state.message;
