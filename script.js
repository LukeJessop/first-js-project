
//////
var arr = [];
for (var rows = 0; rows < 17; rows++) {
    for (var columns = 0; columns < 17; columns++) {
        arr[rows] = [];
    };
};
//////



var cells = 6;
var characterPosition = "";

// seperator between x and y values in each grid spaces id
var sep = "_";


function createGrid() {
    for (var rows = 0; rows < cells; rows++) {
        for (var columns = 0; columns < cells; columns++) {
            $("#container").append("<div id='"+toTally(rows)+sep+toTally(columns)+"' class='grid' ></div>");
            $(".grid").width(960/cells);
            $(".grid").height(960/cells);
        };
    };
    // drawWalls();
    drawCharacter();
};


function clearGrid(){
    $(".grid").remove();
};


function refreshGrid(){
    clearGrid();
    createGrid();
};



function toTally(num){
    var tally = "";
    for(i=0; i<num; i++)
    {
        tally += "i";
    }
    return tally;
};

function drawWalls(){
    // draws a random wall
    $(".grid").ready(function() {
        var x = Math.floor(Math.random() * cells);
        var y = Math.floor(Math.random() * cells);
        $("#"+toTally(x)+sep+toTally(y)).css("background-color", "black");
    });
};


function drawCharacter(){
    $("#"+toTally(Math.floor(cells * .5))+sep+toTally(Math.floor(cells * .5))).css("background-color", "red");
    findCharacter();
};

function findCharacter(){
    for (var x = 0; x < cells; x++) {
        for (var y = 0; y < cells; y++) {
            var element = document.querySelector('#'+toTally(x)+sep+toTally(y));
            var style = getComputedStyle(element);
            var color = style.backgroundColor;

            if (color=="rgb(255, 0, 0)"){
                characterPosition = "#"+toTally(x)+sep+toTally(y);
                return "#"+toTally(x)+sep+toTally(y);
            };
        };
    };
};


function checkDirection(direction){

    var coordinate = characterPosition;

    /// LEFT SPACE CHECK ///
    if (direction=="left") {
        var newCoordinate = coordinate.substring(0,coordinate.length-1);

        if (isInvalidCoord(newCoordinate)){return false;}

        var element = document.querySelector(newCoordinate);
        var style = getComputedStyle(element);
        var color = style.backgroundColor;
        if (color=="rgb(0, 0, 0)"){return false;};

    };

    /// RIGHT SPACE CHECK ///
    if (direction=="right") {
        var newCoordinate = coordinate.concat("i");

        if (isInvalidCoord(newCoordinate)){return false;}

        var element = document.querySelector(newCoordinate);
        var style = getComputedStyle(element);
        var color = style.backgroundColor;
        if (color=="rgb(0, 0, 0)"){return false;};
    };

    /// UP SPACE CHECK ///
    if (direction=="up") {
        var coordBackHalf = coordinate.substring(coordinate.indexOf(sep));
        var newCoordinate = coordinate.substring(0, coordinate.indexOf(sep)-1).concat(coordBackHalf);

        if (isInvalidCoord(newCoordinate)){return false;}

        var element = document.querySelector(newCoordinate);
        var style = getComputedStyle(element);
        var color = style.backgroundColor;
        if (color=="rgb(0, 0, 0)"){return false;};
    };

    /// DOWN SPACE CHECK ///
    if (direction=="down") {
        var coordBackHalf = coordinate.substring(coordinate.indexOf(sep));
        var newCoordinate = coordinate.substring(0, coordinate.indexOf(sep)).concat("i").concat(coordBackHalf);

        if (isInvalidCoord(newCoordinate)){return false;}

        var element = document.querySelector(newCoordinate);
        var style = getComputedStyle(element);
        var color = style.backgroundColor;
        if (color=="rgb(0, 0, 0)"){return false;};
    };

    return true;
};

// prevents character from moving off screen (crashing)
function isInvalidCoord(string){
    // bottom
    if (string.substring(1, string.indexOf(sep)).length>cells-1)
    {return true;}

    // right
    if (string.substring(string.indexOf(sep)+1).length>cells-1)
    {return true;}

    // top and left
    if (string.includes("#") && string.includes(sep))
    {return false;};

    return true;
};


// findCharacter() must be called before once this function is ever used
// (findCharacter() is automatically called in drawCharacter)
function moveCharacter(direction){

    var coordinate = findCharacter();
    // smart character find?
    console.log(characterPosition);

    if (direction=="left") {
        if (checkDirection("left")){
            var newCoordinate = coordinate.substring(0,coordinate.length-1);
            
            $(newCoordinate).css("background-color", "red");
            $(coordinate).css("background-color", "none"); //old position
        }
    };
    if (direction=="right") {
        if (checkDirection("right")){
            var newCoordinate = coordinate.concat("i");

            $(newCoordinate).css("background-color", "red");
            $(coordinate).css("background-color", "none"); //old position
        }
    };
    if (direction=="up") {
        if (checkDirection("up")){
            var coordBackHalf = coordinate.substring(coordinate.indexOf(sep));
            var newCoordinate = coordinate.substring(0, coordinate.indexOf(sep)-1).concat(coordBackHalf);

            $(newCoordinate).css("background-color", "red");
            $(coordinate).css("background-color", "none"); //old position
        }
    };
    if (direction=="down") {
        if (checkDirection("down")){
            var coordBackHalf = coordinate.substring(coordinate.indexOf(sep));
            var newCoordinate = coordinate.substring(0, coordinate.indexOf(sep)).concat("i").concat(coordBackHalf);

            $(newCoordinate).css("background-color", "red");
            $(coordinate).css("background-color", "none"); //old position
        }
    };
};

// document load
$(document).ready(function() {

    document.addEventListener('keydown', (e) => {
        if (e.code === "ArrowUp") {
            moveCharacter("up");
        }
        if (e.code === "ArrowDown") {
            moveCharacter("down");
        }
        if (e.code === "ArrowLeft") {
            moveCharacter("left");
        }
        if (e.code === "ArrowRight") {
            moveCharacter("right");
        }
    });

    createGrid();
});
