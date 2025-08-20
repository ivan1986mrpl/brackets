module.exports = function check(str, bracketsConfig) {
  const stack = [];

  const openToClose = new Map();
  const openBrackets = new Set();
  const sameBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    openToClose.set(open, close);
    openBrackets.add(open);
    if (open === close) {
      sameBrackets.add(open);
    }
  });

  let isValid = true;

  str.split('').some((char) => {
    if (!isValid) return true;

    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openBrackets.has(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        isValid = false;
        return true;
      }
      const lastOpen = stack[stack.length - 1];
      if (openToClose.get(lastOpen) === char) {
        stack.pop();
      } else {
        isValid = false;
        return true;
      }
    }
    return false;
  });

  return isValid && stack.length === 0;
};
