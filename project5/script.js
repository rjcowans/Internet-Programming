function confirmLogOut(){
    let gank = confirm("About to Log Off :/ Are you Really going to Go?");
    if (gank){
        window.location.replace("./logon.php?action=logoff");
        return true;
    }
    return false;
}

function confirmRemove(title,id){
    let gank = confirm("Your about to Remove the movie: " + title + ". Please Confirm Sire" );
    if (gank){
        window.location.replace("./index.php?action=remove&movie_id=" + id);
        return true;
    }
    return false;

}

function confirmCheckout() {
    let gank = confirm("About to CheckOut These Movies :) Please Confirm");
    if (gank){
        window.location.replace("./index.php?action=checkout");
        return true;
    }
    return false;
}

function addMovie(movie_id) {
    window.location.replace("./index.php?action=add&movie_id=" + movie_id);
    return true;
}

function confirmCancel(form) {
    let gank = confirm("oof your Canceling the job of " + form + ". Are you sure?");
    if (gank){
            if (form === 'search') {
                window.location.replace("./index.php");
            }else {
                window.location.replace("./logon.php");
            }
            return true;
    }
    return false;
}

function validateCreateAccountForm() {
    let email =document.getElementById('email').value;
    let confirmedemail =document.getElementById('confirmedemail').value;
    let confirmedpassword =document.getElementById('confirmedpassword').value;
    let password =document.getElementById('password').value;
    let allinputs = [].map.call(document.getElementsByTagName("input"), l => l);
    allinputs.shift();
    let check=false;
    let spotter = "";
    for (let i = 0; i < allinputs.length; i++) {
        if(allinputs[i].value.search(/\s+/) !== -1){
            check = true;
            switch (i) {
                case 0:
                    spotter = "Email";
                    break;
                case 1:
                    spotter= "Confirm Email";
                    break;
                case 2:
                    spotter="Username";
                    break;
                case 3:
                    spotter = "Password";
                    break;
                case 4:
                    spotter = "Confirm Password";
                    break;
            }
            break;
        }
    }
    if(check){
        alert("Hello Captain there is a space in " + spotter + " field. Must remove before we can move forward");
        return false;
    }
    if (email !== confirmedemail){
        alert("Emails are not the Same, Try again");
        return false;
    }
    if (password !== confirmedpassword) {
        alert("Passwords Are not the Same, Try again");
        return false;
    }
        return true;
}

function validateResetPasswordForm(){
    let password =document.getElementById('password').value;
    let confirmedpassword =document.getElementById('confirmedpassword').value;

    if (password.includes(" ") || confirmedpassword.includes(" ")){
    alert("Password include the Space They can not be There");
    return false;
    }
    if (password !== confirmedpassword){
        alert("Passwords Are not the Same, Can not Push Forward");
        return false;
    }
    return true;
}

function changeMovieDisplay(){
    let selection = Number(document.getElementById('select_order').value);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        document.getElementById("shopping_cart").innerHTML= this.responseText;
    };
    xmlhttp.open("GET", "./index.php?action=update&order=" + selection, true);
    xmlhttp.send();
}

function displayMovieInformation(movie_id){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        document.getElementById("modalWindowContent").innerHTML= this.responseText;
        showModalWindow();
    };
    xmlhttp.open("GET", "./movieinfo.php?movie_id=" + movie_id, true);
    xmlhttp.send();

}

function forgotPassword() {
    window.location.replace("./logon.php?action=forgot");
    return true;
}

function showModalWindow()
    {
        var modal = document.getElementById('modalWindow');
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function()
        {
            modal.style.display = "none";
        }

        window.onclick = function(event)
        {
            if (event.target == modal)
            {
                modal.style.display = "none";
            }
        }

        modal.style.display = "block";
    }
