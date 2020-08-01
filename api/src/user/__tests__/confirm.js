
import { main as confirm } from '../confirm';

describe('confirm user', () => {
  const event = {
    response: {
      autoConfirmUser: false,
    },
  };

  const context = {};

  it('should confirm the user', async () => {
    await confirm(
      event,
      context,
      (error, result) => {
        expect(error).toBeFalsy();
        expect(result.response.autoConfirmUser).toBeTruthy();
      },
    );
  });
});
