const price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");

// Currency unit values in cents
const currencyUnit = {
  "PENNY": 1,
  "NICKEL": 5,
  "DIME": 10,
  "QUARTER": 25,
  "ONE": 100,
  "FIVE": 500,
  "TEN": 1000,
  "TWENTY": 2000,
  "ONE HUNDRED": 10000
};

purchaseBtn.addEventListener("click", () => {
  let cash = parseFloat(cashInput.value);

  if (isNaN(cash)) {
    alert("Please enter a valid amount");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const result = getChange(cash, price, cid.map(arr => [...arr]));
  displayChange(result);
});

function getChange(cash, price, cid) {
  let changeDue = Math.round((cash - price) * 100);
  let totalCID = Math.round(cid.reduce((sum, [_, amount]) => sum + amount * 100, 0));

  if (changeDue > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (changeDue === totalCID) {
    return {
      status: "CLOSED",
      change: cid
    };
  }

  let changeArr = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    const [unit, amount] = cid[i];
    const unitValue = currencyUnit[unit];
    let available = Math.round(amount * 100);
    let used = 0;

    while (changeDue >= unitValue && available >= unitValue) {
      changeDue -= unitValue;
      available -= unitValue;
      used += unitValue;
    }

    if (used > 0) {
      changeArr.push([unit, used / 100]);
    }
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArr };
}

function displayChange({ status, change }) {
  if (status === "INSUFFICIENT_FUNDS") {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (status === "CLOSED") {
    let text = "Status: CLOSED";
    // Sort highest to lowest for test #19
    change.slice().reverse().forEach(([unit, amount]) => {
      if (amount > 0) {
        text += ` ${unit}: $${amount.toFixed(2)}`;
      }
    });
    changeDueElement.textContent = text;
    return;
  }

  if (status === "OPEN") {
    let text = "Status: OPEN";
    change.forEach(([unit, amount]) => {
      text += ` ${unit}: $${amount.toFixed(2)}`;
    });
    changeDueElement.textContent = text;
  }
}