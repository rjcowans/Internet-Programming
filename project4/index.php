<?php
session_start();
require_once('/home/common/mail.php');
processPageRequest();
function addMovieToCart($movieID)
{
    $movieValues = readMovieData();
    $toWrite = array();
    for ($i = 0; $i < count($movieValues); $i++) {
        array_push($toWrite, $movieValues[$i]);
    }
    array_push($toWrite, $movieID);
    writeMovieData($toWrite);
    displayCart();
}

function checkout($name, $address)
{
    $gank = apiCall2();
    $result = sendMail(750270466, $address, $name, "Your myMovies Receipt :)", $gank);
    if ($result === 0) {
        echo"Email Sent :)";
    } elseif ($result > 0){
        echo "There is $result second left before email can be sent again";
    } elseif (($result === -1) || (($result === -3))) {
        echo "Error has Occurred Please Try again";
    } else {
        echo "Invalid Email";
    }
}

function displayCart()
{
    $movieValues = readMovieData();
    /* functional stuff woo */
    require_once('template/cart_form.html');
}

function processPageRequest()
{
    if (!isset($_GET["action"])) {
        displayCart();
    } elseif ($_GET["action"] === "add") {
        addMovieToCart($_GET["movie_id"]);
    } elseif ($_GET["action"] === "checkout") {
        checkout($_SESSION["displayName"], $_SESSION["email"]);
    } elseif ($_GET["action"] === "remove") {
        removeMovieFromCart($_GET["movie_id"]);
    }
    displayCart();
}

function readMovieData()
{
    $file = fopen("./data/cart.db", "r");
    $array = explode(",", fread($file, filesize("./data/cart.db")));
    clearstatcache();
    return ($array);
}

function removeMovieFromCart($movieID)
{
    $movieValues = readMovieData();
    $toWrite = array();
    for ($i = 0; $i < count($movieValues); $i++) {
        if ($movieValues[$i] !== $movieID) {
            array_push($toWrite, $movieValues[$i]);
        }
    }
    writeMovieData($toWrite);
    displayCart();
}

function writeMovieData($oldarray)
{
    $array = array_unique(array_filter($oldarray, 'strlen'));
    $file = fopen("./data/cart.db", "w");
    clearstatcache();
    for ($i = 0; $i < count($array); $i++) {
        if ($i != (count($array) - 1)) {
            fwrite($file, $array[$i]);
            fwrite($file, ",");
        } else {
            fwrite($file, $array[$i]);
        }
    }
    fclose($file);
}

function apiCall($movieValues)
{
    $newMovies = array_filter($movieValues, 'strlen');
    $amount = sizeof($newMovies);
    $finalArray = array();
    if ($amount !== 0) {
        echo nl2br("$amount Movies in your Shopping Cart\n");
        for ($i = 0; $i < $amount; $i++) {
            $movies = file_get_contents('http://www.omdbapi.com/?apikey=9c01fdf8&i=' . $newMovies[$i] . '&type=movie&r=json');
            $array = json_decode($movies, true);
            array_push($finalArray, $array);
        }
        echo "<br>";
        echo "<table>";
        echo "<th>Poster</th><th>Title(year)</th><th>Remove</th>";
        foreach ($finalArray as $parts) {
            $test1 = addslashes($parts["Title"]);
            $test2 = $parts["imdbID"];
            echo "<tr>";
            echo "<td style='width: 100px'><img src=\"" . $parts["Poster"] . "\" alt=\'" . $test1 . "_NO_POSTER\' height='100'></td>";
            echo "<td><a href=\"https://www.imdb.com/title/" . $parts["imdbID"] . "/\" target=\"_blank\">" . $test1 . "(" . $parts["Year"] . ")" . "</a></td>";
            echo "<td><button id='p4B' onclick=\"confirmRemove('$test1','$test2');\">X</button></td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "Add Some Movies to Your Cart";
    }
}

function apiCall2()
{
    ob_start();
    $movieValues = readMovieData();
    $newMovies = array_filter($movieValues, 'strlen');
    $amount = sizeof($newMovies);
    $finalArray = array();
    echo nl2br("THANK FOR THE PURCHASE :)\n");
    if ($amount !== 0) {
        echo nl2br("$amount Movies in your Shopping Cart\n");
        for ($i = 0; $i < $amount; $i++) {
            $movies = file_get_contents('http://www.omdbapi.com/?apikey=9c01fdf8&i=' . $newMovies[$i] . '&type=movie&r=json');
            $array = json_decode($movies, true);
            array_push($finalArray, $array);
        }
        echo "<br>";
        echo "<table>";
        echo "<th>Poster</th><th>Title(year)</th>";
        foreach ($finalArray as $parts) {
            $test1 = addslashes($parts["Title"]);
            echo "<tr>";
            echo "<td><img src=\"" . $parts["Poster"] . "\" alt=\'" . $parts["imdbID"] . "\' height='100'></td>";
            echo "<td> <a href=\"https://www.imdb.com/title/" . $parts["imdbID"] . "/\" target=\"_blank\">" . $test1 . "(" . $parts["Year"] . ")" . "</a></td>";
        }
        echo "</table>";
    } else {
        echo "0 Movies to Your Shopping Cart";
    }
    $tmp = ob_get_contents();
    ob_end_clean();
    return $tmp;
}
