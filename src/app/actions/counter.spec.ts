import { SetCounterAction, SETCOUNTER } from './counter';

describe('SetCounterAction', () => {
  it('should create an action', () => {
    const payload: number = 12;
    const action = new SetCounterAction(payload);

    // expect(action.type).toEqual(SETCOUNTER);
    expect({ ...action }).toEqual({
      type: SETCOUNTER,
      payload,
    });
  });
});
