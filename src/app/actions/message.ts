import { Message } from '@app/shared';
import { Action } from '@ngrx/store';

export const SAVEMESSAGE = '[Message] Save';

export class SaveMessageAction implements Action {
  readonly type = SAVEMESSAGE;

  constructor(public payload: Message) {}
}

export type Actions = SaveMessageAction;
