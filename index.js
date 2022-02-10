// init elements
const items = document.querySelector(".jew-list");
const cartNav = document.querySelector(".nav__cart");
const cart = document.querySelector(".cart");
const cartNumber = document.querySelector(".nav__cart span");
const cartList = document.querySelector(".cart-list");
const total = document.querySelector(".total span");
const reset = document.querySelector(".reset");
const search = document.querySelector(".search-bar");
const itemCard = document.querySelector(".item");

// fetch data from API
const getData = async () => {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const data = await res.json();
  console.log(data);
  renderList(data);
};
getData();
// render list
const renderList = (list) => {
  list.forEach((element) => {
    const html = `<li id=${element.id} class='item'>
  <div class="item-wrapper">
  <img src=${element.image} class='item__img'>
  <div class='text-wrapper'>
  <p class='item__title'>${element.title}</p>
  <p class='item__price'>Price: ${element.price}$</p>
  <button type='submit' class='item__btn'>Order Now</button>
  <div>
  </div>
  </li>`;
    items.insertAdjacentHTML("beforeend", html);
    // click on order btn
  });
  items.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const clickedLi = e.target.closest("li");
      // increasing number of cart by 1
      cartNumber.textContent++;
      console.log(clickedLi.id);
      renderCartList(clickedLi.id, list);
    }
  });
};

// toggle cart
cartNav.addEventListener("click", function (e) {
  cart.classList.toggle("cart");
});

// rendering lists inside carts
let cartArr = [];
const renderCartList = (id, list) => {
  console.log(id);
  console.log(list);
  const duplicate = cartArr.find((el) => el.id == id);
  if (duplicate) {
    increaseUnitNumber(duplicate, id);
  } else {
    const clickedItem = list.find((item) => item.id == id);
    cartArr.push({
      ...clickedItem,
      num: 1,
    });
    updateCart();
  }
};
// updating cart
const updateCart = () => {
  renderCartItems();
  updateCartNumbers();
};

// rendering cart items
const renderCartItems = () => {
  cartList.innerHTML = "";
  console.log(cartArr);
  cartArr.forEach((el) => {
    cartList.innerHTML += `<li id=${el.id} class='cart-item'>
       <div class='cart-img__wrapper'>
       <img src=${el.image} class='cart-img'></img>
       </div>
       <div class='cart-title'>${el.title}</div>
       <div class='cart-price'>${el.price}$</div>
       <div class='cart-num'>x${el.num}</div>
       <button onclick="decreaseUnitNumber(${el.id})" class='cart-btn'>&#128465;</button>
       </li>`;
  });
};

// update numbers of cart
const updateCartNumbers = () => {
  let totalNum = 0;
  console.log(cartArr);
  cartArr.forEach((el) => {
    totalNum += el.price * el.num;
  });
  console.log(totalNum.toFixed(2));
  total.innerHTML = `${totalNum.toFixed(2)}$`;
};

// increase cart num
const increaseUnitNumber = (list, id) => {
  console.log(id);
  list.num++;
  updateCart();
};

// decrease cart num
const decreaseUnitNumber = (id) => {
  cartNumber.textContent--;
  console.log(id);
  cartArr.forEach((el) => {
    if (el.id == id && el.num == 1) removeLastLi(id);
  });
  cartArr = cartArr.map((el) => {
    let number = el.num;
    if (el.id == id && el.num > 1) {
      number--;
    }
    console.log({ ...el, num: number });
    return { ...el, num: number };
  });
  console.log(cartArr);
  updateCart();
};

// remove last item
const removeLastLi = (id) => {
  cartArr.map((el) => {
    console.log(el.id);
    cartArr = cartArr.filter((item) => item.id != id);
    return cartArr;
  });
};

// reset cart
reset.addEventListener("click", function (e) {
  console.log(e.target);
  cartArr = [];
  cartList.innerHTML = "";
  cartNumber.innerHTML = 0;
  total.innerHTML = 0;
});

// search
search.addEventListener("keydown", function (e) {
  const value = e.target.value;
  const allItemsName = document.querySelectorAll(".item__title");
  allItemsName.forEach((item) => {
    if (item.innerHTML.toLowerCase().includes(value.toLowerCase())) {
      item.closest("li").style.display = "block";
    } else {
      item.closest("li").style.display = "none";
    }
  });
});
