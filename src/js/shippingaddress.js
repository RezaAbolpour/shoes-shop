let iduser = sessionStorage.getItem("userid")
if(!iduser){
    window.location.href = `loading.html`;
}
const continerAddress = document.getElementById("continer-address");
const backcheckout = document.getElementById("backcheckout");
const applyshipping = document.getElementById("applyshipping");

backcheckout.addEventListener("click", function () {
  window.location.href = "checkout.html";
});
async function fetchdata() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=getaddress&user_id=${iduser}`
    );
    const json = await response.json();
    setDataCard(json);
  } catch (error) {
    console.log(error);
  }
}

function createcard(list) {
  let card;
  if (list.titel == "Home") {
    card = `
    <div class="continer-home">
        <div style="height: 50px;" class="radius-10 flex item-center bg-white mt-5">
            <div class="font-16 font-weight-600 flex flex-grow-1 gap-5">
                <div class="flex item-center">
                    <span class="material-symbols-outlined">
                        pin_drop
                    </span>
                </div>
                <div>
                    <div class="font-16 font-weight-600">${list.titel}</div>
                    <div class="font-12 color-gray-580">${list.address}</div>
                </div>
            </div>
            <div>
                <input type="radio" name="bot">
            </div>
        </div>
    </div>`;
  } else {
    card = `
    <div class="continer-home">
        <div style="height: 50px;" class="radius-10 flex item-center bg-white mt-5">
            <div class="font-16 font-weight-600 flex flex-grow-1 gap-5">
                <div class="flex item-center">
                    <span class="material-symbols-outlined">
                        pin_drop
                    </span>
                </div>
                <div>
                    <div class="font-16 font-weight-600">${list.titel}</div>
                    <div class="font-12 color-gray-580">${list.address}</div>
                </div>
            </div>
            <div>
                <input type="radio" name="bot">
            </div>
        </div>
    </div>`;
  }
  return card;
}

function setDataCard(data) {
  continerAddress.innerHTML = "";
  let card;
  data.forEach((element) => {
    card = createcard(element);
    continerAddress.innerHTML += card;
  });
}
applyshipping.addEventListener("click", function () {
  window.location.href = "checkout.html";
});
setTimeout(() => {
  const radioButtons = document.querySelectorAll('input[name="bot"]');
  function handleRadioButtonChange(event) {
    let nodelist = event.target.parentNode.parentNode
      .querySelectorAll("div")[2]
      .querySelectorAll("div");
    let addresarry = [];
    nodelist.forEach((element) => {
      addresarry.push(element.innerHTML + "|");
    });
    sessionStorage.setItem("address", addresarry);
  }

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", handleRadioButtonChange);
  });
}, 500);

const $ = document.querySelector.bind(document);

const openSheetButton = $("#open-sheet");
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

// setIsSheetShown(true)
// Open the sheet when clicking the 'open sheet' button
openSheetButton.addEventListener("click", () => {
  setSheetHeight(Math.min(50, (720 / window.innerHeight) * 100));
  setIsSheetShown(true);
});

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

const titeladdress = document.getElementById("titeladdress");
const idlocationaddress = document.getElementById("idlocationaddress");

async function addaddress(user_id, titel, address) {
  try {
    await fetch(
      `http://localhost/api.php?target=setaddress&user_id=${user_id}&titel=${titel}&address=${address}`
    );
  } catch (error) {
    console.log(error);
  }
}

function applyaddres() {
  addaddress(1, titeladdress.value, idlocationaddress.value);
  setIsSheetShown(false);
  fetchdata();
  window.location.href="shippingAddress.html"
}
draggableArea.addEventListener("mousedown", onDragStart);
draggableArea.addEventListener("touchstart", onDragStart);

window.addEventListener("mousemove", onDragMove);
window.addEventListener("touchmove", onDragMove);

window.addEventListener("mouseup", onDragEnd);
window.addEventListener("touchend", onDragEnd);

fetchdata();
