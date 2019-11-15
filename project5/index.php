<?php
session_start(); // Connect to the existing session
require_once '/home/common/mail.php'; // Add email functionality
require_once '/home/common/dbInterface.php'; // Add database functionality
processPageRequest(); // Call the processPageRequest() function
function addMovieToCart($movieID)
{
    $databaseID = movieExistsInDB($movieID);
    if ($databaseID === 0){
        $movies = file_get_contents('http://www.omdbapi.com/?apikey=9c01fdf8&i=' . $movieID . '&type=movie&r=json');
        $array = json_decode($movies, true);
        $newDBID = addMovie($array["imdbID"],$array["Title"],$array["Year"],$array["Rated"],$array["Runtime"],$array["Genre"],$array["Actors"],$array["Director"],$array["Writer"],$array["Plot"],$array["Poster"]);
        $movieArr = addMovieToShoppingCart($_SESSION["user_id"],$newDBID);
    }else{
        $movieArr = addMovieToShoppingCart($_SESSION["user_id"],$databaseID);
    }
     echo displayCart(false);
}

function checkout($name, $address)
{
    $gank = displayCart(true);
    $result = sendMail(750270466, $address, $name, "Your myMovies Receipt :)", $gank);
    if ($result === 0) {
        header("Location: ./logon.php?form=logon");
    } elseif ($result > 0){
        echo "There is ".$result." second left before email can be sent again";
    } elseif (($result === -1) || (($result === -3))) {
        echo "Error has Occurred Please try again";
    } else {
        echo "Invalid Email";
    }
}

function createMovieList($forEmail=false){

    $toReturn = null;
    if (isset($_SESSION["order"])){
        $toReturn = getMoviesInCart($_SESSION["user_id"],$_SESSION["order"]);
    }else{
        $toReturn = getMoviesInCart($_SESSION["user_id"]);
    }
    ob_start(); // Create an output buffer
    require_once './templates/movie_list.html';
    $message = ob_get_contents(); // Get the contents of the output buffer
    ob_end_clean(); // Clear the output buffer
    return $message;
}

function displayCart($forEmail=false)
{
    $counter = countMoviesInCart($_SESSION["user_id"]);
    $message2 = createMovieList($forEmail);
    ob_start(); // Create an output buffer
    require_once './templates/cart_form.html';
    $message = ob_get_contents(); // Get the contents of the output buffer
    ob_end_clean(); // Clear the output buffer
    return $message;
}

function processPageRequest()
{

    if (!isset($_SESSION["displayName"])){
        header("Location: ./logon.php");
    }
    if (!isset($_GET["action"])) {
        echo displayCart(false);
    } elseif ($_GET["action"] === "add") {
        addMovieToCart($_GET["movie_id"]);
    } elseif ($_GET["action"] === "checkout") {
        checkout($_SESSION["displayName"], $_SESSION["email"]);
    } elseif ($_GET["action"] === "remove") {
        removeMovieFromCart($_GET["movie_id"]);
        echo displayCart(false);
    }elseif ($_GET["action"] === "update"){
        updateMovieListing($_GET["order"]);
    }

}


function removeMovieFromCart($movieID)
{
    $test = removeMovieFromShoppingCart($_SESSION["user_id"],$movieID);
}


function updateMovieListing($order)
{
    $_SESSION["order"] = $order;
    $message = createMovieList(false);
    echo $message;
}




