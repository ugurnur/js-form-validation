console.log("hello");

const myform = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const errors = document.querySelectorAll(".errors");
const required = ["email", "username"];

// preventing submit button to refresh the page
myform.addEventListener("submit", validate);

function validate(e) {
  e.preventDefault();
  let data = {};
  inputs.forEach(el => {
    let nameProp = el.getAttribute("name");
    let err = false;
    if (nameProp !== null) {
      data[nameProp] = el.value;
      if (el.value.length === 0 && required.includes(nameProp)) {
        addError(el, "Required Field", nameProp);
        err = true;
      }
      if (nameProp === "email") {
        let exp = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
        let result = exp.test(el.value);
        if (!result) console.log("not valid email addres");
        err = true;
      }
    }

    console.log(el.value);
  });

  console.log(data);
}

function addError(el, msg, nameProp) {
  const spanEl = el.nextElementSibling;
  spanEl.classList.remove("hide");
  spanEl.textContent = `${nameProp.toUpperCase()} ${msg}`;
  el.classList.add("error-border");
}
