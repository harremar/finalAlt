const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const productButton = document.querySelector(".product-button");
const amount = document.querySelector(".amount");
const circleCount = document.querySelector(".circleCount");

let products = [
  {
    id: 0,
    productName: "K-Supreme Plus® SMART Single Serve Coffee Maker",
    productImage: "coffee1.webp",
    productCost: 199.99,
    inCart: 0,
  },
  {
    id: 1,
    productName: "K-Mini® Single Serve Coffee Maker",
    productImage: "coffee2.webp",
    productCost: 79.99,
    inCart: 0,
  },
  {
    id: 2,
    productName: "Keurig® K-Select® Coffee Maker",
    productImage: "coffee3.webp",
    productCost: 109.99,
    inCart: 0,
  },
  {
    id: 3,
    productName: "Keurig® K-Elite® Single Serve Coffee Maker",
    productImage: "coffee4.webp",
    productCost: 179.99,
    inCart: 0,
  },
  {
    id: 4,
    productName: "K-Café® Single Serve Coffee Latte & Cappuccino Maker",
    productImage: "coffee5.webp",
    productCost: 89.99,
    inCart: 0,
  },
  {
    id: 5,
    productName: "K-Mini Plus® Single Serve Coffee Maker",
    productImage: "coffee6.webp",
    productCost: 99.99,
    inCart: 0,
  },
  {
    id: 6,
    productName: "K-Slim® Single Serve Coffee Maker",
    productImage: "coffee7.webp",
    productCost: 89.99,
    inCart: 0,
  },
  {
    id: 7,
    productName: "K-Duo™ Single Serve & Carafe Coffee Maker",
    productImage: "coffee8.webp",
    productCost: 169.99,
    inCart: 0,
  },
  {
    id: 8,
    productName: "Keurig® K-Classic® Coffee Maker",
    productImage: "coffee9.webp",
    productCost: 119.99,
    inCart: 0,
  },
  {
    id: 9,
    productName: "Keurig® K-Supreme® Single Serve Coffee Maker",
    productImage: "coffee10.webp",
    productCost: 149.99,
    inCart: 0,
  },
  {
    id: 10,
    productName: "K-Duo Plus™ Single Serve & Carafe Coffee Maker",
    productImage: "coffee11.webp",
    productCost: 114.99,
    inCart: 0,
  },
  {
    id: 11,
    productName: "K-Duo® Special Edition Single Serve & Carafe Coffee Maker",
    productImage: "coffee12.webp",
    productCost: 99.99,
    inCart: 0,
  },
];
let cart = [];
hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function deleteAllItems() {
  if (loggedIn == false) {
    alert("need to be logged in to delete items");
  }
  //if user is logged in add item to the cart and alert them
  else if (loggedIn == true) {
    console.log("deleting all items");
    alert("deleting all items");
    circleCount.style.display = "none";
    circleCount.innerHTML = "0";
    itemsInCart = [];
    localStorage.setItem("cartNumbers", 0);
    localStorage.setItem("productsInCart", "{}");
    $(".products-container").empty();
    $(".total").html("Order Total: $0.00");
  }
}
function buyingAllItems() {
  if (loggedIn == false) {
    alert("need to be logged in to buy items");
  } else if (loggedIn == true) {
    console.log("buying items");
    alert("You have successful purchased your order");
    circleCount.style.display = "none";
    circleCount.innerHTML = "0";
    itemsInCart = [];
    localStorage.setItem("cartNumbers", 0);
    localStorage.setItem("productsInCart", "{}");
    $(".products-container").empty();
    $(".total").html("Order Total: $0.00");
  }
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
      if (circleCount.innerHTML != 0) {
        $(".circleCount").css("display", "flex");
      } else {
        $(".circleCount").css("display", "none");
      }
    }

    //if user is not there do these display
    else {
      loggedIn = false;
      fullName = "";
      $(".profile").css("display", "flex");
      $(".signout").css("display", "none");
      $(".circleCount").css("display", "none");
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
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("error");
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
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("you are signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
//this function gets the pages
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    MODEL.getMyContent("home");
    gettingData();
  } else if (pageID == "home") {
    MODEL.getMyContent(pageID);
    //fetching the data for data.json
    gettingData();
  } else if (pageID == "cart") {
    MODEL.getMyContent("cart");
    gettingCartData();
  } else {
    MODEL.getMyContent(pageID);
  }
}

