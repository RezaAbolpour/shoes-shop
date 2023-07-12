let iduser = sessionStorage.getItem("userid");
if (!iduser) {
  window.location.href = `loading.html`;
}
const iconshopping_bag = document.getElementById("iconshopping_bag");
const iconhome = document.getElementById("iconhome");
const iconshopping_cart = document.getElementById("iconshopping_cart");
let parendcard = document.getElementById("parendcard");
let toprice = document.getElementById("totalprice");
const checkout = document.getElementById("checkout");
const bottomshitdelet = document.getElementById("bottomshitdelet");
iconshopping_bag.classList.toggle("active");

iconhome.addEventListener("click", function () {
  window.location.href = "homepaje.html";
});
iconshopping_cart.addEventListener("click", function () {
  window.location.href = "order.html";
});

async function fetchcartforremove(id) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=readorderfordelet&id=${id}`
    );
    const json = await response.json();
    setDataCardforbottomsheet(json);
  } catch (error) {
    console.log(error);
  }
}

async function fetchcart() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=readorder&user_id=${iduser}`
    );
    const json = await response.json();
    if (json[0].typeorder == "cart") {
      setDataCard(json);
    } else if (json[0].typeorder == "no") {
      parendcard.innerHTML=""
      toprice.innerHTML="0"
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
async function deletcartserver(id) {
  try {
    await fetch(`http://localhost/api.php?target=deletcart&id=${id}`);
    fetchcart();
  } catch (error) {
    console.log(error);
  }
}

async function updatecart(id, count) {
  try {
    await fetch(
      `http://localhost/api.php?target=updateorder&id=${id}&count=${count}`
    );
    fetchcart();
  } catch (error) {
    console.log(error);
  }
}
function createcardforbottomsheet(list) {
  let card = `
  <div class="radius-10 flex flex-col justify-center bg-white">
    <div class="flex">
        <div class="flex-grow-1 radius-4 flex justify-center item-center bg-white-750"
            style="width: 70px; height: 70px;margin-left: 10px;margin-top: 14px;">
            <img src="${
              list.image
            }" class="flex justify-center item-center" alt=""
                style="height: 60px; width: 70px;">
        </div>
        <div class="flex-grow-4 flex flex-col ml-10">
            <div class="flex justify-space-between" style="margin-top: 14px;">
                <div>${list.name}</div>
            </div>
            <div style="padding: 2px;" class="flex item-center gap-5">
                <div style="width: 10px;height: 10px; border-radius: 20px;background-color: ${
                  list.color
                }"></div>
                <div>${list.color}</div>
                <div>|</div>
                <div>size =</div>
                <div>${list.size}</div>
            </div>
            <div class="flex justify-space-between">
                <div>$${list.price * list.count}.00</div>
                <div class="flex justify-space-between plr-12 bg-white-750"
                    style=" width: 70px; border-radius: 10px;">
                    <span class="font-20 font-weight-600">-</span>
                    <span class="font-20 font-weight-600">${list.count}</span>
                    <span class="font-20 font-weight-600"">+</span>
                </div>
            </div>
        </div>
    </div>
    <div class="ml-10 flex mt-5 justify-space-between" style="margin-bottom: 5px;">
        <div style="height: 30px ; width: 45%; color: black;"
            class="radius-30 flex item-center justify-center color-white bg-white-750" onclick="caceldeletorder()">
            Cancl
        </div>
        <div style="height: 30px; background-color: black; width: 45%;"
            class="radius-30 flex item-center justify-center color-white" onclick="deletorder(${
              list.id
            })">
            Yes Remove
        </div>
    </div>
</div>
  `;
  return card;
}

function createcard(list) {
  let card = `
    <div style="height: 100px;" class="radius-10 flex justify-center bg-white flex-grow-4 mt-5">
        <div class="flex-grow-1 radius-4 flex justify-center item-center bg-white-750"
            style="width: 70px; height: 70px;margin-left: 10px;margin-top: 14px;">
            <img src="${
              list.image
            }" class="flex justify-center item-center" alt=""
                style="height: 60px; width: 70px;">
        </div>
        <div class="flex-grow-4 flex flex-col justify-center">
            <div class="flex justify-space-between">
                <div>this is tesy</div>
                <span class="material-symbols-outlined" data-id=${
                  list.id
                } onclick="deletcart(this)">
                    delete
                </span>
            </div>
            <div style="padding: 2px;" class="flex item-center gap-5">
                <div style="width: 10px;height: 10px; border-radius: 20px;background-color: ${
                  list.color
                };"></div>
                <div>${list.color}</div>
                <div>|</div>
                <div>size =</div>
                <div>${list.size}</div>
            </div>
            <div class="flex justify-space-between">
                <div >${+list.price * +list.count}</div>
                <div class="flex justify-space-between plr-12 bg-white-750"
                    style=" width: 70px; border-radius: 10px;">
                    <span class="font-20 font-weight-600" id="minus" onclick="minus(this)">-</span>
                    <span class="font-20 font-weight-600" id="counter">${
                      list.count
                    }</span>
                    <span class="font-20 font-weight-600" id="plus" onclick="plus(this)">+</span>
                </div>
            </div>
        </div>
    </div>`;
  return card;
}

function minus(eve) {
  let content = +eve.parentNode.querySelectorAll("span")[1].innerHTML;
  let id = eve.parentNode.parentNode.parentNode
    .querySelectorAll("span")[0]
    .getAttribute("data-id");
  if (content > 1) {
    content--;
  }
  eve.parentNode.querySelectorAll("span")[1].innerHTML = content;
  updatecart(id, content);
}
function plus(eve) {
  let content = +eve.parentNode.querySelectorAll("span")[1].innerHTML;
  let id = eve.parentNode.parentNode.parentNode
    .querySelectorAll("span")[0]
    .getAttribute("data-id");
  ++content;
  eve.parentNode.querySelectorAll("span")[1].innerHTML = content;
  updatecart(id, content);
}

function deletcart(eve) {
  console.log(eve);
  let id = eve.getAttribute("data-id");
  fetchcartforremove(id);
  setSheetHeight(Math.min(50, (720 / window.innerHeight) * 100));
  setIsSheetShown(true);
}

function deletorder(idorder) {
  setIsSheetShown(false);
  deletcartserver(idorder);
}

function caceldeletorder() {
  setIsSheetShown(false);
}

function setDataCard(data) {
  parendcard.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcard(element);
    parendcard.innerHTML += card;
  });
  toprice.innerHTML = "$" + totalprice(data) + ".00";
}

