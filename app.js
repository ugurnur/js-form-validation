"use strict";
const myform = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".error");
const required = ["email", "username"];

// preventing submit button to refresh the page
myform.addEventListener("submit", validate);

function validate(e) {
  e.preventDefault();
  let err = false;
  console.log("err1", err);

  errors.forEach(item => item.classList.add("hide"));
  document
    .querySelectorAll(".error-border")
    .forEach(item => item.classList.remove("error-border"));

  inputs.forEach(el => {
    let nameProp = el.getAttribute("name");
    if (nameProp !== null) {
      if (el.value.length === 0 && required.includes(nameProp)) {
        addError(el, "Required Field", nameProp);
        err = true;
      }
      if (nameProp === "email") {
        let exp = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
        let result = exp.test(el.value);
        if (!result) addError(el, "not valid email addres", nameProp);
        // err = true;
      }

      if (nameProp === "password") {
        let exp = /[A-Za-z0-9]+$/;
        let result = exp.test(el.value);
        if (!result) {
          addError(el, "Only numbers and letters", nameProp);
          err = true;
        }
        if (!(el.value.length > 3 && el.value.length < 9)) {
          addError(el, "Must be between 3 and 8 characters", nameProp);
          err = true;
        }
      }
    }
  });
  console.log(err);
  if (!err) {
    document.querySelector("form").classList.add("hide");
    let h1 = document.createElement("H1");
    h1.textContent = "Thanks. Form has been submitted";
    document.body.appendChild(h1);
  }
}
function addError(el, msg, nameProp) {
  const spanEl = el.nextElementSibling;
  spanEl.classList.remove("hide");
  spanEl.textContent = `${nameProp.toUpperCase()} ${msg}`;
  el.classList.add("error-border");
}
