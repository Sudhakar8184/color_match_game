var row;
var col;
var countvalue = 0;
var valuechoose = false;
var a = new Array(8);
var k = 0;
var choose = '';
var backupitem;
var movecounts = 35;
var score = 0;
for (var i = 0; i < 8; i++) {
  a[i] = new Array();
  let block = document.createElement('tr');
  block.setAttribute("id", `tr${i}`)
  let head = document.getElementById('tbody');
  head.appendChild(block);
  for (var j = 0; j < 8; j++) {
    let block = document.createElement('td');
    block.setAttribute("id", `td${i}${j}`);
    var setcolor1 = setcolor()
    block.setAttribute("style", `background-color:${setcolor1}`)
    block.setAttribute("value", `${setcolor1}`)
    let head = document.getElementById(`tr${i}`);
    head.appendChild(block);
  }
}

function setcolor() {
  var ch = Math.floor(Math.random() * 5) + 1;
  var color = ``;
  switch (ch) {
    case 1:
      color = 'red';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'green';
      break;
    case 4:
      color = 'yellow';
      break;
    case 5:
      color = 'orange';
      break;
  }
  return color
}
clearrows()
clearcols()
//row
function clearrows() {
  for (var i = 0; i < 8; i++) {
    var colorcount = 0;
    var colorvalue = '';
    for (var j = 0; j < 8; j++) {
      var main = document.getElementById(`td${i}${j}`).getAttribute("value");
      if (main == colorvalue) {
        ++colorcount;
        if (colorcount >= 2) {
          if(colorcount == 2)
          score = score + 3
          if(colorcount > 2)
          score = score + (colorcount-2)
          var maincolor = colorcount;
          var p = j;
        }
      } else {
        colorcount = 0;
      }
      colorvalue = main;
      // console.log("color",i,j,colorvalue)   
      if (j > 2 && maincolor >= 2) {
        while (maincolor >= 0) {
          // console.log("color",i,j,p,maincolor,colorvalue)   
          document.getElementById(`td${i}${p}`).setAttribute("style", `background-color:white`)
          document.getElementById(`td${i}${p}`).setAttribute("value", `white`)
          p--;
          maincolor--;
        }
      }
    }
  }
}

function checkrows() {
  for (var i = 0; i < 8; i++) {
    var colorcount = 0;
    var colorvalue = '';
    for (var j = 0; j < 8; j++) {
      var main = document.getElementById(`td${i}${j}`).getAttribute("value");
      if (main == colorvalue) {
        ++colorcount;
        if (colorcount >= 2) {
          console.log("DDDDDDDDDDDDDDDDDDDDDDDD")
          return true
        }
      } else {
        colorcount = 0;
      }
      colorvalue = main;
    }
  }
  return false
}
// col
function clearcols() {
  for (var i = 0; i < 8; i++) {
    var colorcount = 0;
    var colorvalue = '';
    for (var j = 0; j < 8; j++) {
      var main = document.getElementById(`td${j}${i}`).getAttribute("value");
      if (main == colorvalue) {
        ++colorcount;
        if (colorcount >= 2) {
          if(colorcount == 2)
          score = score + 3
          if(colorcount > 2)
          score = score + (colorcount-2)
          var maincolor = colorcount;
          var p = j;
        }
      } else {
        colorcount = 0;
      }
      colorvalue = main;
      if (j >= 2 && maincolor >= 2) {
        while (maincolor >= 0) {
          // console.log("color",i,j,p,maincolor,colorvalue)   
          document.getElementById(`td${p}${i}`).setAttribute("style", `background-color:white`)
          document.getElementById(`td${p}${i}`).setAttribute("value", `white`)
          p--;
          maincolor--;
        }
      }
    }
    colorcount = 0;
  }
}

function checkcols() {
  for (var i = 0; i < 8; i++) {
    var colorcount = 0;
    var colorvalue = '';
    for (var j = 0; j < 8; j++) {
      var main = document.getElementById(`td${j}${i}`).getAttribute("value");
      if (main == colorvalue) {
        ++colorcount;
        if (colorcount >= 2) {
          return true;
        }
      } else {
        colorcount = 0;
      }
      colorvalue = main;
    }
    colorcount = 0;
  }
  return false;
}


fillcolor()
function fillcolor() {
  if (!emptyvalue()) {
    return;
  }
  shiftcolor(row, col)
  fillcolor()
  check()
}

