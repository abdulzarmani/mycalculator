// $(".btn").click(function() {
//     let vale = $(this).text();
//     let screen = $(".calculator-screen");
//     screen.val(screen.val() === "0" ? vale : screen.val() + vale);

//     // $(".calculator-screen").val($(".calculator-screen").val() + value);
// });
// document.querySelectorAll(".btn").forEach(function(button) {
//   button.addEventListener("click", function() {
//     let value = this.textContent;
//     let screen = document.querySelector(".calculator-screen");
//     screen.value = screen.value === "0" ? value : screen.value + value;
//     });

//   });
let buttons = document.querySelectorAll(".btn");
let screen = document.querySelector(".calculator-screen");
let expression = "";
let flag = false;
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let value = this.textContent;
    if (screen.value === "Error") {
      if (value >= "0" && value <= "9") {
        // number after error → start fresh
        screen.value = value;
        expression = value;
      } else if (value === "C") {
        screen.value = "";
        expression = "";
      }
      // operator after error → do nothing
      return;
    }
    // else if (screen.value === "0") {
    //   if (value >= "0" && value <= "9") {
    //     // replace 0 with number
    //     screen.value = value;
    //     expression = value;
    //     return;
    //   }

    if (flag && value >= "0" && value <= "9") {
      screen.value = "";
      expression = "";
      flag = false;
    } else if (
      flag &&
      (value === "+" || value === "-" || value === "*" || value === "/")
    ) {
      flag = false;
      expression = screen.value;
    }

    if (value === "Del") {
      if (flag) return;

      // delete last character from input
      screen.value = screen.value.slice(0, -1);
      expression = expression.slice(0, -1);

      // if input is empty, reset to 0
      // if (screen.value === "") {
      //   screen.value = "0";
      //   expression = "";
      // }

      return;
    }

    if (value === "C") {
      screen.value = "";
      expression = "";
      flag = false;
    } else if (value === "=") {
      flag = true;

      //   console.log("Evaluating: " + expression + "and result is " + evaluateExpression(expression));
      if (expression === "") {
        screen.value = screen.value;
        return;
      } else {
        // let result = evaluateExpression(expression);
        let result = myEvaluateExpression(expression);
        screen.value = result;
        // if (result === "Error") {
        // //   screen.value =

        //     expression = "";

        // } else {
        expression = screen.value;
        // }
      }
    } else {
      if (screen.value === "0") {
        screen.value = value;
        expression = value;
      } else {
        screen.value += value;
        expression += value;
      }
      //   expression += value;
      console.log(expression);  
    }
  });
}

document.addEventListener("keydown", function (event) {
  let key = event.key;
  console.log("Key pressed: " + key);

  // let buttons = document.querySelectorAll(".btn");
  if ((key >= "0" && key <= "9") || key === "+" || key === "-" || key === "*" || key === "/" || key === "Enter" || key === "=" || key === "Backspace") {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent === key || (key === "Enter" && buttons[i].textContent === "=") || (key === "Backspace" && buttons[i].textContent === "Del")) {
        buttons[i].click();
        break;
      }
    }
  }
 

  // let button = Array.from(buttons).find((btn) => btn.textContent === key);
  // if (button) {
  //   button.click();
  
  // }



});


















// FUNCTTIONS 


// function evaluateExpression(expr) {
//   try {
//     let result = Function('"use strict";return (' + expr + ")")();
//     return result;
//   } catch (error) {
//     return "Error";
//   }
// }

function myEvaluateExpression(expr) {
  let numberBuilder = "";
  let array = [];
  for (let i = 0; i < expr.length; i++) {
    let char = expr[i];
    if (
      (char >= "0" && char <= "9") ||
      (char === "-" &&
        (i === 0 ||
          expr[i - 1] === "+" ||
          expr[i - 1] === "-" ||
          expr[i - 1] === "*" ||
          expr[i - 1] === "/"))
    ) {
      numberBuilder += char;
    } else {
      if (numberBuilder === "") {
        array.push(char);
      } else {
        array.push(numberBuilder);
        array.push(char);
        numberBuilder = "";
      }
    }
    if (i === expr.length - 1 && numberBuilder !== "") {
      array.push(numberBuilder);
    }
  }
  console.log(array);

  // TRYING TO CATCH ERRORS LIKE ++, --, */, etc.

  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    let right = array[i + 1];
    if (
      array[0] === "+" ||
      array[0] === "-" ||
      array[0] === "*" ||
      array[0] === "/" ||
      array[array.length - 1] === "+" ||
      array[array.length - 1] === "-" ||
      array[array.length - 1] === "*" ||
      array[array.length - 1] === "/"
    ) {
      return "Error";
    }
    if (
      (current === "+" ||
        current === "-" ||
        current === "*" ||
        current === "/") &&
      (right === "+" || right === "-" || right === "*" || right === "/")
    ) {
      //   let left = (array[i - 1]);
      //   let right = (array[i + 1]);
      // if (right === "" ) {
      return "Error";
      // }
    }
  }

  // END OF ERROR CATCHING

  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    if (current === "*" || current === "/") {
      let left = Number(array[i - 1]);
      let right = Number(array[i + 1]);
      //   if (left === "+" || left === "-" || left === "*" || left === "/" ||
      //       right === "+" || right === "-" || right === "*" || right === "/") {
      //     return "Error";
      //   }

      //   if (Number.isNaN(left) || Number.isNaN(right)) {
      //     return "Error";
      //   }

      if (current === "/" && right === 0) {
        //   let right = (array[i + 1]);
        return "Error";
      }

      let result = 0;
      if (current === "*") {
        result = left * right;
      } else if (current === "/") {
        result = left / right;
      }
      array.splice(i - 1, 3, result.toString());
      i = i - 1;
      console.log(array);
    }
  }
  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    if (current === "+" || current === "-") {
      let left = Number(array[i - 1]);
      let right = Number(array[i + 1]);

      //   if (Number.isNaN(left) || Number.isNaN(right)) {
      //     return "Error";
      //   }

      let result = 0;
      if (current === "+") {
        result = left + right;
      } else if (current === "-") {
        result = left - right;
      }
      array.splice(i - 1, 3, result.toString());
      i = i - 1;
      console.log(array);
    }
  }
  let result = Number(array[0]);
  return result;
}
