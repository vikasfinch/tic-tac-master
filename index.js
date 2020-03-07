/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let won = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 4) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    if(won == 0)
    {
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        let newValue = 1;
        if(grid[colIdx][rowIdx] == 0)
        {
            grid[colIdx][rowIdx] = newValue;
            renderMainGrid();
            addClickHandlers();
            var result = checkPlayerWins();
            if(result)
            {
                winner("You");
            }
            else
            {
                onSystemClick();
                $(".decider").empty();
                $(".decider").html("Swapaholic turn.");
            }
        }
    }
}
function onSystemClick() {
    if(won == 0)
    {
        $('.gridTop').css('pointer-events','none');
        let newValue = 4;
        colIdx = getRandomNumber(3);
        rowIdx = getRandomNumber(3);
        if(grid[colIdx][rowIdx] == 0)
        {
            grid[colIdx][rowIdx] = newValue;
            setTimeout(function(){
                renderMainGrid();
                addClickHandlers();
                var result = checkSwapaholicWins();

                if(result)
                {
                    winner("Swapaholic");
                }
                else{
                    $(".decider").empty();
                    $(".decider").html("Your turn.");
                }
                $('.gridTop').css('pointer-events','all');
            }, 2000);
        }
        else
        {
            onSystemClick();
        }
    }
}
function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function getRandomNumber(max){
return Math.floor(Math.random() * Math.floor(max));
}

initializeGrid();
renderMainGrid();
addClickHandlers();

    // Verify User wins
    function checkSwapaholicWins(){
        for(var rows = 0; rows < grid.length; rows++ ) {
            var row_total = 0;
            var column_total = 0;
            
            for(var columns = 0; columns < grid[rows].length; columns++) {
                row_total += grid[rows][columns];
                column_total += grid[columns][rows];
            }
            var diagonal_tl_br = grid[0][0] + grid[1][1] + grid[2][2];
            var diagonal_tr_bl = grid[0][2] + grid[1][1] + grid[2][0];
            if(diagonal_tl_br == 12 || diagonal_tr_bl == 12) {
                return true;
            }
           if(row_total == 12 || column_total == 12) 
           {
                return true;
           }
        }
    }

    // Verify User wins
    function checkPlayerWins(){
        var draw_collection = [];
        
        for(var rows = 0; rows < grid.length; rows++ ) {
            var row_total = 0;
            var column_total = 0;
            
            for(var columns = 0; columns < grid[rows].length; columns++) {
                row_total += grid[rows][columns];
                column_total += grid[columns][rows];
                draw_collection.push(grid[rows][columns]);

            }
            var diagonal_tl_br = grid[0][0] + grid[1][1] + grid[2][2];
            var diagonal_tr_bl = grid[0][2] + grid[1][1] + grid[2][0];
            if(diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
                return true;
            }
           if(row_total == 3 || column_total == 3) 
           {
                return true;
           }
        }
        var n = draw_collection.includes(0);
        if(!n)
        {
            $(".decider").empty();
            setTimeout(function(){
                $(".gridTop").fadeOut();
                setTimeout(function(){
                        $(".childBottom").html("Match Draw").fadeIn();
                        $(".childBottom").css("color", "red").fadeIn();
                        $(".decider").empty();
                    },1000);
                 },1000);
        }
    }

    function winner(wons)
    {
        won = 1;
        $(".decider").empty();
        setTimeout(function(){
            $(".gridTop").fadeOut();
            setTimeout(function(){
                    $(".childBottom").html(wons + " won the match.").fadeIn();
                    $(".decider").empty();
                },1000);
             },1000);
    }
