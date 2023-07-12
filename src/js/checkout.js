let iduser = sessionStorage.getItem("userid");
if (!iduser) {
  window.location.href = `loading.html`;
}
const addresstitle = document.getElementById("addresstitel");
const addresslocation = document.getElementById("addresslocation");
const setaddress = document.getElementById("setaddress");
const listorder = document.getElementById("listorder");
const chooseshipping = document.getElementById("chooseshipping");
const nameshipping = document.getElementById("nameshipping");
const iconedit = document.getElementById("iconedit");
const shippingestime = document.getElementById("shippingestime");
const priceshipping = document.getElementById("priceshipping");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const shippingprice = document.getElementById("shippingprice");
const backcart = document.getElementById("backcart");
const payment = document.getElementById("payment");
const inputpromo = document.getElementById("inputpromo");
const parentpromo = document.getElementById("parentpromo");
const amountpromo = document.getElementById("amountpromo");
try {
  let dataaddress = sessionStorage.getItem("address");
  addresstitle.innerHTML = dataaddress.split("|,")[0];
  addresslocation.innerHTML = dataaddress.split("|,")[1];
} catch (error) {
  console.log(error);
}
try {
  let datashipping = sessionStorage.getItem("shipping");
  console.log(datashipping);
  nameshipping.innerHTML = datashipping.split("|,")[0];
  shippingestime.innerHTML = datashipping.split("|,")[1];
  iconedit.innerHTML = datashipping.split("|,")[2];
  priceshipping.innerHTML = datashipping.split("|,")[3];

  setTimeout(() => {
    shippingprice.innerHTML = datashipping.split("|,")[3] + ".00";
    total.innerHTML =
      "$" +
      (parseFloat(amount.innerHTML.replace("$", "")) +
        parseFloat(shippingprice.innerHTML.replace("$", "")) +
        ".00");
  }, 1000);
} catch (error) {
  console.log(error);
}
setaddress.addEventListener("click", function () {
  window.location.href = "shippingAddress.html";
});

chooseshipping.addEventListener("click", function () {
  window.location.href = "chooseshipping.html";
});

function totalprice(data) {
  let totalprice = 0;
  data.forEach((element) => {
    totalprice += +element.price * +element.count;
  });
  return totalprice;
}
async function fetchcart() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=readorder&user_id=${iduser}`
    );
    const json = await response.json();
    setDataCard(json);
  } catch (error) {
    console.log(error);
  }
}

function cratecardpromo(list) {
  let card = `
  <div class="flex justify-space-around radius-30 " style="width: 100%;background-color: black;" id=${list.id}>
      <div style="height: 40px; width: 100%;"
          class="flex item-center color-white continer-home font-12">
          Discount ${list.percent}% Off
      </div>
      <span class="material-symbols-outlined font-12 color-white flex item-center" onclick="deletpromo(${list.id})">
          close
      </span>
  </div>
  `;
  return card;
}

function craeteinputpromo() {
  let card = `
  <input id="inputpromo" type="text" style="height:35px ;" class="radius-10 border-none outline-none"
  placeholder="Enter Promo Code"> 
  `;
  return card;
}

function deletpromo(eve) {
  parentpromo.innerHTML = craeteinputpromo();
  let datashipping = sessionStorage.getItem("shipping");
  shippingprice.innerHTML = datashipping.split("|,")[3] + ".00";
  let amountorginal =
    parseFloat(amount.innerHTML.replace("$", "")) +
    parseFloat(shippingprice.innerHTML.replace("$", ""));
  let amountdiscounst = (amountorginal * + 0) / 100;
  amountpromo.innerHTML = "$" + amountdiscounst + ".00";
  console.log();
  total.innerHTML =
    "$" +
    (parseFloat(amount.innerHTML.replace("$", "")) +
      parseFloat(shippingprice.innerHTML.replace("$", "")) -
      amountdiscounst +
      ".00");
}
async function checkpromocode(code) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=promo&code=${code}`
    );
    const json = await response.json();
    if (json[0].status == "yes") {
      let datashipping = sessionStorage.getItem("shipping");
      parentpromo.innerHTML = cratecardpromo(json[0]);
      shippingprice.innerHTML = datashipping.split("|,")[3] + ".00";
      let amountorginal =
        parseFloat(amount.innerHTML.replace("$", "")) +
        parseFloat(shippingprice.innerHTML.replace("$", ""));
      let amountdiscounst = (amountorginal * +json[0].percent) / 100;
      amountpromo.innerHTML = "$" + amountdiscounst + ".00";
      console.log();
      total.innerHTML =
        "$" +
        (parseFloat(amount.innerHTML.replace("$", "")) +
          parseFloat(shippingprice.innerHTML.replace("$", "")) -
          amountdiscounst +
          ".00");
    } else {
      alert("your discount code is invalid");
    }
  } catch (error) {
    console.log(error);
  }
}

function checkpromo() {
  console.log(inputpromo.value);
  checkpromocode(inputpromo.value);
}
function createcard(list) {
  console.log(list);
  let card = `
  <div style="height: 100px;" class="radius-10 flex justify-center bg-white flex-grow-4 mt-5"  >
        <div class="flex-grow-1 radius-4 flex justify-center item-center bg-white-750"
            style="width: 70px; height: 70px;margin-left: 10px;margin-top: 14px;">
            <img src="${list.image}" class="flex justify-center item-center" alt=""
                style="height: 60px; width: 70px;">
        </div>
        <div class="flex-grow-4 flex flex-col justify-center">
            <div class="flex justify-space-between">
                <div>${list.name}</div>
            </div>
            <div style="padding: 2px;" class="flex item-center gap-5">
                <div style="width: 10px;height: 10px; border-radius: 20px;background-color:${list.color}"></div>
                <div>${list.color}</div>
                <div>|</div>
                <div>size =</div>
                <div>${list.size}</div>
            </div>
            <div class="flex justify-space-between">
                <div class="font-weight-600">${list.price}</div>
                <div style="width: 20px;height: 20px; border-radius: 20px;background-color:gray;margin-right: 10px;"
                    class="flex justify-center item-center">${list.count}</div>
            </div>
        </div>
    </div>`;
  return card;
}

function setDataCard(data) {
  listorder.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcard(element);
    listorder.innerHTML += card;
  });
  amount.innerHTML = "$" + totalprice(data) + ".00";
}

backcart.addEventListener("click", function () {
  window.location.href = "cart.html";
});

payment.addEventListener("click", function () {
  window.location.href = "payment.html";
});

fetchcart();
