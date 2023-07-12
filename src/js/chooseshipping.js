const backcheckout = document.getElementById("backcheckout");
const applyshipping = document.getElementById("applyshipping");
backcheckout.addEventListener("click", function () {
  window.location.href = "checkout.html";
});

applyshipping.addEventListener("click", function () {
  window.location.href = "checkout.html";
});
setTimeout(() => {
  const radioButtons = document.querySelectorAll('input[name="bot"]');
  function handleRadioButtonChange(event) {
    let nodelist = event.target.parentNode.parentNode
      .querySelectorAll("div")[2]
      .querySelectorAll("div");
    let shippingaddress = [];
    nodelist.forEach((element) => {
      shippingaddress.push(element.innerHTML + "|");
    });
    shippingaddress.push("edit|");
    shippingaddress.push(
      event.target.parentNode.parentNode
        .querySelectorAll("div")[5]
        .querySelectorAll("div")[0].innerHTML
    );
    sessionStorage.setItem("shipping", shippingaddress);
    console.log(shippingaddress);
  }
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", handleRadioButtonChange);
  });
}, 1000);
