/*
you can run this js file with one arguments witch will be the range
of the function fizzBuzz. Only the first argument will be taken into account and
if no argument provided the function will log an error message.
*/

(function fizzBuzz() {
  if (
    process.argv.slice(2).length &&
    !Number.isNaN(Number(process.argv.slice(2)[0]))
  ) {
    const range = Number(process.argv.slice(2)[0]);
    for (let i = 1; i <= range; i++) {
      if (i % 3 === 0 && i % 5 === 0) console.log("--FizzBuzz--");
      else if (i % 3 === 0) console.log("--Fizz--");
      else if (i % 5 === 0) console.log("--Buzz--");
      else console.log(`--${i}--`);
    }
  } else {
    console.log(
      "\x1b[31m",
      "\nNeed one argument type of number\nYou can for example run this file like so:"
    );
    console.log("\x1b[35m", "\n'node path/to/fizzbuzz.js 15'");
  }
})();
