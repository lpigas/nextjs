export const localstor = (token, newData) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.setItem(token, JSON.stringify(newData));
  }
};
