let prodInCart = JSON.parse(localStorage.getItem("cartProducts"));
console.log(prodInCart);
let counter = {};
let container = document.getElementById("container");
var getcookis = document.cookie;
console.log(getcookis);
var userNameValue = getcookis.split("=")[1].split(";")[0];
// id_value = Number(id_value);
console.log(userNameValue);
let userNameValueSpan = document.getElementById("userNameValue");
userNameValueSpan.innerHTML = userNameValue;

function checkElements() {
  if (prodInCart == "") {
    container.innerHTML = `<div class="noData"><h2>Please add items</h2></div>`;
  } else {
    showcard();
  }
}
checkElements();

function showcard() {
  let container_card = ``;
  for (let i = 0; i < prodInCart.length; i++) {
    container_card += ` <div class="item" >
            <img
              class="item-img"
              src=${prodInCart[i].image}
              alt=""
            />
            <h5 class="item-name">
             ${prodInCart[i].title}
            </h5>
            <button class="item-plus" onclick="decrease(${i})"><i class="fa-solid fa-minus" ></i></button>
            <p class="item-count">${prodInCart[i].counter}</p>
            <button class="item-minus" onclick="increase(${i})"><i class="fa-solid fa-plus"></i></button>
            <h4 class="item-price">$${Math.floor(prodInCart[i].price)}</h4>
            <button class="item-delete" onclick="deleteProduct(${i})">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>`;
  }

  container.innerHTML = container_card;
}

// let index = 1;

// function increase(product_id) {
//   index++;
//   item_counter.innerHTML = index;
//   for (let count = 0; count < prodInCart.length; count++) {
//     if (prodInCart[count].id == product_id) {
//       var add = prodInCart[count].price * index;
//     }
//   }

//   totalOfPrice.innerHTML = `${add}`;
// }

/************************* */

/**------------------ */
let topBtn = document.querySelector(".top-btn");
topBtn.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});

function getItemCounter() {
  let cartCounter = document.querySelector(".cartCounter");
  let cartproducts = localStorage.getItem("cartProducts");
  cartCounter.innerHTML = JSON.parse(cartproducts).length;
}

getItemCounter();
/**delete prod */
//delete product

function deleteProduct(index) {
  //delete item by index then save new array to local storage then display data after update
  prodInCart.splice(index, 1);
  localStorage.setItem("cartProducts", JSON.stringify(prodInCart));
  totalPrice();
  checkElements();
  // showcard();
  getItemCounter();
}

/**=======plus and minus */
let plus = document.querySelector(".item-minus");
let item_counter = document.querySelector(".item-count");
let minus = document.querySelector(".item-plus");
let totalOfPrice = document.getElementById("total_price");

function decrease(index) {
  prodInCart[index].counter--;
  console.log(prodInCart[index].counter);
  if (prodInCart[index].counter < 0) {
    deleteProduct(index);
  }

  checkElements();
  getItemCounter();
  localStorage.setItem("cartProducts", JSON.stringify(prodInCart));

  console.log(prodInCart);
  totalPrice();
}

function increase(index) {
  prodInCart[index].counter++;
  console.log(prodInCart[index].counter);

  checkElements();
  getItemCounter();
  localStorage.setItem("cartProducts", JSON.stringify(prodInCart));

  console.log(prodInCart);
  totalPrice();
}

let subTotal = document.getElementById("subTotal");
let total_price = document.getElementById("total_price");
let shipping = document.getElementById("shipping");
let sum = 0;
function totalPrice() {
  sum = 0;
  for (let i = 0; i < prodInCart.length; i++) {
    let multiplayPrice = prodInCart[i].price * prodInCart[i].counter;
    sum += multiplayPrice;
  }
  console.log(sum);
  if (prodInCart.length == 0) {
    total_price.innerHTML = `$0`;
    subTotal.innerHTML = `$0`;
    shipping.innerHTML = `$0`;
  } else {
    total_price.innerHTML = `$${Math.floor(sum + 80)}`;
    subTotal.innerHTML = `$${Math.floor(sum)}`;
    shipping.innerHTML = `$80`;
  }
}
totalPrice();
/**============checkout======================== */
checkout_btn = document.querySelector(".checkout");
checkout_btn.addEventListener("click", function () {
  if (prodInCart.length == 0) {
    alert("please add some product");
  } else {
    // confirm(`yor total price is $${Math.floor(sum + 80)}`);
    console.log(prodInCart);
    localStorage.setItem("cartProducts", JSON.stringify([]));
    location.href = "./orderShipped.html";
    console.log("wslt?");
  }
});

let logout = document.querySelector('a[href="#account"]');
console.log(logout);
logout.addEventListener("click", function () {
  document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.replace("./user(1).html");
});
