import { Action } from '@ngrx/store';

export const INCREMENT = '[Counter] Icrement';
export const DECREMENT = '[Counter] Decrement';
export const SETCOUNTER = '[Counter] SETCOUNTER';

export class IcrementCounterAction implements Action {
  readonly type = INCREMENT;
}

export class DecrementCounterAction implements Action {
  readonly type = DECREMENT;
}

export class SetCounterAction implements Action {
  readonly type = SETCOUNTER;

  constructor(public payload: number) {}
}

export type Actions
  = IcrementCounterAction
  | DecrementCounterAction
  | SetCounterAction;
