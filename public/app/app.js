const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const productButton = document.querySelector(".product-button");
const amount = document.querySelector(".amount");
// const cartSentence = document.querySelector(".cartSentence");
const circleCount = document.querySelector(".circleCount");
let deleteNotification = document.getElementsByClassName("deleteNotification");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

cartAmount = 0;
circleCount.style.display = "none";

//holds what was selected in an array
let itemsInCart = [];

//if buy now button is clicked
function productButtonClicked() {
  //if user is not logged in alert them
  if (loggedIn == false) {
    alert("need to be logged in to buy something");
  }
  //if user is logged in add item to the cart and alert them
  else if (loggedIn == true) {
    alert("item added to cart");
    //cart # goes up and displays on the screen
    cartAmount = cartAmount + 1;
    console.log(cartAmount);
    amount.innerHTML = cartAmount;
    // cartSentence.innerHTML = "You have " + cartAmount + "items in your cart";
    circleCount.style.display = "flex";

    //NEED SOMETHING HERE TO BRING ITEM ONTO CHECKOUT pAGE
    //Get the button data attribute or id and save it in an array
    //itemsInCart.push(THE ID NUMBER)
  }
}
function deleteAllItems() {
  console.log("deleting all items");
  alert("deleting all items");
  // deleteNotification.style.display = "flex";
  //resets the cartAmount
  cartAmount = 0;
  circleCount.style.display = "none";
  //SHOULD HAVE SOMETHING HERE THAT DELETES ALL ITEMS CHOOSEN
  //MAYBE itemsInCart = [] that empties out the array
}
function closeDeleteNotification() {
  // deleteNotification.style.display = "none";
}

let loggedIn = false;
var fullName = "";
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    //if user is there
    if (user) {
      loggedIn = true;
      if (user.displayName == null) {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: fullName, //get full name and update site
          })
          .then(() => {});
      } else {
        fullName = user.displayName;
      }
      //replace login button with signout button
      $(".profile").css("display", "none");
      $(".signout").css("display", "flex");
    }

    //if user is not there do these display
    else {
      loggedIn = false;
      fullName = "";
      $(".profile").css("display", "flex");
      $(".signout").css("display", "none");
    }
  });
}

//this function create a new user
function createUser() {
  console.log("signin was clicked");
  let password = $("#cpassword").val();
  let email = $("#cemail").val();
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  console.log(password + " and " + email);
  console.log(password);
  console.log(email);
  console.log(fName);
  console.log(lName);
  fullName = fName + " " + lName;
  console.log(fullName);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log(userCredential.user);
      // alert("you have created an account " + displayName);

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorMessage);
      alert("error");
      // ..
    });
}

//this function happens when login button is clicked
function login() {
  //gets users password and email input
  let password = $("#password").val();
  let email = $("#email").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log("signed in");
      alert("you have logged in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
}

//this function happens when the logout button is clicked
function signOut() {
  // console.log("signout button has been clicked");
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      // console.log("signed out");
      alert("you are signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

//load coffee makers
loadProducts();

//loads products
function loadProducts() {
  console.log("HELLO LOAD NOW");
  $(".product-section").empty();

  let productholder = document.getElementsByClassName("product-holder");
  $.getJSON("data/data.json", function (products) {
    //loop though all the recipes
    console.log(products);
    $.each(products, function (index, product) {
      console.log("Name: " + product.productName);
      console.log("Image: " + product.productImage);
      console.log("Cost: " + product.productCost);
      console.log("ID: " + product.id);

      productholder.innerHTML = "Hello " + product.productName;

      //FOR THE HOME PAGE
      $(".product-section").append(`
      <div class="product-holder">
            <div class="ribbon-holder"></div>
            <div class="product-image">
                <img class="img" src="images/${product.productImage}" alt="">
            </div>
            <div class="product-name">
                <h1>${product.productName}</h1>
            </div>
            <div class="product-price">
                <h2><span class="small">$</span>${product.productCost}/h2>
            </div>
            <div class="freeshipping-holder">
                <img src="images/truck.svg" alt="">
                <h4>FREE SHIPPING</h4>
            </div>
            <div class="product-button" onclick="productButtonClicked()" data-number = "${product.id}">
                <h3>BUY NOW</h3>
            </div>
        </div>
      `);
    });
  }).fail(function (jqxhr, textStatus, error) {
    console.log(
      "jqxhr: " + jqxhr + " text: " + textStatus + " error: " + error
    );
  });
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    MODEL.getMyContent("home");
  } else if (pageID == "") {
    MODEL.getMyContent(pageID);
  } else {
    MODEL.getMyContent(pageID);
  }
}

function initListener() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListener();
  } catch {}
});
