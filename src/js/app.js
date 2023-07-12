let counter = 1;
const arryCaptionBorder = [
  "Your satisfaction is our number one periority",
  "Let’s fulfill your fashion needs with shoearight now!",
];

const lineone = document.getElementById("lineone");
const linetwo = document.getElementById("linetwo");
const lineothree = document.getElementById("linethree");
const imgborder = document.getElementById("imgborder");
const captinnborder = document.getElementById("captinnborder");
const inputpassword = document.getElementById("inputpassword");
const inputemail = document.getElementById("inputemail");
const imgemail = document.getElementById("imgemail");
const imgpassword = document.getElementById("imgpassword");
const singin = document.getElementById("singin");
const loginpage = document.getElementById("loginpage");
const loadingpage = document.getElementById("loadingpage");
const previwshoea = document.getElementById("previwshoea");
const onboarding3 = document.getElementById("onboarding3");

try {
  linetwo.style.opacity = 0.5;
  lineothree.style.opacity = 0.5;
} catch (error) {}

try {
  inputemail.addEventListener("input", () => {
    if (inputemail.value !== "") {
      imgemail.src = "../src/image/emailblack.png";
    } else {
      imgemail.src = "../src/image/email.png";
    }
    if (inputemail.value !== "" && inputpassword.value !== "") {
      singin.classList.remove("cursor-default");
      singin.classList.remove("pointer-none");
      singin.classList.remove("bg-gray-600");
      singin.classList.add("bg-dark");
      singin.classList.add("cursor-pointer");
      singin.classList.add("pointer-painted");
    } else {
      singin.classList.add("cursor-default");
      singin.classList.add("pointer-none");
      singin.classList.add("bg-gray-600");
      singin.classList.remove("bg-dark");
      singin.classList.remove("cursor-pointer");
      singin.classList.remove("pointer-painted");
    }
  });
  inputpassword.addEventListener("input", () => {
    if (inputpassword.value !== "") {
      imgpassword.src = "../src/image/passwordblack.png";
    } else {
      imgpassword.src = "../src/image/password.png";
    }
    if (inputemail.value !== "" && inputpassword.value !== "") {
      singin.classList.remove("cursor-default");
      singin.classList.remove("pointer-none");
      singin.classList.remove("bg-gray-600");
      singin.classList.add("bg-dark");
      singin.classList.add("cursor-pointer");
      singin.classList.add("pointer-painted");
    } else {
      singin.classList.add("bg-gray-600");
      singin.classList.add("cursor-default");
      singin.classList.add("pointer-none");
      singin.classList.remove("bg-dark");
      singin.classList.remove("cursor-pointer");
      singin.classList.remove("pointer-painted");
    }
  });
} catch (error) {}
function next(event) {
  if (counter == 1) {
    lineone.style.opacity = 0.5;
    linetwo.style.opacity = 1;
    lineothree.style.opacity = 0.5;
    imgborder.style.backgroundImage =
      "url('../src/image/WallpaperDog-20397673 1.png')";
    captinnborder.innerHTML = arryCaptionBorder[0];
    ++counter;
  } else if (counter == 2) {
    lineone.style.opacity = 0.5;
    linetwo.style.opacity = 0.5;
    lineothree.style.opacity = 1;
    imgborder.style.backgroundImage =
      "url('../src/image/WallpaperDog-20534715 1.png')";
    captinnborder.innerHTML = arryCaptionBorder[1];
    event.innerHTML = "Get Started";
    ++counter;
  } else if (counter == 3) {
    onboarding3.classList.add("none-display");
    sessionStorage.setItem("splashscrenn", "ok");
  }
}

async function checkuser(ema, password) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=checkuser&email=${ema}&password=${password}`
    );
    const json = await response.json();
    console.log(json);
    if (json[0].status == "sucess") {
      sessionStorage.setItem("userid", json[0].id);
      sessionStorage.setItem("name", json[0].name);
      sessionStorage.setItem("lastname", json[0].lastname);
      window.location.href = "homepaje.html";
    } else {
      alert("wrong email or password");
    }
  } catch (error) {
    console.log(error);
  }
}

function singinuser(eve) {
  let ema = inputemail.value;
  let pass = inputpassword.value;
  checkuser(ema, pass);
}

if (sessionStorage.getItem("splashscrenn")) {
  loadingpage.classList.add("none-display");
  previwshoea.classList.add("none-display");
  onboarding3.classList.add("none-display");
} else {
  setTimeout(() => {
    loadingpage.classList.add("none-display");
    setTimeout(() => {
      previwshoea.classList.add("none-display");
    }, 2000);
  }, 2000);
}
