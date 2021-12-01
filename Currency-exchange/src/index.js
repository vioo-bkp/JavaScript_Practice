let firstInput = document.getElementById("first-input");
let secondInput = document.getElementById("second-input");
let firstCrr = document.getElementById("first-currency");
let secondCrr = document.getElementById("second-currency");

var currencyList = [];
var currentFrom;
var currentTo;

function getExchange(url) {
  return fetch(url).then((response) => response.json());
}

function renderTransferFromList(data) {
  firstCrr.innerHTML = "";
  currencyList = [];
  var entries = Object.entries(data.rates);
  for (let i = 0; i < entries.length; i++) {
    let option = document.createElement("option");
    option.innerText = `${entries[i][0]}`;
    option.value = `${entries[i][0]}`;
    firstCrr.appendChild(option);

    currentFrom = entries[0][1];
    currencyList.push(entries[i]);
  }
}

function renderTransferToList(data) {
  secondCrr.innerHTML = "";
  currencyList = [];
  var entries = Object.entries(data.rates);
  for (let i = 0; i < entries.length; i++) {
    let option2 = document.createElement("option");
    option2.innerText = `${entries[i][0]}`;
    option2.value = `${entries[i][0]}`;
    secondCrr.appendChild(option2);

    currentTo = entries[0][1];
    currencyList.push(entries[i]);
  }
}

function doLeftExchange() {
  var result = (parseFloat(firstInput.value) / currentFrom) * currentTo;
  secondInput.value = result.toFixed(2);
}

function doRightExchange() {
  var result = (parseFloat(secondInput.value) / currentTo) * currentFrom;
  firstInput.value = result.toFixed(2);
}

getExchange("https://api.exchangerate-api.com/v4/latest/EUR").then((r) => {
  renderTransferFromList(r);
  renderTransferToList(r);
  doLeftExchange();
});

firstInput.addEventListener("keyup", function (event) {
  if (firstInput.value !== "") {
    if (
      firstInput.value.startsWith("0") &&
      firstInput.value.length > 1 &&
      firstInput.value[1] !== "."
    ) {
      firstInput.value = `0.${firstInput.value.substring(1)}`;
      doLeftExchange();
    } else {
      doLeftExchange();
    }
  }
});

secondInput.addEventListener("keyup", function (event) {
  if (secondInput.value !== "") {
    if (
      secondInput.value.startsWith("0") &&
      secondInput.value.length > 1 &&
      secondInput.value[1] !== "."
    ) {
      secondInput.value = `0.${secondInput.value.substring(1)}`;
      doRightExchange();
    } else {
      doRightExchange();
    }
  }
});

firstCrr.addEventListener("click", function (event) {
  var list = currencyList.filter((crr) => crr[0] === event.target.value);
  currentFrom = list[0][1];
  doLeftExchange();
});

secondCrr.addEventListener("click", function (event) {
  var list = currencyList.filter((crr) => crr[0] === event.target.value);
  currentTo = list[0][1];
  doLeftExchange();
});
