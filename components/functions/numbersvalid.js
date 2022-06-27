export const numberValid = (numbers) => {
  let valid = true;
  for (let i = 0; i < numbers.length; i++) {
    if (
      !["1", "2", "3", "4", "5", "6", "7", "8", "9", "+"].includes(numbers[i])
    ) {
      return "false";
    }
  }
  return valid;
};

export const mailValid = (mail) => {
  let valid = mail.includes(["."]) && mail.includes(["@"]);
  return valid;
};
