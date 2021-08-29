// Declared variables
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");
var highScore = document.querySelector("#highScore");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage  : need to figure out 

// Button/Event listener to call main/index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});
