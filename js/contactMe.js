function validateEmail(email){
	var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function myFunction() {
    var x, text;
    var name,email,message;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    message = document.getElementById("message").value;
    if(name.length <=0 || email.length <=0 || message.length <=0){
    	if (name.length <=0)
    		alert("Name cannot be empty.");
    	else if(email.length <=0)
    		alert("Email cannot be empty.");
    	else
    		alert("Message cannot be empty.");
    }
    else if(validateEmail(email) == false){
    	alert("Please enter a valid email address.");
    }
    else{
    	alert("Thanks for the info "+name+" . I'll contact you soon.");
    	document.getElementById("name").value = "";
    	document.getElementById("email").value = "";
    	document.getElementById("message").value = "";

    }
}