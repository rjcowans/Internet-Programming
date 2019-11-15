<?php
session_start(); // Connect to the existing session
processPageRequest(); // Call the processPageRequest() function
function displaySearchForm()
{
    require_once("templates/search_form.html");
}

function displaySearchResults($searchString)
{
    $results = file_get_contents('http://www.omdbapi.com/?apikey=9c01fdf8&s=' . urlencode($searchString) . '&type=movie&r=json');
    $array = json_decode($results, true)["Search"];
    require_once("templates/results_form.html");
}

function processPageRequest()
{
    if (!isset($_SESSION["displayName"])){
        header("Location: ./logon.php");
    }
    $amount = count($_POST);
    if ($amount === 0) {
        displaySearchForm();
    } else {
        displaySearchResults($_POST["search"]);
    }
}

function results($search)
{
    echo "<br>";
    echo "<table>";
    echo "<th>Poster</th><th>Title(year)</th><th>Add</th>";
    for ($i = 0; $i < count($search); $i++) {
        $parts = $search[$i];
        $test2 = $parts["imdbID"];
        $test=addslashes($parts["Title"]);
        echo "<tr>";
        echo "<td style='width: 100px'><img src=\"" . $parts["Poster"] . "\" alt=\'" . $parts["Title"] . "_DO_NOT_HAVE_POSTER\' height='100'></td>";
        echo "<td> <a href=\"https://www.imdb.com/title/" . $parts["imdbID"] . "/\" target=\"_blank\">" .$test  . "(" . $parts["Year"] . ")" . "</a></td>";
        echo "<td><button class='p4B' onclick=\"addMovie('$test2');\">+</button></td>";
        echo "</tr>";
    }
    echo "</table>";
}
