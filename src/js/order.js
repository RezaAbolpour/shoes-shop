let iduser = sessionStorage.getItem("userid");
const activelayout = document.getElementById("activelayout");
const activecompleted = document.getElementById("activecompleted");
const lineactive = document.getElementById("lineactived");
const linecompled = document.getElementById("linecompled");
const parendcardcomplet = document.getElementById("parendcardcomplet");
const parendcardactive = document.getElementById("parendcardactive");
const iconshopping_cart = document.getElementById("iconshopping_cart");
const iconshopping_bag = document.getElementById("iconshopping_bag");
const iconhome = document.getElementById("iconhome");
iconshopping_cart.classList.toggle("active");

iconhome.addEventListener("click", function () {
  window.location.href = "homepaje.html";
});
iconshopping_bag.addEventListener("click", function () {
  window.location.href = "cart.html";
});
async function fetchorderactive() {
  console.log("run");
  try {
    const response = await fetch(
      `http://localhost/api.php?target=activeorder&user_id=${iduser}`
    );
    const json = await response.json();
    if (json[0].typeorder == "active") {
      setDataCardactive(json);
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchordercomplet() {
  console.log("run");
  try {
    const response = await fetch(
      `http://localhost/api.php?target=completorder&user_id=${iduser}`
    );
    const json = await response.json();
    if (json[0].typeorder == "complet") {
      setDataCardcomplte(json);
    }
  } catch (error) {
    console.log(error);
  }
}

function totalprice(data) {
  let totalprice = 0;
  data.forEach((element) => {
    totalprice += +element.price * +element.count;
  });
  return totalprice;
}
function createcardactive(list) {
  let card = `
    <div style="height: 120px;" class="radius-10 flex justify-center bg-white flex-grow-4 mt-5"  >
        <div class="flex-grow-1 radius-4 flex justify-center item-center bg-white-750"
            style="width: 80px; height: 90px;margin-left: 10px;margin-top: 14px;">
            <img src="${
              list.image
            }" class="flex justify-center item-center" alt=""
                style="height: 60px; width: 70px;">
        </div>
        <div class="flex-grow-4 flex flex-col justify-center ml-10">
            <div class="flex justify-space-between">
                <div>${list.name}</div>
            </div>
            <div style="padding: 2px;" class="flex item-center gap-5">
                <div style="width: 10px;height: 10px; border-radius: 20px;background-color:${
                  list.color
                }"></div>
                <div class="font-12 color-white-750">${list.color}</div>
                <div class="font-12 color-white-750">|</div>
                <div class="font-12 color-white-750">size =</div>
                <div class="font-12 color-white-750">${list.size}</div>
                <div class="font-12 color-white-750">|</div>
                <div class="font-12 color-white-750">Qty =</div>
                <div class="font-12 color-white-750">${list.count}</div>
            </div>
            <div style="width: 45px;height: 20px; border-radius: 4px;margin-right: 10px;"
                    class="flex justify-center item-center font-9 bg-white-750">in deliver</div>
            <div class="flex justify-space-between item-center">
                <div class="font-weight-600">$${
                  list.price * list.count
                }.00</div>
                <div style="width: 100px;height: 20px; border-radius: 20px;margin-right: 10px;"
                    class="flex justify-center item-center font-12 bg-dark color-white">Track Order</div>
            </div>
        </div>
    </div>`;
  return card;
}
function createcardcomplte(list) {
  let card = `
    <div style="height: 120px;" class="radius-10 flex justify-center bg-white flex-grow-4 mt-5"  >
        <div class="flex-grow-1 radius-4 flex justify-center item-center bg-white-750"
            style="width: 80px; height: 90px;margin-left: 10px;margin-top: 14px;">
            <img src="${
              list.image
            }" class="flex justify-center item-center" alt=""
                style="height: 60px; width: 70px;">
        </div>
        <div class="flex-grow-4 flex flex-col justify-center ml-10">
            <div class="flex justify-space-between">
                <div>${list.name}</div>
            </div>
            <div style="padding: 2px;" class="flex item-center gap-5">
                <div style="width: 10px;height: 10px; border-radius: 20px;background-color:${
                  list.color
                }"></div>
                <div class="font-12 color-white-750">${list.color}</div>
                <div class="font-12 color-white-750">|</div>
                <div class="font-12 color-white-750">size =</div>
                <div class="font-12 color-white-750">${list.size}</div>
                <div class="font-12 color-white-750">|</div>
                <div class="font-12 color-white-750">Qty =</div>
                <div class="font-12 color-white-750">${list.count}</div>
            </div>
            <div style="width: 45px;height: 20px; border-radius: 4px;margin-right: 10px;"
                    class="flex justify-center item-center font-9 bg-white-750">Completed</div>
            <div class="flex justify-space-between item-center">
                <div class="font-weight-600">$${
                  list.price * list.count
                }.00</div>
                <div style="width: 100px;height: 20px; border-radius: 20px;margin-right: 10px;"
                    class="flex justify-center item-center font-12 bg-dark color-white">Buy Again</div>
            </div>
        </div>
    </div>`;
  return card;
}
activelayout.addEventListener("click", function () {
  if (!lineactive.classList.contains("lineactive")) {
    lineactive.classList.toggle("lineactive");
    lineactive.classList.toggle("linefull");
    linecompled.classList.toggle("lineactive");
    linecompled.classList.toggle("linefull");
    parendcardactive.classList.toggle("none-display");
    parendcardcomplet.classList.toggle("none-display");
    fetchorderactive();
  }
});
activecompleted.addEventListener("click", function () {
  if (!linecompled.classList.contains("lineactive")) {
    linecompled.classList.toggle("lineactive");
    linecompled.classList.toggle("linefull");
    lineactive.classList.toggle("lineactive");
    lineactive.classList.toggle("linefull");
    parendcardactive.classList.toggle("none-display");
    parendcardcomplet.classList.toggle("none-display");
    fetchordercomplet();
  }
});

function setDataCardactive(data) {
  parendcardactive.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcardactive(element);
    parendcardactive.innerHTML += card;
  });
}
function setDataCardcomplte(data) {
  parendcardcomplet.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcardcomplte(element);
    parendcardcomplet.innerHTML += card;
  });
}
fetchorderactive();
fetchordercomplet();
