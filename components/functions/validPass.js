export const validPass = (enterPass, realPass) => {
  let valid = false;
  for (let i = 0; i < realPass.length; i++) {
    if (
      realPass[i].login === enterPass.login &&
      realPass[i].password === enterPass.password
    ) {
      return true;
    }
  }
  return valid;
};
