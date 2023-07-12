let iduser = sessionStorage.getItem("userid");
if (!iduser) {
  window.location.href = `loading.html`;
}
const image = document.getElementById("imginfo");
const name = document.getElementById("nameinfo");
const description = document.getElementById("descriptioninfo");
const price = document.getElementById("priceinfo");
const size40 = document.getElementById("size40");
const size41 = document.getElementById("size41");
const size42 = document.getElementById("size42");
const colorblue = document.getElementById("blue");
const colorred = document.getElementById("red");
const coloryellow = document.getElementById("yellow");
const colorgreen = document.getElementById("green");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const counter = document.getElementById("counter");
const addwishlist = document.getElementById("addwishlist");
const backhome = document.getElementById("backhome");
let sizeshoe = 40;
let colorsho = "blue";
let countshoe = 1;
let priceshoe;
let imageshoe;
let nameshoe;

async function deletlike() {
  try {
    await fetch(
      `http://localhost/api.php?target=deletlike&order_id=${
        window.location.search.split("=")[1]
      }`
    );
  } catch (error) {
    console.log(error);
  }
}

async function setlike() {
  try {
    await fetch(
      `http://localhost/api.php?target=setlike&order_id=${window.location.search.split("=")[1]}&like=yes&user_id=${iduser}`
    );
  } catch (error) {
    console.log(error);
  }
}

addwishlist.addEventListener("click", function () {
  let check = addwishlist.classList.toggle("likeorder");
  if (check) {
    console.log("ok");
    setlike();
  } else {
    console.log("no");
    deletlike();
  }
  
});
function min(data) {
  minus.addEventListener("click", function () {
    let courrentcount = +counter.innerHTML;
    if (courrentcount > 1) {
      --courrentcount;
    }
    counter.innerHTML = courrentcount;
    countshoe = courrentcount;
    price.textContent = +data[0].price * +countshoe;
  });
}

function plu(data) {
  plus.addEventListener("click", function () {
    let courrentcount = +counter.innerHTML;
    ++courrentcount;
    counter.innerHTML = courrentcount;
    countshoe = courrentcount;
    price.textContent = "$" + +data[0].price * +countshoe + ".00";
  });
}

colorblue.addEventListener("click", function () {
  colorblue.innerHTML = "";
  colorred.innerHTML = "";
  coloryellow.innerHTML = "";
  colorgreen.innerHTML = "";
  let span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.textContent = "done";
  colorblue.append(span);
  colorsho = "blue";
});

colorred.addEventListener("click", function () {
  colorblue.innerHTML = "";
  colorred.innerHTML = "";
  coloryellow.innerHTML = "";
  colorgreen.innerHTML = "";
  let span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.textContent = "done";
  colorred.append(span);
  colorsho = "red";
});

coloryellow.addEventListener("click", function () {
  colorblue.innerHTML = "";
  colorred.innerHTML = "";
  coloryellow.innerHTML = "";
  colorgreen.innerHTML = "";
  let span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.textContent = "done";
  coloryellow.append(span);
  colorsho = "yellow";
});

colorgreen.addEventListener("click", function () {
  colorblue.innerHTML = "";
  colorred.innerHTML = "";
  coloryellow.innerHTML = "";
  colorgreen.innerHTML = "";
  let span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.textContent = "done";
  colorgreen.append(span);
  colorsho = "green";
});

size40.addEventListener("click", function () {
  if (size40.classList.contains("active")) {
    size41.classList.remove("active");
    size42.classList.remove("active");
  } else {
    size40.classList.add("active");
    size41.classList.remove("active");
    size42.classList.remove("active");
  }
  sizeshoe = size40.textContent;
});
size41.addEventListener("click", function () {
  if (size41.classList.contains("active")) {
    size40.classList.remove("active");
    size42.classList.remove("active");
  } else {
    size41.classList.add("active");
    size40.classList.remove("active");
    size42.classList.remove("active");
  }
  sizeshoe = size41.textContent;
});
size42.addEventListener("click", function () {
  if (size42.classList.contains("active")) {
    size40.classList.remove("active");
    size41.classList.remove("active");
  } else {
    size42.classList.add("active");
    size40.classList.remove("active");
    size41.classList.remove("active");
  }
  sizeshoe = size42.textContent;
});
async function fetchinfo() {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=infocard&id=${
        window.location.search.split("=")[1]
      }`
    );
    const responselike = await fetch(
      `http://localhost/api.php?target=getlike&id_order=${
        window.location.search.split("=")[1]
      }`
    );
    const json = await response.json();
    const jsonlike = await responselike.json();
    console.log(jsonlike[0].like);
    setDataCard(json, jsonlike);
    plu(json);
    min(json);
  } catch (error) {
    console.log(error);
  }
}

async function addtocard(
  user_id,
  imageshoe,
  nameshoe,
  colorsho,
  sizeshoe,
  priceshoe,
  countshoe
) {
  try {
    await fetch(
      `http://localhost/api.php?target=setorder&user_id=${user_id}&image=${imageshoe}&name=${nameshoe}&color=${colorsho}&size=${sizeshoe}&price=${priceshoe}&count=${countshoe}&typeorder=cart`
    );
    window.location.href = "cart.html";
  } catch (error) {
    console.log(error);
  }
}

function setDataCard(data, datalike) {
  image.src = data[0].image;
  name.textContent = data[0].name;
  description.textContent = data[0].description;
  price.textContent = "$" + +data[0].price + ".00";
  priceshoe = data[0].price;
  imageshoe = data[0].image;
  nameshoe = data[0].name;
  if (datalike[0].like == "yes") {
    addwishlist.classList.toggle("likeorder");
  }
}

function sub() {
  addtocard(1, imageshoe, nameshoe, colorsho, sizeshoe, priceshoe, countshoe);
}
backhome.addEventListener("click",function(){
  window.location.href="homepaje.html"
})
fetchinfo();
