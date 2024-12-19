let form = document.getElementById("form");
let emailInput = document.getElementById("email-input");
let passInput = document.getElementById("pass-input");
let emailError = document.getElementById("email-error");
let passError = document.getElementById("pass-error");
let signButton = document.getElementById("signButton");
let emptyArr = [];

let emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]+$/;
let usersData;
(function getAllUsers() {
  fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      usersData = users;
    });
})();
console.log(usersData);

function emailValidate() {
  console.log();

  if (emailInput.value == "" || !emailRegex.test(emailInput.value)) {
    emailError.style.display = "inline";
    return false;
  } else {
    emailError.style.display = "none";
    return true;
  }
}

function passValidate() {
  if (passInput.value == "" || passInput.value.length < 5) {
    passError.innerHTML = `please check your  password`;
    passError.style.display = "inline";
    return false;
  } else {
    passError.style.display = "none";
    return true;
  }
}
//"john@gmail.com"
//m38rmF$
function signIn() {
  if (emailValidate() && passValidate()) {
    console.log("done");
    if (validation(usersData)) {
      document.getElementById("email-input").value = "";
      document.getElementById("pass-input").value = "";
      console.log("leh msh rady yfdy el haga");
      location.replace("index.html");
      localStorage.setItem("cartProducts", `${emptyArr}`);
    } else {
      // alert("Please check your email and password and try again!");
    }
  } else {
    console.log("error");
  }
}
signButton.addEventListener("click", function (e) {
  e.preventDefault();
  signIn();
});

/**============================== */
function validation(usersData) {
  let username = document.getElementById("email-input").value;
  let password = document.getElementById("pass-input").value;
  var matchUser = usersData.find(
    (user) => user.email === username && user.password === password
  );

  if (matchUser) {
    var expirDate = new Date();
    expirDate.setDate(expirDate.getDate() + 30);

    document.cookie = `userName=${
      matchUser.username
    };expires=${expirDate.toUTCString()};path=/`;

    document.getElementById("pass-input").value = ``;
    passError.style.display = "none";
    console.log("Login Successful!");
    return true;
  } else {
    // document.getElementById(
    //   "pass-input"
    // ).value = `please check your email and password`;
    passError.innerHTML = `please check your email and password`;
    passError.style.display = "inline";
    console.log("Invalid ");

    return false;
  }
}
