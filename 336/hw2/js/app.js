const delvOpts = [];
const orderValues = [];
const itemButtons = [];
const quantHTML = [];
const item0Price = 239.00;
const item1Price = 159.99;
const item2Price = 189.99;

let delvSelection = 10.25;
let item0Quant = 1;
let item1Quant = 1;
let item2Quant = 1;

const getIds = () => {
  delvOpts.push(document.getElementById("ups"));
  delvOpts.push(document.getElementById("fedex"));
  delvOpts.push(document.getElementById("usps"));
  delvOpts.push(document.getElementById("pickup"));

  orderValues.push(document.getElementById("order-summary"));
  orderValues.push(document.getElementById("order-shipping"));
  orderValues.push(document.getElementById("order-total"));

  itemButtons.push(document.getElementById("minus1"));
  itemButtons.push(document.getElementById("minus2"));
  itemButtons.push(document.getElementById("minus3"));

  itemButtons.push(document.getElementById("plus1"));
  itemButtons.push(document.getElementById("plus2"));
  itemButtons.push(document.getElementById("plus3"));

  quantHTML.push(document.getElementById("quant1"));
  quantHTML.push(document.getElementById("quant2"));
  quantHTML.push(document.getElementById("quant3"));
};

const updateSummary = () => {
  let orderSummary = ((item0Price * item0Quant) + (item1Price * item1Quant) + (item2Price * item2Quant));
  orderValues[0].innerHTML = `$${orderSummary.toFixed(2)}`;

  if (delvSelection == 0) {
    orderValues[1].innerHTML = "Free";
  } else {
    orderValues[1].innerHTML = `$${delvSelection.toFixed(2)}`;
  }

  orderValues[2].innerHTML = `$${(orderSummary + delvSelection).toFixed(2)}`;
};

getIds();
updateSummary();

itemButtons.forEach((id) => {
  id.addEventListener("click", () => {
    if (id.id.includes("minus")) {
      if (id.id.includes("1")) {
        if (item0Quant > 1) {
          item0Quant--;
          quantHTML[0].innerHTML = `Quantity: ${item0Quant}`;
        }
      } else if (id.id.includes("2")) {
        if (item1Quant > 1) {
          item1Quant--;
          quantHTML[1].innerHTML = `Quantity: ${item1Quant}`;
        }
      } else {
        if (item2Quant > 1) {
          item2Quant--;
          quantHTML[2].innerHTML = `Quantity: ${item2Quant}`;
        }
      }
    } else if (id.id.includes("plus")) {
      if (id.id.includes("1")){
        item0Quant++;
        quantHTML[0].innerHTML = `Quantity: ${item0Quant}`;
      } else if (id.id.includes("2")) {
        item1Quant++;
        quantHTML[1].innerHTML = `Quantity: ${item1Quant}`;
      } else {
        item2Quant++;
        quantHTML[2].innerHTML = `Quantity: ${item2Quant}`;
      }
    }

    updateSummary();
  });
});

delvOpts.forEach((id) => {
  id.addEventListener("click", () => {
    for (let i = 0; i < delvOpts.length; i++) {
      delvOpts[i].removeAttribute("class");
      delvOpts[i].removeAttribute("class");
      delvOpts[i].classList.add("delv-opts");
    }

    id.classList.add("delv-selector");
    if (id.id == "ups") {
      delvSelection = 10.25;
    } else if (id.id == "fedex") {
      delvSelection = 6.20;
    } else if (id.id == "usps") {
      delvSelection = 4.20;
    } else {
      delvSelection = 0;
    }

    updateSummary();
  });
});
