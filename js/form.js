function Form(credentials){
    this.credentials = credentials;
    this.confirmPasswordData = null;
    this.badPassword = true;
    this.regexEmailTest = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    this.valdiateEmail = email => {
        return new Promise((resolve, reject) => {
            if(this.regexEmailTest.test(email)){
                resolve("");
            }else{
                reject("Please enter a valid email.");
            }
        });
    };

    this.validatePasswrod = password => {
        return new Promise((resolve, reject) => {
            if(password.length > 4 && password.length < 20){
                this.confirmPasswordData = password;
                this.badPassword = false;
                resolve("");
            }else{
                this.badPassword = true;
                this.confirmPasswordData = password;
                reject("Password must contain between 5 and 20 characters.");
            }
        });
    };

    this.confirmPassword = password => {
        return new Promise((resolve, reject) => {
            if(this.confirmPasswordData === null || this.confirmPasswordData.length === 0
                || this.badPassword){
                reject("Please provide us a valid password first.");     
            }
            if(password !== this.confirmPasswordData){
                reject("Passwords do not match.");
            }else{
                resolve("");
            }
        });
    }

    this.validateName = name => {
        return new Promise((resolve, reject) => {
            if(name.length > 0){
                resolve("");
            }else{
                reject("Please fill this form.");
            }
        });
    };
}