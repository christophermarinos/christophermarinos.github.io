$(function() {
var backgroundColor = "red";
$("ul").append(backgroundColor);
var findme = $("ul").find("li");
findme.css({"background-color": "#c5a996", "font-size": "200%","text-shadow": "none","color": "black","border": "1px solid #ffffff","font-family": "Georgia"});
});