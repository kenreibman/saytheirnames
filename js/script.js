const form = document.querySelector("form");
const liveRegion = document.querySelector(".input-aria-live");

const testEmail = email=>{
	let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
	return re.test(email);
}

const setErrors = ( input , errorId ) =>{
	input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedBy", errorId);
  input.classList.add("hasError");
  input.nextElementSibling.classList.add("show-error");
}

const removeErrors = input =>{
	input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedBy");
  input.classList.remove("hasError");
  input.nextElementSibling.classList.remove("show-error");
}

const testInputs = ( input, errorId ) =>{

  if ( input.name === "email") {
  	if ( !testEmail(input.value) ) return true;
  }
  if ( !input.value ) return true;
  
  // no errors
  return false;
}

/* could be refactor instead of manual checking */

const handleFormSubmit = event =>{
  event.preventDefault();
  const errorMessage = [];
  // This is object destructuring  
  const { firstName, email } = event.target;
  
  // Check if firstName has value or not
  if ( testInputs(firstName) ) {
    setErrors(firstName, "errorFirstName");
    errorMessage.push("firstname");
  } else {
    removeErrors(firstName);
  }

  
  // Check if email has value or not
  if ( testInputs(email) ) {
    setErrors(email, "errorEmail");
    errorMessage.push("email");
  } else {
    removeErrors(email);
  }
  
  // set the live region if has errrors or not
  if ( errorMessage ) {
    liveRegion.textContent = "Form submission invalid. Check your," + errorMessage.join(",") + " input fields"; 
  } else {
    liveRegion.textContent = "Form submission success."
  }
}


form.addEventListener("submit", handleFormSubmit);