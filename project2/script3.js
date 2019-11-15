var statesSelect = "State:<select name=\"state\">" +
					"<option value=\"default\">Select State</option>" +
					"<option value=\"Alabama\">Alabama</option>" +
					"<option value=\"Alaska\">Alaska</option>" +
					"<option value=\"Arizona\">Arizona</option>" +
					"<option value=\"Arkansas\">Arkansas</option>" +
					"<option value=\"California\">California</option>" +
					"<option value=\"Colorado\">Colorado</option>" +
					"<option value=\"Connecticut\">Connecticut</option>" +
					"<option value=\"Delaware\">Delaware</option>" +
					"<option value=\"Florida\">Florida</option>" +
					"<option value=\"Georgia\">Georgia</option>" +
					"<option value=\"Hawaii\">Hawaii</option>" +
					"<option value=\"Idaho\">Idaho</option>" +
					"<option value=\"Illinois\">Illinois</option>" +
					"<option value=\"Indiana\">Indiana</option>" +
					"<option value=\"Iowa\">Iowa</option>" +
					"<option value=\"Kansas\">Kansas</option>" +
					"<option value=\"Kentucky\">Kentucky</option>" +
					"<option value=\"Louisiana\">Louisiana</option>" +
					"<option value=\"Maine\">Maine</option>" +
					"<option value=\"Maryland\">Maryland</option>" +
					"<option value=\"Massachusetts\">Massachusetts</option>" +
					"<option value=\"Michigan\">Michigan</option>" +
					"<option value=\"Minnesota\">Minnesota</option>" +
					"<option value=\"Mississippi\">Mississippi</option>" +
					"<option value=\"Missouri\">Missouri</option>" +
					"<option value=\"Montana\">Montana</option>" +
					"<option value=\"Nebraska\">Nebraska</option>" +
					"<option value=\"Nevada\">Nevada</option>" +
					"<option value=\"New Jersey\">New Jersey</option>" +
					"<option value=\"New Mexico\">New Mexico</option>" +
					"<option value=\"New York\">New York</option>" +
					"<option value=\"North Carolina\">North Carolina</option>" +
					"<option value=\"North Dakota\">North Dakota</option>" +	
					"<option value=\"Ohio\">Ohio</option>" +
					"<option value=\"Oklahoma\">Oklahoma</option>" +
					"<option value=\"Oregon\">Oregon</option>" +
					"<option value=\"Pennsylvania\">Pennsylvania</option>" +
					"<option value=\"Rhode Island\">Rhode Island</option>" +
					"<option value=\"South Carolina\">South Carolina</option>" +
					"<option value=\"South Dakota\">South Dakota</option>" +
					"<option value=\"Tennessee\">Tennessee</option>" +
					"<option value=\"Texas\">Texas</option>" +
					"<option value=\"Utah\">Utah</option>" +
					"<option value=\"Vermont\">Vermont</option>" +
					"<option value=\"Virginia\">Virginia</option>" +
					"<option value=\"Washington\">Washington</option>" +
					"<option value=\"West Virginia\">West Virginia</option>" +
					"<option value=\"Wisconsin\">Wisconsin</option>" +
					"<option value=\"Wyoming\">Wyoming</option>" +
				"</select><br>";

var creditcard = "First Name:<input type=\"text\" name=\"fname\" required><br>" +
			"Last Name:<input type=\"text\" name=\"lname\" required><br>" +
			"Address:<input type=\"text\" name=\"address\" required><br>" +
			"City:<input type=\"text\" name=\"city\" required><br>" +
			"Zip:<input type=\"text\" name=\"zip\" required><br>" +
			"Email Address:<input type=\"text\" name=\"ccemail\" required><br>" +
			"Name on Card:<input type=\"text\" name=\"ccname\" required><br>" +
			"Card Number:<input type=\"text\" name=\"ccnumber\" required><br>" + 
			"<a href=\"https://en.wikipedia.org/wiki/Card_security_code\" target=\"_blank\"> CVV2/CVC</a>:<input type=\"text\" name=\"cvc\" required><br>" +
			statesSelect +
			"Expiry:<input type=\"month\" name=\"expiry\" min=\"2017-01\" max=\"2020-12\" value=\"2019-04\" required><br>";

var paypal = "Email Address:<input type=\"text\" name=\"ppemail\"><br>" +
				"Password:<input type=\"pwd\" name=\"passwd\"><br>";

function testLength(value, length, exactLength){
	if(exactLength){
		if(value.length == length)
			return true;
		else
			return false;
	}
	else{
		if(value.length >= length)
			return true;
		else
			return false;
	}
}

function testNumber(value){
	if(!isNaN(value))
		return true;
	else
		return false;
}

function updateForm(control){
	if(control.value == "creditcard"){
		document.getElementById("paymentinformation").innerHTML = creditcard;
	}
	if(control.value == "paypal"){
		document.getElementById("paymentinformation").innerHTML = paypal;
	}
}

function validateControl(control, name, length){
	var testlen = testLength(control, length);
	var testnum = testNumber(control);
	if(testlen){
		if(testnum)
			return true;
		else{
			alert(name + " is not a number");
			return false;
		}
	}
	else{
		alert(name + " is the incorrect length");
		return false;
	}
}

function validateCreditCard(value){
	var valueNoWS = value.replace(/\s/g, '');

	if(!testNumber(valueNoWS)){
		alert("Credit Card Number is not a number");
		return false;
	}

	switch(valueNoWS.charAt(0)){
		case 3:
			if(!testLength(valueNoWS, 15, true)){
				alert("AmEx number length incorrect");
				return false;
			}
			else
				return true;
		case 4:
			if(!testLength(valueNoWS, 16, true)){
				alert("Visa number length incorrect");
				return false;
			}
			else
				return true;
		case 5:
			if(!testLength(valueNoWS, 16, true)){
				alert("MasterCard number length incorrect");
				return false;
			}
			else
				return true;
		case 6:
			if(!testLength(valueNoWS, 16, true)){
				alert("Discover number length incorrect");
				return false;
			}
			else
				return true;
		default:
			alert("Invalid Credit Card Number type");
			return false;
	}
}

function validateDate(value){
	return false;
}

function validateEmail(value){
	return false;
}

function validateForm(){
	return false;
}

function validatePassword(value, minLength){
	return false;
}

function validateStat(){
	return false;
}
