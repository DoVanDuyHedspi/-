

// ... and we solve it!!
// solve(sudoku);
// showSudoku(solve(sudoku));
// given a sudoku cell, returns the row
var grid = new Array();
makeNewGame();
function returnRow(cell) {
	return Math.floor(cell / 9);
}

// given a sudoku cell, returns the column
function returnCol(cell) {
	return cell % 9;
}

// given a sudoku cell, returns the 3x3 block
function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

// given a number, a row and a sudoku, returns true if the number can be placed in the row
function isPossibleRow(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock(number,block,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}

// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber(cell,number,sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}

// given a row and a sudoku, returns true if it's a legal row
function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}

// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}

// given a 3x3 block and a sudoku, returns true if it's a legal block 
function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}

// given a sudoku, returns true if the sudoku is solved
function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}

// given an array of possible values assignable to a cell, returns a random value picked from the array
function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}

// given a sudoku, returns a two dimension array with all possible values 
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}

// given an array and a number, removes the number from the array
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

// given a sudoku, solves it
function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	var nextMove;
	var whatToTry;
	var attempt;
	var i=0;
	while (!isSolvedSudoku(sudoku)) {
		i++;
		nextMove = scanSudokuForUnique(sudoku);
		if (nextMove == false) {
			nextMove = saved.pop();
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove,whatToTry);
		if (nextMove[whatToTry].length>1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
	let newSudoku = new Array();
	newSudoku = sudoku.slice();
	console.log(i);
	return newSudoku;

	// showSudoku(sudoku)
}
function sleep(time){
	return new Promise(function(resolve){
		setTimeout(resolve,time);
	})
}
function showAll(sudoku){
	for(let i=0;i<=80;i++){	
			let x=document.getElementById(`cell-${i}`);
			x.value = sudoku[i];
			if(!x.hasAttribute("disabled")){
				x.style.background = "white";
				// await sleep(500);
				// await setTimeout(function(){alert('hihi')},500);	
			}else{
				x.style.background = "rgb(235, 235, 228)";
			}
			
					
	}
}
var flag = 0;
var currentCell = 0;
async function solveStepByStep(sudoku){
	let time = document.getElementById('time').value;
	if(time == ''){
		time = 500;
	}
	for(let i=currentCell;i<=80;i++){	
			
			if(flag==1){
				break;
			}
			let x=document.getElementById(`cell-${i}`);
			x.value = sudoku[i];
			if(!x.hasAttribute("disabled")){
				x.style.background = "white";
				await sleep(time);
				 // setTimeout(await function(){console.log('test');},500);	
			}else{
				x.style.background = "rgb(235, 235, 228)";
			}
			currentCell++;
			
					
	}
}
document.getElementById('solveStepByStep').addEventListener('click',function(event){
	flag=0;
	solveStepByStep(grid);
	event.target.parentElement.classList.add('d-none');
	document.getElementById('stopStepByStep').parentElement.classList.remove('d-none');
});
document.getElementById('stopStepByStep').addEventListener('click',function(event){
	event.target.parentElement.classList.add('d-none');
	document.getElementById('solveStepByStep').parentElement.classList.remove('d-none');
	flag=1;
});
function showNewGame(grid,array){
	flag=1;
	currentCell=0;
	for(let i=0;i<=80;i++){		
		let x=document.getElementById(`cell-${i}`);
		x.value = '';	
		x.removeAttribute("disabled");
		x.style.color= "rgb(84,84,84)";
		x.style.background = "white";

	}
	for(let i=0;i<=80;i++){
		var x=document.getElementById(`cell-${i}`);
		if(array.includes(i)){
			x.value = grid[i];
			x.setAttribute("disabled","true");
			x.style.background = "rgb(235, 235, 228)";
		}
	}
}
// function solve(){	
// 	solve(sudoku);
// }
function search(number){
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			let z=j+i*9;
			let x=document.getElementById(`cell-${z}`);
			x.style.color= "rgb(84,84,84)";
			if(x.value == number){
				x.style.color = "red";
			}
			
		}
	}
}
function exitSearch(){
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			let z=j+i*9;
			let x=document.getElementById(`cell-${z}`);
			x.style.color= "rgb(84,84,84)";
		}
	}
}
setInterval(function(){ 
	let list = document.getElementsByName('checkNumber');
	for(let i=0;i<list.length;i++){
		if(list[i].classList.contains('active')){
			let number = i+1;
			search(number);
		}
	}
 }, 100);
function makeNewGame(){
	document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">'+
				  'Chào mừng bạn đến với trò chơi Sudoku. Hãy bắt đầu bằng việc chọn mức độ chơi và bắt đầu game mới nhé.'+
				'</div>';
	var sudoku = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);	
	grid = solve(sudoku);
	var showCell = new Array();
	let i=0;
	let x = document.getElementById("level");
	let n;
	if(x.value==3){
		n=20;
	}else if(x.value==2){
		n=26;
	}else {
		n=35;
	}
	console.log(n);
	while(i<n){
		let x=Math.floor((Math.random() * 80));
		if(!showCell.includes(x)){
			showCell.push(x);
			i++;
		}
	}
	showNewGame(grid,showCell);
	console.log(grid);
}
function showSudoku(){
	showAll(grid);
}
function check() {
	let check = 0;
	for(let i=0;i<=80;i++){		
		let x=document.getElementById(`cell-${i}`);		
		if(x.value != grid[i]){
			x.style.background = "#FFA3A1";
			check = 1;
		} else {
			if(!x.hasAttribute("disabled")){
				x.style.background = "white";
			}
			
		}			
	}
	if(check == 0){
		document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">'+
				  'Bạn làm tốt lắm'+
				'</div>';
	}else{
		document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">'+
				  'Bạn đã giải sai. Hãy tiếp tục cố gắng nhé.'+
				'</div>';
	}
}