function setDataCardforbottomsheet(data) {
  bottomshitdelet.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcardforbottomsheet(element);
    bottomshitdelet.innerHTML += card;
  });
}

checkout.addEventListener("click", function () {
  window.location.href = "checkout.html";
});
fetchcart();

const $ = document.querySelector.bind(document);

const sheet = $("#sheet");
const sheetContents = sheet.querySelector(".contents");
const draggableArea = sheet.querySelector(".draggable-area");

let sheetHeight; // in vh

const setSheetHeight = (value) => {
  sheetHeight = Math.max(0, Math.min(100, value));
  sheetContents.style.height = `${sheetHeight}vh`;

  if (sheetHeight === 100) {
    sheetContents.classList.add("fullscreen");
  } else {
    sheetContents.classList.remove("fullscreen");
  }
};

const setIsSheetShown = (isShown) => {
  sheet.setAttribute("aria-hidden", String(!isShown));
};

// Open the sheet when clicking the 'open sheet' button

// Hide the sheet when clicking the 'close' button
sheet.querySelector(".close-sheet").addEventListener("click", () => {
  setIsSheetShown(false);
});

// Hide the sheet when clicking the background
sheet.querySelector(".overlay").addEventListener("click", () => {
  setIsSheetShown(false);
});

const isFocused = (element) => document.activeElement === element;

// Hide the sheet when pressing Escape if the target element
// is not an input field
window.addEventListener("keyup", (event) => {
  const isSheetElementFocused =
    sheet.contains(event.target) && isFocused(event.target);

  if (event.key === "Escape" && !isSheetElementFocused) {
    setIsSheetShown(false);
  }
});

const touchPosition = (event) => (event.touches ? event.touches[0] : event);

let dragPosition;

const onDragStart = (event) => {
  dragPosition = touchPosition(event).pageY;
  sheetContents.classList.add("not-selectable");
  draggableArea.style.cursor = document.body.style.cursor = "grabbing";
};

const onDragMove = (event) => {
  if (dragPosition === undefined) return;

  const y = touchPosition(event).pageY;
  const deltaY = dragPosition - y;
  const deltaHeight = (deltaY / window.innerHeight) * 100;

  setSheetHeight(sheetHeight + deltaHeight);
  dragPosition = y;
};

const onDragEnd = () => {
  dragPosition = undefined;
  sheetContents.classList.remove("not-selectable");
  draggableArea.style.cursor = document.body.style.cursor = "";

  if (sheetHeight < 25) {
    setIsSheetShown(false);
  } else if (sheetHeight > 75) {
    setSheetHeight(100);
  } else {
    setSheetHeight(50);
  }
};

draggableArea.addEventListener("mousedown", onDragStart);
draggableArea.addEventListener("touchstart", onDragStart);

window.addEventListener("mousemove", onDragMove);
window.addEventListener("touchmove", onDragMove);

window.addEventListener("mouseup", onDragEnd);
window.addEventListener("touchend", onDragEnd);
