<?php
processPageRequest();
function processPageRequest(){
    session_destroy();
    if ($_POST["username"]!=="" && $_POST["password"]!=="" && count($_POST) !== 0 ){
        authenticateUser($_POST["username"],$_POST["password"]);
    }else{
        displayLoginForm("");
    }
}

function displayLoginForm($message=""){
    require_once("template/logon_form.html");
}

function authenticateUser($username, $password)
{
    $file = fopen("./data/credentials.db", "r");
    $creds = explode(",", fread($file, filesize("./data/credentials.db")));
    if (trim($username) === $creds[0] && trim($password) === $creds[1]) {
        session_start();
        $_SESSION["displayName"] = $creds[2];
        $_SESSION["email"] = $creds[3];
        header("Location: ./index.php");
        exit();
    } else {
        $bad = "Error Not the Correct Login";
        displayLoginForm($bad);
    }
}






