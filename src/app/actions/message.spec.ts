import { Message } from './../shared/Interfaces/message';
import { SaveMessageAction, SAVEMESSAGE } from './message';

describe('SaveMessageAction', () => {
  it('should create an action', () => {
    const payload: Message = {
      title: 'title',
      email: 'email',
      message: 'message',
      honey: ''
    };
    const action = new SaveMessageAction(payload);

    expect({ ...action }).toEqual({
      type: SAVEMESSAGE,
      payload
    });
  });
});
