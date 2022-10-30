const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful")
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });


  
// const isPangram = (string) => {
//   const splitedText = string.toLowerCase().split("");
//   console.log('joinedText :>> ', splitedText);
//   let alfabit = 'abcdefghiklmnopqrstuvwxyz'.split('');
//   for (const letter of splitedText) {
//     for (let index = 0; index < alfabit.length; index++) {
//       if (letter === alfabit[index]) {
//         alfabit[index] = '';
//       }
//     }
//   }
//   alfabit = alfabit.filter(val => val !== '');
//   return !alfabit.length ? true : false;
// }

// isPangram('hellow me dear frind');



// function numberOfMeets() {
//   const h = 3;
//   const window = 1.5;
//   const bounce = 0.66;
//   let currentPosition = 0;
//   let counter = 1;
//   currentPosition = h;
//   while (currentPosition > window) {
//     currentPosition = currentPosition * bounce;
//     console.log('currentPosition in m :>> ', currentPosition);
//     counter = counter + 2;
//   }
//   console.log('counter :>> ', counter);
//   return counter;
// }

// numberOfMeets();

// function XO(str) {
//     const stplitedStr = str.toLowerCase().split("");
//     let xNum = 0;
//     let oNum = 0;
//     for (const letter of stplitedStr){
//       if (letter === 'x') {
//         xNum++;
//       }
//       else if(letter === 'o'){
//         oNum++;
//       }
//     }
//   console.log('xNum :>> ', xNum);
//   console.log('oNum :>> ', oNum);
//   if (xNum === oNum) {
//       console.log('True :>> ');
//       return true;
//   }
//   console.log('Falce :>> ');
//     return false;
// }

// XO("xo")
