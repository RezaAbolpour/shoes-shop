let iduser = sessionStorage.getItem("userid");
let nameus = sessionStorage.getItem("name");
let lastnus = sessionStorage.getItem("lastname");
if (!iduser) {
  window.location.href = `loading.html`;
}
const parendcard = document.getElementById("parentcard");
const messagetime = document.getElementById("messagetime");
const iconhome = document.getElementById("iconhome");
const nameuser = document.getElementById("nameuser");
const lastnameuser = document.getElementById("lastnameuser");
const iconshopping_bag = document.getElementById("iconshopping_bag");
const iconshopping_cart = document.getElementById("iconshopping_cart");
const wishlist = document.getElementById("wishlist");
const inputsearche = document.getElementById("inputsearche");
const recentsearch = document.getElementById("recentsearch");

const all = document.getElementById("all");
const nike = document.getElementById("nike");
const adidas = document.getElementById("adidas");
const puma = document.getElementById("puma");
const asics = document.getElementById("asics");
const reebok = document.getElementById("reebok");
const new_ba = document.getElementById("new_ba");

function popular(eve) {
  all.classList.remove("active");
  nike.classList.remove("active");
  adidas.classList.remove("active");
  puma.classList.remove("active");
  asics.classList.remove("active");
  reebok.classList.remove("active");
  new_ba.classList.remove("active");
  eve.classList.add("active");
  console.log(eve.innerHTML);
  if (eve.innerHTML == "All") {
    fetchshoessearchbybrand("");
  } else {
    fetchshoessearchbybrand(eve.innerHTML);
  }
}

nameuser.innerHTML = nameus;
lastnameuser.innerHTML = lastnus;
messagetime.innerHTML = messagetimehandler();
iconhome.classList.toggle("active");

async function deletsearch(idsearch) {
  try {
    await fetch(`http://localhost/api.php?target=deletserach&id=${idsearch}`);
    getsearch();
  } catch (error) {
    console.log(error);
  }
}

async function getsearch() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=getsaerch&user_id=${iduser}`
    );
    const json = await response.json();
    setDatasaerch(json);
  } catch (error) {
    console.log(error);
  }
}

async function insertsearch(search) {
  try {
    await fetch(
      `http://localhost/api.php?target=setsaerch&user_id=${iduser}&search=${search}`
    );
  } catch (error) {
    console.log(error);
  }
}

function deletsearchfunc(idsearch) {
  console.log(idsearch);
  deletsearch(idsearch);
}
async function fetchshoessearchbyname(name) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=searchallshoes&name=${name}`
    );
    const json = await response.json();
    setDataCard(json);
  } catch (error) {
    console.log(error);
  }
}

async function fetchshoessearchbybrand(brand) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=searchallshoesbrand&brand=${brand}`
    );
    const json = await response.json();
    setDataCard(json);
  } catch (error) {
    console.log(error);
  }
}

async function fetchshoes() {
  try {
    const response = await fetch("http://localhost/api.php?target=getall");
    const json = await response.json();
    setDataCard(json);
  } catch (error) {
    console.log(error);
  }
}

function creatitemsearch(list) {
  let card = `
  <div class="mt-5 flex justify-space-between">
    <div class="flex item-center" onclick="putinput(this)">${list.search}</div>
    <div class="flex item-center">
        <span class="material-symbols-outlined font-12"
            onclick="deletsearchfunc(${list.id})">
            close
        </span>
    </div>
  </div>
  <hr>`;
  return card;
}

function putinput(eve) {
  inputsearche.value = eve.innerHTML;
  recentsearch.classList.add("none-display");
  fetchshoessearchbyname(inputsearche.value);
}

