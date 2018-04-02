var grid = [
	    [0, 0, 7, 0, 3, 0, 8, 0, 0],
	    [0, 0, 0, 2, 0, 5, 0, 0, 0],
	    [4, 0, 0, 9, 0, 6, 0, 0, 1],
	    [0, 4, 3, 0, 0, 0, 2, 1, 0],
	    [1, 0, 0, 0, 0, 0, 0, 0, 5],
	    [0, 5, 8, 0, 0, 0, 6, 7, 0],
	    [5, 0, 0, 1, 0, 8, 0, 0, 9],
	    [0, 0, 0, 5, 0, 3, 0, 0, 0],
	    [0, 0, 2, 0, 9, 0, 5, 0, 0]
	];
const N = 9;
const UNASSIGNED = 0;
//show grid
window.onload = function(e){
	for(let i=0;i<N;i++){
		for(let j=0;j<N;j++){
			if(grid[i][j]!=UNASSIGNED){
				let z=j+i*N;
				let x=document.getElementById(`cell-${z}`);
				x.value = grid[i][j];
				x.setAttribute("disabled","true")
			}
		}
	}
}
//tìm ô trống, return true nếu thấy ô trống
function findUnassignedLocation(array,row,col){
	for(let i=0;i<N;i++){
		col.val=0;		
		for(let j=0;j<N;j++){
			if (array[i][j] == UNASSIGNED){
				return true;
			}			
			col.val++;
		}
		row.val++;
	}
	return false
}
// return true nếu num đã dùng ở hàng row
function usedInRow(array,row,number){
	return(array[row].includes(number));
}

function selectColumn(array,column){
	let newArray = [];
	for(let i=0;i<N;i++){
		newArray.push(array[i][column]);
	}
	return newArray;
}
//return true nếu num đã dùng ở cột col
function usedInColumn(array,col,number){
	let newArray=selectColumn(array,col);
	return(newArray.includes(number));
}
// return true nếu đã dùng ở box
function usedInBox(grid,boxStartRow,boxStartCol,num){
    for (var i = 0; i < 3; i++)
	for (var j = 0; j < 3; j++)
	    if (grid[i + boxStartRow][j + boxStartCol] == num)
		return true;
    return false;
}
// return true nếu num có thể điền vào cell
function isSafe(grid,row,col,num) {
    return !usedInRow(grid, row.val, num) &&
	    !usedInColumn(grid, col.val, num) &&
	    !usedInBox(grid, row.val - row.val % 3, col.val - col.val % 3, num);
}
// giải sudoku
function solveSudoku(grid) {
  	var row={val:0};
	var col={val:0};
    if (!findUnassignedLocation(grid,row,col)){
    	return true;
    }	 
	for (let num = 1; num <= N; num++) {
		if (isSafe(grid,row,col,num)) {
		    grid[row.val][col.val] = num; 
		    if (solveSudoku(grid)){
		    	return true; 
		    }		 
		    grid[row.val][col.val] = UNASSIGNED; 
		}
    }
    return false; 
}
function solve(){
	console.log(grid);	
	solveSudoku(grid);
	for(let i=0;i<N;i++){
		for(let j=0;j<N;j++){
			let z=j+i*N;
			let x=document.getElementById(`cell-${z}`);
			x.value = grid[i][j];
			
		}
	}
}
function search(number){
	for(let i=0;i<N;i++){
		for(let j=0;j<N;j++){
			let z=j+i*N;
			let x=document.getElementById(`cell-${z}`);
			x.style.color= "rgb(84,84,84)";
			if(x.value == number){
				x.style.color = "red";
			}
			
		}
	}
}
function exitSearch(){
	for(let i=0;i<N;i++){
		for(let j=0;j<N;j++){
			let z=j+i*N;
			let x=document.getElementById(`cell-${z}`);
			x.style.color= "rgb(84,84,84)";
		}
	}
}

