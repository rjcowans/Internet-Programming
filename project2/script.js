function updateForm() {
    if (document.getElementById('credit').checked) {
        document.getElementById('credit').setAttribute("checked","");
        document.getElementById('apps').removeAttribute('checked');
        document.getElementById('payp').style.display = 'none';
        document.getElementById('creditcard').style.display = 'block';
        let g = document.getElementsByTagName('input').length;
        for (i = 0; i < g; i++) {
            let b = document.getElementsByTagName("input")[i];
            if (b.id.startsWith('c')) {
                if (b.id.endsWith('r')) {
                    b.setAttribute("required", "");
                }
            } else if (b.id.startsWith('p')) {
                b.removeAttribute("required");
            }
        }
    } else if (document.getElementById('apps').checked) {
        document.getElementById('apps').setAttribute("checked","");
        document.getElementById('credit').removeAttribute('checked');
        document.getElementById('payp').style.display = 'block';
        document.getElementById('creditcard').style.display = 'none';
        let g =document.getElementsByTagName('input').length;
        for (i = 0; i <g ; i++) {
            let b=document.getElementsByTagName("input")[i];
            if (b.id.startsWith('p')){
                b.setAttribute("required","");
            }else if (b.id.startsWith('c')){
                b.removeAttribute("required");
            }
        }
    }
}

function testLength(value,length,exactlength) {
    let test = value.length;
    if (exactlength) {
        return test === length;
    }else{
        return value.length >= length;
    }
}

function testNumber(value) {
    var patt = /[^\d]/i;
    return !patt.test(value);
}

function validateControl(control,name,length) {
    if (name.toString() === "Zip"){
        if (!(testLength(control,length,true))) {
            alert("Not Proper  Length for Zip 5 only");
            return false;
        }
        if (!(testNumber(control))){
            alert("Not a Number in " + name + " field");
            return false
        }
        return true
    }else if (name.toString() === "CVC"){
        if (!(testLength(control,length,true))) {
            alert("Not Proper  Length for CVC 3 only");
            return false;
        }
        if (!(testNumber(control))){
            alert("Not a Number in " + name + " field");
            return false
        }
        return true
    }else{
        if (!(testLength(control,length,false))) {
            alert("Not Proper  Length for String in field " +name+  " needs to be more than " + length);
            return false;
        }
        return true
    }
}

function validateCreditCard(value) {
    let newvalue;
    newvalue = value.replace(/ /g, '');
    let check;
    let toprint;
    if (newvalue.startsWith('3')){
        check=testLength(newvalue,15,true);
        toprint='AmEx'
    }else if (newvalue.startsWith('6')){
        check=testLength(newvalue,16,true);
        toprint='Discover'
    }else if (newvalue.startsWith('5')){
        check=testLength(newvalue,16,true);
        toprint='MasterCard'
    }else if (newvalue.startsWith('4')){
        check=testLength(newvalue,16,true);
        toprint='Visa'
    }else{
        alert("Not a Valid Credit Number");
        return false
    }
    if (!check){
        alert("Not a Valid " +toprint+ " Credit Card Length was Wrong");
        return false
    }
    if (!testNumber(newvalue)){
        alert("The credit characters are not Numbers");
        return false
    }
    return true
}

function validateDate(value) {
    let currentDate = new Date();
    let m = currentDate.getMonth() + 1;
    let y = currentDate.getFullYear();
    let ny = value.substring(0,4);
    let nm = value.substring(6,value.length);
    if ((nm > m && ny >= y) || ny > y){
        alert("Not a Valid Expiration Date");
        return false
    }else{
        return true
    }
}

function validateEmail(value){
    var patt = /^[A-Za-z0-9+.]+@[A-Za-z0-9+.]+\.[A-Za-z0-9-_]+$/i;
    if (patt.test(value)){
        return true
    }else{
        alert("Not a Valid Email in Email Field");
        return false
    }
}

function validatePassword(value,minLength) {
    if (testLength(value,minLength,false)){
        return true
    }else{
        alert("Not Proper Password Try Again");
        return false
    }
}

function validateState() {
    let bomo = document.getElementById('stat');
    let bo = bomo.options[bomo.selectedIndex].value;
    if (bo === "Select State"){
        alert("Error: State Not Chosen");
        return false
    }else{
        return true
    }
}

function validateForm() {
   if (document.getElementById('credit').checked){
       if (!(validateControl(document.getElementById('cc1r').value.toString(),"First",1))){
           return false
       }
       if (!(validateControl(document.getElementById('cc2r').value.toString(),"Last",1))){
           return false
       }
       if (!(validateCreditCard(document.getElementById('cc3r').value.toString()))){
           return false
       }
       if (!(validateControl(document.getElementById('cc4r').value.toString(),"Card",1))){
           return false
       }
       if (!(validateDate(document.getElementById('cc10r').value.toString()))){
           return false
       }
       if (!(validateControl(document.getElementById('cc5r').value.toString(),"CVC",3))){
           return false
       }
       if (!(validateControl(document.getElementById('cc6r').value.toString(),"Add",1))){
           return false
       }
       if (!(validateControl(document.getElementById('cc7r').value.toString(),"City",1))){
           return false
       }
       if (!(validateState())){
           return false
       }
       if (!(validateControl(document.getElementById('cc8r').value,"Zip",5))){
           return false
       }
       if (!(validateEmail(document.getElementById('cc9r').value.toString()))){
           return false
       }
       alert("Payment Submitted");
       return false

   }else if (document.getElementById('apps').checked) {
       if (!(validateEmail(document.getElementById('paL1').value.toString()))){
           return false
       }
       if (!(validatePassword(document.getElementById('pal2').value.toString(),8))){
           return false
       }
       alert("Payment Submited");
       return false

   }

}
