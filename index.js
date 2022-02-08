// init elements
const items = document.querySelector(".jew-list");
const cartNav = document.querySelector(".nav__cart");
const cart = document.querySelector(".cart");
const cartNumber = document.querySelector(".nav__cart span");
const cartList = document.querySelector(".cart-list");
const total = document.querySelector(".total span");

// fetch data from API
const getData = async () => {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const data = await res.json();
  console.log(data);
  renderList(data);
};

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
getData();

// toggle cart
cartNav.addEventListener("click", function (e) {
  //   e.defaultPrevented();
  cart.classList.toggle("cart");
});

// rendering lists inside carts
let cartArr = [];
const renderCartList = (id, list) => {
  console.log(id);
  console.log(list);
  const duplicate = cartArr.find((el) => el.id == id);
  if (duplicate) {
    duplicate.num++;
    console.log(duplicate);
    return;
  }
  const clickedItem = list.find((item) => item.id == id);
  cartArr.push({
    ...clickedItem,
    num: 1,
  });
  console.log(cartArr);
  updateCart();
};
// updating cart
const updateCart = () => {
  renderCartItems();
  updateCartNumbers();
};

// rendering cart items
const renderCartItems = () => {
  cartList.innerHTML = "";
  cartArr.forEach((el) => {
    cartList.innerHTML += `<li class='cart-item'>
       <div class='cart-img__wrapper'>
       <img src=${el.image} class='cart-img'></img>
       </div>
       <div>${el.title}</div>
       <div>${el.price}$</div>
       <div>x${el.num}</div>
       <div>x</div>
       </li>`;
  });
};

// update numbers of cart
const updateCartNumbers = () => {
  cartArr.forEach((el) => {
    console.log(el.price);
    let totalNum = +total.textContent;
    totalNum += el.price;
    console.log(totalNum);
    total.textContent = totalNum;
  });
};
//   const eachImg = li.firstElementChild.firstElementChild.src;
//   const eachTitle =
//     li.firstElementChild.children[1].firstElementChild.textContent;
//   const eachPrice = li.firstElementChild.children[1].children[1].textContent;
//   const eachPriceWitout$ = eachPrice.slice(0, -1);
//   const html = `<li class='cart-item'>
//   <div class='cart-img__wrapper'>
//   <img src=${eachImg} class='cart-img'></img>
//   </div>
//   <div>${eachTitle}</div>
//   <div>${eachPrice}</div>
//   <div>x1</div>
//   <div>x</div>
//   </li>`;

//   cartList.insertAdjacentHTML("beforeend", html);

// increasing total price
//   console.log(+eachPriceWitout$);
//   let totalNum = +total.textContent;
//   console.log(totalNum);
//   totalNum += +eachPriceWitout$;
//   total.textContent = totalNum;
