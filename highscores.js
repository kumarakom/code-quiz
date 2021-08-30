// Declared variables
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");
var highScore = document.querySelector("#highScore");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        // Grab allScores from localstorage to display as list element 
        var createLi = document.createElement("li");
        createLi.textContent = [i + 1] + ". " + allScores[i].initials + " - " + allScores[i].timeScore;
        highScore.appendChild(createLi);
    }
}
// Button/Event listener to call main/index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

/*      To solve later 
   Problem with scripts in js folder 
Ideally would like to place all javascript files in a folder
Example : 
- Tried to place all Javascript files under js/ folder as 
  js/script.js
  js/highscores.js 
  index.html
  highscores.html 

  Even updated code to call with proper path, but the buttons did not execute :
  - Have to figure out later, found the below 
  - https://stackoverflow.com/questions/54621917/call-javascript-function-from-html-in-different-locations
 ?? 
Come back to make this better 
*/
