export const INPUT_EMAIL = 'INPUT_EMAIL';

export const saveEmail = (payload) => (
  {
    type: INPUT_EMAIL,
    payload,
  }
);
