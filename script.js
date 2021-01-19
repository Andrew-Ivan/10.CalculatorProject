let $result_previous = document.querySelector(".previous");
let $result_present = document.querySelector(".present");

let $buttons = document.querySelectorAll("span");
let result = [];
let previous = [];
let present = "";
let math_it_up = {
  "+": function (x = 0, y = 0) {
    return x + y;
  },
  "-": function (x = 0, y = 0) {
    return x - y;
  },
  "/": function (x = 0, y = 0) {
    return x / y;
  },
  "*": function (x = 0, y = 0) {
    return x * y;
  },
};

$buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerHTML) {
      case "=":
        clickHandler(e.target.innerHTML);
        calculateHandler();
        break;
      case "C":
        clearWindow();
        break;
      default:
        clickHandler(e.target.innerHTML);
        break;
    }
  });
});

function calculateHandler() {
  for (let i in result) {
    if (math_it_up.hasOwnProperty(result[i])) {
      result = [
        math_it_up[result[i]](
          parseFloat(result[Number(i) - 1])
            ? parseFloat(result[Number(i) - 1])
            : 0,
          parseFloat(result[Number(i) + 1])
            ? parseFloat(result[Number(i) + 1])
            : 0
        ),
      ];
    }
  }
  console.log("1: ", result);
  previous = result;
  clearWindow();
  $result_present.innerHTML = previous;
  result = previous;
  console.log("2: ", result);
}

function clickHandler(btn) {
  if (btn == "=") {
    result.push(present);
    present = "";
  } else {
    if (math_it_up.hasOwnProperty(btn) && !result.includes(btn)) {
      present ? result.push(present, btn) : result.push(btn);
      present = "";
      $result_previous.innerHTML = result.join(" ");
    } else {
      if (Number(btn) !== NaN) {
        present += btn;
      }
    }
    $result_present.innerHTML = present;
  }
}

function clearWindow() {
  $result_previous.innerHTML = "";
  $result_present.innerHTML = "";
  result = [];
  present = "";
}
