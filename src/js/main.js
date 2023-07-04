import {data} from "./data.js";
import {v4 as uuidv4} from "https://jspm.dev/uuid";

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
      <div class="order-details-list" data-orderid=${orderItem.orderId}>
      <p class="bold">Title: <p>${orderItem.name}</p></p>
      <div class="bold">Price: <p>${orderItem.price}</p><div>
      <div class="order-button-container">
        <button class="remove-button" id=${orderItem.orderId}>Remove</button>
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
  locatedPoster[0].orderId = uuidv4();
  order.push(locatedPoster[0]);
}

function handleRemoveOrder(e) {
  console.log("here");
  let idx = 0;
  for (let item of order) {
    if (item.orderId === e.target.id) {
      order.splice(idx, 1);
      break;
    }
    idx++;
  }

  if (order.length === 0) {
    toggleOrderDetailsHide();
  } else {
    renderOrder();
  }
}

function renderModal() {
  console.log("placing order");
  console.log(order);

  let placeOrderString = "";
  let insertLocation = document.getElementById("order-modal");

  console.log(insertLocation);
  placeOrderString = `
  <div class="order-form">
    <h2>Order Information</h2>
    <form class="form">
      <input type="text" placeholder="Enter name" required></input>
      <input type="text" placeholder="Enter Address" required></input>
      <input type="email" placeholder="Enter email" required></input>
      <div>
      <button id="submit-order" class="submit-order">Order</button>
      </div>
    </form>
  </div>
  `;
  insertLocation.innerHTML = placeOrderString;
  insertLocation.classList.toggle("hidden");
}

function handlePurchaseOrder(e) {
  e.preventDefault();
  const formEl = document.querySelectorAll("form input");
  let orderDetailsStr = "";
  const name= formEl[0].value
  const address= formEl[1].value
  const email= formEl[2].value
  orderDetailsStr = `
  <div>
    <p>Thank you ${name} for your order.</p>
    <p>Your order has been placed.</p>
    <p>Address: ${address}</p>
  </div>`;
  // document.getElementById("order").classList.toggle('hidden');
  document.getElementById("order-modal").remove()
  document.getElementById('order-items').remove();
  document.getElementById("order-total").remove();
  document.getElementById("order-status").innerHTML = orderDetailsStr;
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
    toggleOrderDetailsVisible();
  } else if (e.target.classList.contains("remove-button")) {
    handleRemoveOrder(e);
  } else if (e.target.classList.contains("place-order")) {
    renderModal();
  } else if (e.target.classList.contains("submit-order")) {
    console.log("Submitting order");
    handlePurchaseOrder(e);
  } else {
    console.log("no button selected");
  }
});
