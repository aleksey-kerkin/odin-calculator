function addNumbers(...args) {
  if (args.length === 0) return 0;
  return args.reduce((acc, val) => acc + val, 0);
}

function subtractNumbers(...args) {
  if (args.length === 0) return 0;
  return args.reduce((acc, val) => acc - val, 0);
}

function multiplyNumbers(...args) {
  if (args.length === 0) return 0;
  if (args.includes(0)) return 0;
  return args.reduce((acc, val) => acc * val);
}

function divideNumbers(...args) {
  if (args.length === 0) return 0;
  if (args.includes(0)) return `err`;
  let result = args[0];
  // for (let i = 1; i < args.length; i++) {
  //   result /= args[i];
  // }
  // return result;
  return args.reduce((acc, val) => acc / val);
}

console.log(divideNumbers(10, 0));
