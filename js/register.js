function animateLabels(input){
    let label = input.parentElement.querySelector("label");
    label.classList.add("move-label");
    document.addEventListener("click", (event) => {
        if(event.target !== input && input.value === ""){
            label.classList.remove("move-label");
        }
    });    
}

const inputs = document.querySelectorAll(".input-wrapper input");
inputs.forEach(input => {
    input.addEventListener("click", (event) => {
        animateLabels(input);
    });

    input.addEventListener("focus", () => {
        animateLabels(input);
    });

    input.addEventListener("keydown", () => {
        animateLabels(input);
    });
});

function warn(...data){
    data[0].classList.add("warn");
    data[0].nextElementSibling.textContent = data[1];
}

function removeWarn(...data){
    data[0].classList.remove("warn");
    data[0].nextElementSibling.textContent = data[1];
}

let form = new Form();
let validForm = {
    firstNameOk: false,
    lastNameOk: false,
    emailOk: false,
    passwordOk: false,
    passwordConfirmation: false
};

let registerCredentials = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    cPassword: null
};

let registerInputs = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword")
};

registerInputs.firstName.addEventListener("input", () => {
    let firstNameValue = firstName.value;
    form.validateName(firstNameValue).then(
        response=>{
            registerCredentials.firstName = firstNameValue
            validForm.firstNameOk = true;
            removeWarn(firstName, response);
        },
        error => {
            validForm.firstNameOk = false;
            warn(firstName, error);
        }
    );
});

registerInputs.lastName.addEventListener("input", () => {
    let lastNameValue = lastName.value;
    form.validateName(lastNameValue).then(
        response=>{
            registerCredentials.lastName = lastNameValue;
            validForm.lastNameOk = true;
            removeWarn(lastName, response);
        },
        error => {
            validForm.lastNameOk = false;
            warn(lastName, error);
        }
    );
});

registerInputs.email.addEventListener("input", () => {
    let emailValue = email.value;
    form.valdiateEmail(emailValue).then(
        response=>{
            registerCredentials.email = emailValue;
            validForm.emailOk = true;
            removeWarn(email, response);
        },
        error => {
            validForm.emailOk = false;
            warn(email, error);
        }
    );
});

registerInputs.password.addEventListener("input", () => {
    let passwrodValue = password.value;
    form.validatePasswrod(passwrodValue).then(
        response => {
            registerCredentials.password = passwrodValue;
            validForm.passwordOk = true;
            removeWarn(password, response);
        },
        error => {
            validForm.passwordOk = false;
            warn(password, error);
        }
    );
});

registerInputs.confirmPassword.addEventListener("input", () => {
    let passwrodValue = confirmPassword.value;
    form.confirmPassword(passwrodValue).then(
        response => {
            registerCredentials.cPassword = passwrodValue;
            validForm.passwordConfirmation = true;
            removeWarn(confirmPassword, response);
        },
        error => {
            validForm.passwordConfirmation = false;
            warn(confirmPassword, error);
        }
    );
});

function fieldsToWarn(...fields){
    fields.forEach(field => {
        field.classList.add("warn");
        field.nextElementSibling.textContent = "Please fill this field";
    });
}

document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let thumbsUp = document.getElementById("signUpThumbsUp");
    let thumbsdown = document.getElementById("signUpThumbsDown");
    for(let i in registerInputs){
        if(registerInputs[i].value === ""){ 
            fieldsToWarn(registerInputs[i]);
        }
    }
    if(validForm.emailOk && validForm.passwordConfirmation && validForm.passwordOk
        && validForm.firstNameOk && validForm.lastNameOk){
            Form.prototype.register = function (){
                console.log(this.credentials);
                return () => {
                    thumbsUp.classList.add("show-thumbs");
                    setTimeout(() => {
                        thumbsUp.classList.remove("show-thumbs");
                    }, 3000);
                };
            };
        new Form(registerCredentials).register()();
    }else{
        thumbsdown.classList.add("show-thumbs");
        setTimeout(() => {
            thumbsdown.classList.remove("show-thumbs");
        }, 3000);
    }
});

let loginCredentials = {
    email: null,
    password: null
};

let loginValid = {
    emailOk: false,
    passwordOk: false
};

let loginInputs = {
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword")
};

loginInputs.loginEmail.addEventListener("input", () => {
    let emailValue = loginEmail.value;
    form.valdiateEmail(emailValue).then(
        response => {
            loginValid.emailOk = true;
            loginCredentials.email = emailValue;
            removeWarn(loginEmail, response)
        },
        error => {
            loginValid.emailOk = false;
            warn(loginEmail, error);
        }
    );
});

loginInputs.loginPassword.addEventListener("input", () => {
    let passwordvalue = loginPassword.value;
    form.validatePasswrod(passwordvalue).then(
        response => {
            loginValid.passwordOk = true;
            loginCredentials.password = passwordvalue;
            removeWarn(loginPassword, response);
        },
        error => {
            loginValid.passwordOk = false;
            warn(loginPassword, error);
        }
    );
});

let registerWrapper = document.getElementById("registerWrapper");
let loginWrapper = document.getElementById("loginWrapper");
document.getElementById("alreadyHaveAccount").addEventListener("click", () => {
    registerWrapper.classList.add("hide-register-form");
    registerWrapper.setAttribute("data-toggle", "hidden");
    loginWrapper.setAttribute("data-toggle", "visible");
    loginWrapper.classList.add("show-login-form");
});

document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();
    let thumbsUp = document.getElementById("signUpThumbsUpLogin");
    let thumbsdown = document.getElementById("signUpThumbsDownLogin");
    for(let i in loginInputs){
        if(loginInputs[i].value === ""){ 
            fieldsToWarn(loginInputs[i]);
        }
    }
    if(loginValid.emailOk && loginValid.passwordOk){
        Form.prototype.login = function() {
            console.log(this.credentials);
            return () => {
                thumbsUp.classList.add("show-thumbs");
                setTimeout(() => {
                    thumbsUp.classList.remove("show-thumbs");
                }, 3000);
            };
        };
        new Form(loginCredentials).login()();
    }else{
        thumbsdown.classList.add("show-thumbs");
        setTimeout(() => {
            thumbsdown.classList.remove("show-thumbs");
        }, 3000);
    }
});

document.getElementById("signUp").addEventListener("click", () => {
    registerWrapper.classList.remove("hide-register-form");
    registerWrapper.setAttribute("data-toggle", "visible");
    loginWrapper.setAttribute("data-toggle", "hidden");
    loginWrapper.classList.remove("show-login-form");
});