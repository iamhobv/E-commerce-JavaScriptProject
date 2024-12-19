// import {id_variable} from "./main.js";
// console.log(id_variable);
let imgProd = document.getElementById("imgProd");
let prodName = document.getElementById("prodName");
let spanprice1 = document.getElementById("spanprice1");
let paragraph_descriotion = document.getElementById("paragraph_descriotion");
let prodRating = document.getElementById("prodRating");
let prod = {};
var getcookis = document.cookie;
console.log(getcookis);
var userNameValue = getcookis.split("=")[1].split(";")[0];
// id_value = Number(id_value);
console.log(userNameValue);
let userNameValueSpan = document.getElementById("userNameValue");
userNameValueSpan.innerHTML = userNameValue;
// console.log(document.cookie);
var getcookis = document.cookie;
var id_value = getcookis.split("=")[2];
// id_value = Number(id_value);
console.log(id_value);

async function getIdvalue() {
  let response_id = await fetch(
    `https://fakestoreapi.com/products/${id_value}`
  );
  prod = await response_id.json();

  // console.log(prod);

  // console.log(prod.title);
  prodName.innerHTML = prod.title;
  spanprice1.innerHTML = `${prod.price}$`;
  imgProd.setAttribute("src", `${prod.image}`);
  paragraph_descriotion.innerHTML = prod.description;
  prodRating.innerHTML = `Rating : ${prod.rating.rate} out of 5 ⭐`;
}
getIdvalue();

let topBtn = document.querySelector(".top-btn");
topBtn.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});

let cartCounter = document.querySelector(".cartCounter");

let cartproducts = localStorage.getItem("cartProducts");
// console.log(JSON.parse(cartproducts).length);
cartCounter.innerHTML = JSON.parse(cartproducts).length;

let buyBtn = document.getElementById("button_add_to_card");
buyBtn.addEventListener("click", function (e) {
  addToCardBtn(e);
});
let cartProds = [];
// console.log(buyBtn);

function addToCardBtn(e) {
  let productId = e.target.getAttribute("data-id");
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

    // for (let i in finalResult) {
    //   if (finalResult[i].id == productId) {
    //     currentProduct = finalResult[i];
    //   }
    // }
    currentProduct = prod;
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

    let x = localStorage.getItem("cartProducts");
    // console.log(JSON.parse(x).length);
    cartCounter.innerHTML = JSON.parse(x).length;
  }
}
//   }
//     for (let i in finalResult) {
//       if (finalResult[i].id == productId) {
//         console.log(finalResult[i].id);

//         cartProds.push(finalResult[i]);
//         localStorage.setItem("cartProducts", JSON.stringify(cartProds));
//       }
//     }
//     x = localStorage.getItem("cartProducts");
//     console.log(JSON.parse(x).length);
//     cartCounter.innerHTML = JSON.parse(x).length;
//   } else {
//     cartProds = JSON.parse(localStorage.getItem("cartProducts"));

//     for (let i in finalResult) {
//       if (finalResult[i].id == productId) {
//         console.log(finalResult[i].id);

//         cartProds.push(finalResult[i]);
//         localStorage.setItem("cartProducts", JSON.stringify(cartProds));
//       }
//     }
//     x = localStorage.getItem("cartProducts");
//     console.log(JSON.parse(x).length);
//     cartCounter.innerHTML = JSON.parse(x).length;
//   }
// }
