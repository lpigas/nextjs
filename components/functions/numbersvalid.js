export const numberValid = (numbers) => {
  let valid = true;
  for (let i = 0; i < numbers.length; i++) {
    if (
      !["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0"].includes(
        numbers[i]
      )
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
export const addPhone = (numbers) => {
  const newArr = [];
  for (let i = 0; i < numbers.length; i++) {
    if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0"].includes(
        numbers[i]
      )
    ) {
      newArr.push(numbers[i]);
    }
  }
  return newArr.join("");
};
