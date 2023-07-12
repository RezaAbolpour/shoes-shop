let iduser = sessionStorage.getItem("userid");
const backcheckout = document.getElementById("backpayment");
const applyshipping = document.getElementById("applyshipping");
const inputpassword = document.getElementById("inputpassword");
const ordersuccessfull = document.getElementById("ordersuccessfull");
const vieworder = document.getElementById("vieworder");

async function setorderactive() {
    try {
      await fetch(
        `http://localhost/api.php?target=setorderactive&user_id=${iduser}`
      );
    } catch (error) {
      console.log(error);
    }
  }
async function checkuser(password) {
  try {
    const response = await fetch(
      `http://localhost/api.php?target=passwordwallet&password=${password}`
    );
    const json = await response.json();
    console.log(json);
    if (json[0].status == "successfull") {
        ordersuccessfull.classList.toggle("none-display")
        setorderactive()
    } else {
      alert("wrong password");
    }
  } catch (error) {
    console.log(error);
  }
}
applyshipping.addEventListener("click", function () {
  console.log(inputpassword.value);
  checkuser(inputpassword.value);
});

backcheckout.addEventListener("click", function () {
  window.location.href = "payment.html";
});
vieworder.addEventListener("click", function () {
  window.location.href = "order.html";
});