//this function listens if link name changes. calls route
function initListener() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListener();
    appendCartData(data);
  } catch {}
});

//function fetches the data from data.json
function gettingData() {
  fetch(new Request("data/data.json"))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}
function gettingCartData() {
  fetch(new Request("data/data.json"))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendCartData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}

//function display all the products on HOME page
function appendData(objects) {
  let dvProducts = document.getElementById("product-section");

  //for loop goes until it goes through all of the objects
  for (var i = 0; i < objects.length; i++) {
    let newEl = document.createElement("div");
    //what is in the innerHTML
    newEl.innerHTML =
      '<div class ="product-holder"> <div class="ribbon-holder"></div><div class="product-image"><img class="img" src="images/' +
      objects[i].productImage +
      '" alt=""></div><div class="product-name"><h1>' +
      objects[i].productName +
      '</h1></div><div class="product-price"><h2><span class="small">$</span>' +
      objects[i].productCost +
      '</h2></div><div class="freeshipping-holder"><img src="images/truck.svg" alt=""><h4>FREE SHIPPING</h4></div><div class="product-button" onclick="loadListeners(' +
      objects[i].id +
      ')" data-number="' +
      objects[i].id +
      '"><h3>BUY NOW</h3></div></div>';
    //adds newEl to the bottom of the list
    dvProducts.appendChild(newEl);
  }
}

function appendCartData(object) {
  let cartItems = localStorage.getItem("productsInCart");
  objects = JSON.parse(cartItems);
  console.log(objects);
  let total = 0;
  if (loggedIn == true) {
    $.each(objects, function (idx, value) {
      console.log(value);
      let newCart = document.createElement("div");
      //what is in the innerHTML
      newCart.innerHTML =
        '<div class ="product-holder"><div class="product-image"><img class="img" src="images/' +
        value.productImage +
        '" alt=""></div><div class="product-name"><h1>' +
        value.productName +
        '</h1></div><div class="product-quantity">' +
        value.inCart +
        '</div><div class="product-price"><h2><span class="small">$</span>' +
        value.productCost +
        "</h2></div>";
      //adds newEl to the bottom of the list
      $(".products-container").append(newCart);
      total =
        Math.round(
          100 *
            (Number(total) + Number(value.productCost) * Number(value.inCart))
        ) / 100;

      $(".total").html("Order Total: $" + total);
      console.log("total", total);
    });
  } else {
    console.log("you are logged out so no items");
  }
  //for loop goes until it goes through all of the objects
}
//

function loadListeners(id) {
  cartNumbers(products[id]);

  function onloadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
      circleCount.innerHTML = productNumbers;
    }
  }
  function cartNumbers(product) {
    //if user is not logged in alert them
    if (loggedIn == false) {
      circleCount.style.display = "none";
      alert("need to be logged in to buy something");
    }
    //if user is logged in add item to the cart and alert them
    else if (loggedIn == true) {
      alert("item added to cart");
      circleCount.style.display = "flex";

      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);
      if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
      } else {
        localStorage.setItem("cartNumbers", 1);
      }
      circleCount.innerHTML = productNumbers + 1;
      setItems(product);
    }
  }

  function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[product.productName] == undefined) {
        cartItems = {
          ...cartItems,
          [product.productName]: product,
        };
      }
      // console.log(cartItems[product.productName]);
      cartItems[product.productName].inCart += 1;
    } else {
      product.inCart = 1;
      cartItems = {
        [product.productName]: product,
      };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

  onloadCartNumbers();
}
