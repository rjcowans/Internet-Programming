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

