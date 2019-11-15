<?php
require_once '/home/common/mail.php'; // Add email functionality
require_once '/home/common/dbInterface.php'; // Add database functionality
processPageRequest(); // Call the processPageRequest() function
function processPageRequest()
{
    session_destroy();
    if (!empty($_POST) && isset($_POST["action"])) {
        switch ($_POST["action"]) {
            case "create":
                createAccount($_POST["username"], $_POST["password"], $_POST["name"], $_POST["email"]);
                break;
            case "forgot":
                sendForgotPasswordEmail($_POST["username"]);
                break;
            case "login":
                authenticateUser($_POST["username"], $_POST["password"]);
                break;
            case "reset":
                resetPassword($_POST["user_id"], $_POST["password"]);
                break;
        }
    } elseif (!empty($_GET) && $_GET["form"]=== 'validate') {
        validateAccount($_GET["user_id"]);
    } elseif (!empty($_GET) && isset($_GET["form"])) {
        switch ($_GET["form"]) {
            case "create":
                displayCreateAccountForm();
                break;
            case "forgot":
                displayForgotPasswordForm();
                break;
            case "reset":
                displayResetPasswordForm($_GET["user_id"]);
                break;
            case "logon":
                displayLoginForm("Email of Cart with Receipt was sent :)");
        }
    } else {
        displayLoginForm("");
    }
}

function displayLoginForm($message = "")
{
    require_once("templates/logon_form.html");
}

function authenticateUser($username, $password)
{
    $creds = validateUser($username, $password);

    if (!empty($creds)) {
        session_start();
        $_SESSION["user_id"] = $creds[0];
        $_SESSION["displayName"] = $creds[1];
        $_SESSION["email"] = $creds[2];
        header("Location: ./index.php");
        exit();
    } else {
        $bad = "Error Not the Correct Login";
        displayLoginForm($bad);
    }
}

function createAccount($username, $password, $displayName, $emailAddress)
{
    $userid = addUser($username, $password, $displayName, $emailAddress);
    if ($userid > 0) {
        sendValidationEmail($userid, $displayName, $emailAddress);
    } else {
        displayLoginForm("Error User Already Exist");
    }
}

function displayCreateAccountForm()
{
    require_once 'templates/create_form.html';
}

function displayForgotPasswordForm()
{
    require_once 'templates/forgot_form.html';
}

function displayResetPasswordForm($userId)
{
    require_once 'templates/reset_form.html';
}

function resetPassword($userId, $password)
{
    $checking = resetUserPassword($userId, $password);
    if ($checking) {
        displayLoginForm("Password has been Updated :)");
    } else {
        displayLoginForm("Either User Does Not Exist or Password is the Currrent Passowrd");
    }
}

function sendForgotPasswordEmail($username)
{
    $usData = getUserData($username);
    if (!empty($usData)) {
        $name = $usData["DisplayName"];
        $address = $usData["Email"];
        ob_start();
        $id = $usData["ID"];
        echo "<h2> myMovie Xpress<h2>";
        echo "<br>";
        echo "Hello ", $usData["DisplayName"];
        echo "<br>";
        echo "You clicked the forgot password link, please click on the link below in order to change the old password to a new one.";
        echo "<br>";
        echo "<a href='http://139.62.210.181/~cr470093/project5/logon.php?form=reset&user_id=" . $id . "'>Reset Password</a>";
        echo "<br>Thank You";
        $tmp = ob_get_contents();
        ob_end_clean();
        $checker = sendMail(750270466, $address, $name, "Reset Password for AccountName " . $name, $tmp);
        if ($checker > 0) {
            echo "You have " . $checker . " seconds left before email can be sent";
        } elseif ($checker < 0) {
            echo "Error occured in email";
        } else {
            echo "Reset Email has been sent";
        }
    } else {
        echo "username does not exist in Database";
    }
}

function sendValidationEmail($userId, $displayName, $emailAddress)
{
    ob_start();
    echo "<h2> myMovie Xpress<h2>";
    echo "<br>";
    echo "Hello ", $displayName;
    echo "<br>";
    echo "Hello welcome to myMovies Xpress, please click the link to validate the email and start the account";
    echo "<br>";
    echo "<a href='http://139.62.210.181/~cr470093/project5/logon.php?form=validate&user_id=" . $userId . "'>Validate Account</a>";
    echo "<br>Thank You";
    $tmp = ob_get_contents();
    ob_end_clean();
    $checker = sendMail(750270466, $emailAddress, $displayName, "myMovies! Account Validation", $tmp);
    if ($checker > 0) {
        echo "You have " . $checker . " seconds left before email can be sent";
    } elseif ($checker < 0) {
        echo "Error occured in email";
    } else {
        echo "Validation Email has been sent";
    }
}

function validateAccount($userId)
{
    $checks = activateAccount($userId);
    if ($checks) {
        displayLoginForm("Account has been Activated :)");
    } else {
        displayLoginForm("Account does not exist or Failed to Activate");
    }
}