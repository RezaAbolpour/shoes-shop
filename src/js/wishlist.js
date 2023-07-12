let iduser = sessionStorage.getItem("userid");
const parendcard = document.getElementById("parentcard");
const backhome = document.getElementById("backhome");

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

async function fetchshoessearchbybrand(brand) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=searchbrandlike&user_id=${iduser}&brand=${brand}`
    );
    const json = await response.json();
    setDataCard([json]);
  } catch (error) {
    console.log(error);
  }
}

async function fetchshoes() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=getalllike&user_id=${iduser}`
    );
    const json = await response.json();
    setDataCard([json]);
  } catch (error) {
    console.log(error);
  }
}
function createcardone(list) {
  let card = `
    <div  class="flex mt-5 gap-5">
      <div class="bg-white-680 radius-30">
          <div class="cardshoes flex justify-center item-center" data-id="${list.id_order}" onclick="infoshoe(this)">
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
          <div class="cardshoes flex justify-center item-center" data-id="${list[0].id_order}" onclick="infoshoe(this)">
              <img src="${list[0].image}" alt="">
          </div>
      </div>
      <div class="bg-white-680 radius-30">
          <div class="cardshoes flex justify-center item-center" data-id="${list[1].id_order}" onclick="infoshoe(this)">
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
function setDataCard(data) {
  let counter = 0;
  let datacard = [];
  let card;
  parendcard.innerHTML = "";

  if (data[0].length % 2 == 0) {
    data[0].forEach((element) => {
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
    if (data[0].length == 1) {
      card = createcardone(data[0][0]);
      parendcard.innerHTML += card;
    } else {
      data[0].forEach((element) => {
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
      console.log(data[0][data[0].length - 1]);
      card = createcardone(data[0][data[0].length - 1]);
      parendcard.innerHTML += card;
    }
  }
}
function infoshoe(event) {
  let id = event.getAttribute("data-id");
  window.location.href = `infocard.html?id=${id}`;
}
backhome.addEventListener("click", function () {
  window.location.href = "homepaje.html";
});
fetchshoes();
