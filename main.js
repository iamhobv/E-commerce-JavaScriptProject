// export let id_variable =0;

let productsCon = document.getElementById("prodContainer");
let cartCounter = document.querySelector(".cartCounter");
let finalResult = [];
var getcookis = document.cookie || "not founded";
console.log(getcookis);
var userNameValue = getcookis.split("=")[1].split(";")[0];
// id_value = Number(id_value);
console.log(userNameValue);
let userNameValueSpan = document.getElementById("userNameValue");
userNameValueSpan.innerHTML = userNameValue;

if (localStorage.getItem("cartProducts") == "") {
  localStorage.setItem("cartProducts", JSON.stringify([]));
}
// console.log(localStorage.getItem("cartProducts"));

let cartProdNum = 0;
let x = localStorage.getItem("cartProducts");
console.log(JSON.parse(x));
if (JSON.parse(x) != null) {
  cartCounter.innerHTML = JSON.parse(x).length;
} else {
  cartCounter.innerHTML = `0`;
}

async function getAllData(url = "https://fakestoreapi.com/products") {
  let response = await fetch(url);
  finalResult = await response.json();

  showProducts();
}

getAllData();

function showProducts() {
  let container = ``;
  for (let i = 0; i < finalResult.length; i++) {
    container += `<div  class="prod-card" data-id=${finalResult[i].id}>
          <img onclick="asd(this);"
            class="prod-img"
            data-id=${finalResult[i].id}
            src=${finalResult[i].image}
            alt=""
          />
          <h5 class="prod-name-card">
           ${finalResult[i].title}
          </h5>
          <h3>${finalResult[i].price}$</h3>
          <button data-id=${finalResult[i].id} class="buy-btn" onclick="addToCardBtn(this)">Buy Now</button>
        </div>`;
  }

  productsCon.innerHTML = container;
}
function asd(e) {
  id_variable = e.getAttribute("data-id");
  document.cookie = `id=${id_variable}`;
  location.href = "product.html";
}

async function cardfetchfun(i) {
  let cardfetch = await fetch(`https://fakestoreapi.com/products/${i + 1}`);
  let cardfetch_json = await cardfetch.json();
  console.log(cardfetch_json);
}

/////////////////////////////////////////////
let img = document.getElementsByTagName("img");
var i = 0;

setInterval(function () {
  img[i].style.display = "none";
  ++i;
  if (i > 3) {
    i = 0;
  }
  img[i].style.display = "block";
}, 3000);

var buttunBefore = document.querySelector(".buttunBefore");
var buttunAfter = document.querySelector(".buttunAfter");

function goToNextImage() {
  img[i].style.display = "none";
  ++i;
  if (i > 3) {
    i = 0;
  }
  img[i].style.display = "block";
}
function goToPreviousImage() {
  img[i].style.display = "none";
  --i;
  if (i < 0) {
    i = 3;
  }
  img[i].style.display = "block";
}

buttunAfter.addEventListener("click", goToNextImage);
buttunBefore.addEventListener("click", goToPreviousImage);

/****************** catorgy */

var catorgy = document.getElementsByClassName("catBtn");
let link_array = [
  "https://fakestoreapi.com/products",
  "https://fakestoreapi.com/products/category/men's clothing",
  "https://fakestoreapi.com/products/category/women's clothing",
  "https://fakestoreapi.com/products/category/jewelery",
  "https://fakestoreapi.com/products/category/electronics",
];

for (let i = 0; i < catorgy.length; i++) {
  catorgy[i].addEventListener("click", function () {
    getAllData(link_array[i]);
  });
}

/***************************************************************** */

let buyBtn = document.getElementsByClassName("buy-btn");
let cartProds = [];
// console.log(buyBtn);

function addToCardBtn(e) {
  let productId = e.getAttribute("data-id");
  // console.log(productId);

  if (localStorage.getItem("cartProducts") == undefined) {
    for (let i in finalResult) {
      if (finalResult[i].id == productId) {
        console.log(finalResult[i].id);

        cartProds.push(finalResult[i]);
        localStorage.setItem("cartProducts", JSON.stringify(cartProds));
      }
    }
    x = localStorage.getItem("cartProducts");
    console.log(JSON.parse(x).length);
    cartCounter.innerHTML = JSON.parse(x).length;
  } else {
    cartProds = JSON.parse(localStorage.getItem("cartProducts")) ?? [];

    let currentProduct;

    for (let i in finalResult) {
      if (finalResult[i].id == productId) {
        currentProduct = finalResult[i];
      }
    }

    //console.log(currentProduct);

    if (cartProds.find((pro) => pro.id == currentProduct.id) == undefined) {
      currentProduct.counter = 1;
      cartProds.push(currentProduct);
    } else {
      let index;
      for (let i = 0; i < cartProds.length; i++) {
        if (cartProds[i].id == currentProduct.id) {
          index = i;
        }
      }
      console.log(index);
      cartProds[index].counter++;

      console.log("a");
    }

    localStorage.setItem("cartProducts", JSON.stringify(cartProds));
    console.log(cartProds);

    // if (finalResult[i].id == productId) {

    //   let item = cartProds.find((product) => product == cartProds[i]);
    //   console.log("ITEM: " + item);

    //   if(item == undefined){
    //     finalResult[i].counter = 1;
    //     cartProds.push(finalResult[i]);
    //     console.log("Added");
    //   }
    //   else{
    //     console.log("Exsist");
    //     console.log(finalResult[i]);
    //     let cartPos = cartProds.indexOf(finalResult[i]);
    //     console.log(cartPos);
    //   }
    //   localStorage.setItem("cartProducts", JSON.stringify(cartProds));
    // }

    x = localStorage.getItem("cartProducts");
    // console.log(JSON.parse(x).length);
    cartCounter.innerHTML = JSON.parse(x).length;
  }
}
////////////////////////************* product card ***************888 */
let topBtn = document.querySelector(".top-btn");
topBtn.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});
// <div class="prod-card">
//           <img
//             class="prod-img"
//             src="991501fab467b7b89b3d15a3022907d7.png"
//             alt=""
//           />
//           <h5 class="prod-name-card">
//             Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)
//           </h5>
//           <h3>$900</h3>
//           <button class="buy-btn">Buy Now</button>
//         </div>
/**=======log out =======*/

let logout = document.querySelector('a[href="#account"]');
console.log(logout);
logout.addEventListener("click", function () {
  document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.replace("./user(1).html");
});