function createcardone(list) {
  let card = `
    <div  class="flex mt-5 gap-5">
      <div class="bg-white-680 radius-30">
          <div class="cardshoes flex justify-center item-center" data-id="${list.id}" onclick="infoshoe(this)">
              <img src="${list.image}" alt="">
          </div>
      </div>
  </div>
  <div class="flex">
      <div class="flex flex-col flex-grow-1">
          <div class="flex flex-col">
              <span class="font-15 font-weight-600">${list.name}</span>
              <span class="font-12 font-weight-600">${list.price}</span>
          </div>
      </div>
  </div>`;
  return card;
}

function createcardtwo(list) {
  let card = `
    <div  class="flex mt-5 gap-5">
      <div class="bg-white-680 radius-30">
          <div class="cardshoes flex justify-center item-center" data-id="${list[0].id}" onclick="infoshoe(this)">
              <img src="${list[0].image}" alt="">
          </div>
      </div>
      <div class="bg-white-680 radius-30">
          <div class="cardshoes flex justify-center item-center" data-id="${list[1].id}" onclick="infoshoe(this)">
              <img src="${list[1].image}" alt="">
          </div>
      </div>
  </div>
  <div class="flex">
      <div class="flex flex-col flex-grow-1">
          <div class="flex flex-col">
              <span class="font-15 font-weight-600">${list[0].name}</span>
              <span class="font-12 font-weight-600">${list[0].price}</span>
          </div>
      </div>
      <div class="flex flex-col flex-grow-1">
          <div class="flex flex-col">
              <span class="font-15 font-weight-600">${list[1].name}</span>
              <span class="font-12 font-weight-600">${list[1].price}</span>
          </div>
      </div>
  </div>`;
  return card;
}

function setDatasaerch(data) {
  recentsearch.classList.remove("none-display");
  recentsearch.innerHTML = "";
  data.forEach((element) => {
    card = creatitemsearch(element);
    recentsearch.innerHTML += card;
  });
}
function setDataCard(data) {
  let counter = 0;
  let datacard = [];
  let card;
  parendcard.innerHTML = "";

  if (data.length % 2 == 0) {
    data.forEach((element) => {
      if (counter < 2) {
        datacard.push(element);
        ++counter;
      }
      if (counter == 2) {
        card = createcardtwo(datacard);
        parendcard.innerHTML += card;
        datacard = [];
        counter = 0;
      }
    });
  } else {
    if (data.length == 1) {
      card = createcardone(data[0]);
      parendcard.innerHTML += card;
    } else {
      data.forEach((element) => {
        if (counter < 2) {
          datacard.push(element);
          ++counter;
        }
        if (counter == 2) {
          card = createcardtwo(datacard);
          parendcard.innerHTML += card;
          datacard = [];
          counter = 0;
        }
      });
      console.log(data[data.length - 1]);
      card = createcardone(data[data.length - 1]);
      parendcard.innerHTML += card;
    }
  }
}

function messagetimehandler() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  let greeting;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good Morning 👋";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon 👋";
  } else {
    greeting = "Good Night 👋";
  }
  return greeting;
}
function infoshoe(event) {
  let id = event.getAttribute("data-id");
  window.location.href = `infocard.html?id=${id}`;
}
iconshopping_bag.addEventListener("click", function () {
  window.location.href = "cart.html";
});
iconshopping_cart.addEventListener("click", function () {
  window.location.href = "order.html";
});
wishlist.addEventListener("click", function () {
  window.location.href = "wishlist.html";
});

function brand(eve) {
  window.location.href = `cardbrand.html?brand=${
    eve.querySelectorAll("span")[0].innerHTML
  }`;
}

inputsearche.addEventListener("input", function () {
  getsearch();
  recentsearch.classList.remove("none-display");
  setTimeout(() => {
    fetchshoessearchbyname(inputsearche.value);
  }, 1000);
});

function hidensearch() {
  recentsearch.classList.add("none-display");
}

function insersearchdatabase() {
  if (inputsearche.value.length != 0) {
    insertsearch(inputsearche.value);
  }
}
fetchshoes();