function emptyvalue() {
  for (row = 0; row < 8; row++) {
    for (col = 0; col < 8; col++) {
      var data = document.getElementById(`td${row}${col}`).getAttribute('value')
      // console.log("inside",row,col,data)
      if (data == 'white') {
        // console.log("inside",data)
        return true;
      }
    }
  }
  return false;
}

function shiftcolor(newrow, newcol) {
  if (newrow >= 1) {
    for (var row = newrow - 1; row >= 0; row--) {
      if (row >= 1) {
        var data = document.getElementById(`td${row}${newcol}`).getAttribute('value')
        // console.log("new", row, col, data)
        document.getElementById(`td${row + 1}${newcol}`).setAttribute("value", `${data}`)
        document.getElementById(`td${row + 1}${newcol}`).setAttribute("style", `background-color:${data}`)
        document.getElementById(`td${row}${newcol}`).setAttribute("value", `white`)
        document.getElementById(`td${row}${newcol}`).setAttribute("style", `background-color:white`)
      } else {
        var data = document.getElementById(`td${row}${newcol}`).getAttribute('value')
        // console.log("new", row, col, data)
        document.getElementById(`td${row + 1}${newcol}`).setAttribute("value", `${data}`)
        document.getElementById(`td${row + 1}${newcol}`).setAttribute("style", `background-color:${data}`)
        var setcolor1 = setcolor()
        document.getElementById(`td${row}${newcol}`).setAttribute("value", `${setcolor1}`)
        document.getElementById(`td${row}${newcol}`).setAttribute("style", `background-color:${setcolor1}`)
      }
    }
  } else {
    var setcolor1 = setcolor()
    document.getElementById(`td${newrow}${newcol}`).setAttribute("value", `${setcolor1}`)
    document.getElementById(`td${newrow}${newcol}`).setAttribute("style", `background-color:${setcolor1}`)
  }
}

function check() {
  if (checkrows() || checkcols()) {
    clearrows()
    clearcols()
    fillcolor()
    check()
  }
}

const buttons = document.getElementsByTagName('td');
const buttonsCount = buttons.length;
document.getElementById('moveleft').innerHTML = movecounts
for (let i = 0; i < buttonsCount; i += 1) {
  score = 0
  buttons[i].addEventListener('click', function () {
    id1 = this.id;
    console.log("SCoreSCoreSCoreSCoreSCore", score)
    if (!valuechoose) {
      choose = document.getElementById(`${id1}`).getAttribute("value");
      if (choose !== '') {
        backupitem = id1;
        console.log("main choose a", choose)
        document.getElementById(`${backupitem}`).style.border = "2px solid black";
        valuechoose = true;
      } else {
        alert("please choose right one");
      }
    } else {
      if (choose !== '') {
        console.log("after inside")
        var dem3 = document.getElementById(`${id1}`).getAttribute("value");
        if ((Math.abs(coinstypeidlast(backupitem)[0] - coinstypeidlast(id1)[0]) !== 0 || (Math.abs(coinstypeidfirst(backupitem)[0] - coinstypeidfirst(id1)[0]) !== 1)) && (Math.abs(coinstypeidlast(backupitem)[0] - coinstypeidlast(id1)[0]) !== 1 || (Math.abs(coinstypeidfirst(backupitem)[0] - coinstypeidfirst(id1)[0]) !== 0))) {
          alert("it is not correct postion");
          return;
        }
        document.getElementById(`${backupitem}`).setAttribute("value", `${dem3}`)
        document.getElementById(`${backupitem}`).setAttribute("style", `background-color:${dem3}`)
        document.getElementById(`${id1}`).setAttribute("value", `${choose}`)
        document.getElementById(`${id1}`).setAttribute("style", `background-color:${choose}`)
        document.getElementById(`${backupitem}`).style.border = "";
        clearrows()
        clearcols()
        fillcolor()
        check()
      }
      if (movecounts == 0) {
        alert(`your score ${score}`)
        location.reload();
      }
      movecounts--;
      document.getElementById('moveleft').innerHTML = movecounts
      valuechoose = false;
    }

  })
}

function coinstypeidlast(data) {
  data = data.replace(/\;/, '');
  // console.log("data",data)
  data = data.match(/\d{1}$/gmi)
  // console.log("after da",data)
  return data;
}
function coinstypeidfirst(data) {
  data = data.replace(/\;/, '');
  // console.log("data first",data)
  data = data.match(/\d{1}/gmi)
  // console.log("after da first",data)
  return data;
}
