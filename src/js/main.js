import {data} from "./data.js";

const order = [];

function renderList() {
  const root = document.getElementById("root");
  let posterList = "";

  data.forEach(function(poster) {
    posterList += `
    <div class="card" id="poster_${poster.id}">
      <div class="toggle-bar">
       <p class="pad-lft-sm">${poster.name}</p>
        <i class="fa-solid fa-angle-down margin-r-sm" id=${poster.id}></i>
      </div>
      <div class="img-container hidden">
        <div class="container-sm">
          <img src="src/imgs/${poster.poster}"/>
        </div>
        <div class="container-med"> 
          <p>${poster.name}</p>
          <p>${poster.desc}</p>
          <p>${poster.price}</p>
        </div>
      </div>
    <div class="button-group">
     <button class="order-button" data-order-id=poster_${poster.id}>Add to order...</button>
    </div>
    </div>
    <span class="spacer"></span>
    `;
    // console.log(poster);
  });

  root.innerHTML = posterList;
}

renderList();

const orderList = document.getElementById("order-list");
const orderDetails = document.getElementById("order");

function toggleItem(e) {
  const itemToToggle = document.querySelector(
    `#poster_${e.target.id} .img-container`
  );
  itemToToggle.classList.toggle("hidden");
}

function toggleOrderDetailsVisible() {
  if (orderDetails.classList.contains("hidden")) {
    orderDetails.classList.toggle("hidden");
  }
}

function toggleOrderDetailsHide() {
  if (!orderDetails.classList.contains("hidden")) {
    orderDetails.classList.toggle("hidden");
  }
}

function renderOrderTotal() {
  const orderTotalContainer = document.getElementById("order-total");
  let orderTotalStr = "";
  let orderTotal = 0;
  order.forEach(function(current) {
    orderTotal += current.price;
  });

  orderTotalStr = `
    <div>
        <h3 class="txt-center">Order Total</h3>
        <p>Total items: ${order.length}</p>
        <p>Total Price: ${orderTotal}</p>
        <span class="spacer"></span>
        <div class="button-group">
            <button class="place-order" id="process-order">Place Order</button>
        </div>
    </div>
  `;
  orderTotalContainer.innerHTML = orderTotalStr;
}

function renderOrder() {
  const orderDetailsContainer = document.getElementById("order-items");
  let orderString = "";
  order.forEach(function(orderItem) {
    orderString += `
    <div>
      <div class="order-details-list">
      <p class="bold">Title: <p>${orderItem.name}</p></p>
      <div class="bold">Price: <p>${orderItem.price}</p><div>
      <div class="order-button-container">
        <button class="remove">Remove</button>
      </div>
      </div>
      <span class="spacer"></span>
    </div>`;
  });
  orderDetailsContainer.innerHTML = orderString;
  renderOrderTotal();
  toggleOrderDetailsVisible();
}

function updateOrderDetails(target) {
  const posterId = target.dataset.orderId.split("_")[1];
  const locatedPoster = data.filter(function(poster) {
    if (poster.id == posterId) {
      return poster;
    }
  });
  order.push(locatedPoster[0]);
}

orderList.addEventListener("click", function(e) {
  if (e.target.classList.contains("fa-angle-down")) {
    toggleItem(e);
    e.target.classList.remove("fa-angle-down");
    e.target.classList.add("fa-angle-up");
  } else if (e.target.classList.contains("fa-angle-up")) {
    toggleItem(e);
    e.target.classList.remove("fa-angle-up");
    e.target.classList.add("fa-angle-down");
  } else if (e.target.classList.contains("order-button")) {
    updateOrderDetails(e.target);
    renderOrder();
    // renderOrderTotal();
    toggleOrderDetailsVisible();
  }
});

console.log("here");