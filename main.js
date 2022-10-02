let answers = {};
var question_datatypes = {
  "Question 1": "DestinationTotal",
  "Question 2": "AverageVacationTime",
  "Question 3": "Temperatures",
  "Question 4": "Temperatures",
  "Question 5": "AveragePrecipitation",
  "Question 6": "AverageCost",
  "Question 7": "Risk",
  "Question 8": "Urbanization",
  "Question 9": "NULL", // NULL just means we couldn't find the statistics for the problem lel
  "Question 10": "NULL",
  "Question 11": "EnglishPercentage",
  "Question 12": "Coastline",
};

DataArray = ReadData("JSReadTest.xlsx");

function check() {
    var answers = {
      "Question 1": document.survey.question1.value,
      "Question 2": document.survey.question2.value,
      "Question 3": document.survey.question3.value,
      "Question 4": document.survey.question4.value * -1,
      "Question 5": document.survey.question5.value,
      "Question 6": document.survey.question6.value,
      "Question 7": document.survey.question7.value,
      "Question 8": document.survey.question8.value,
      "Question 9": document.survey.question9.value,
      "Question 10": document.survey.question10.value,
      "Question 11": document.survey.question11.value,
      "Question 12": document.survey.question12.value,
    };    
    var survey = document.getElementById("survey");
    survey.style.display="none";

    var countryArr = new Array();

    for(var i = 0; i < DataArray[0].data.length; i++){
      countryArr.push(DataArray[0].data[i]);
    }

    for(var key in question_datatypes){
      SortAndScore(countryArr, question_datatypes[key], answers[key]);
    }
}

function add(name, value, classname){
  answers[name] = value;
  const buttons = document.querySelectorAll(classname);
  for (var i = 0; i <  buttons.length; i++){
    buttons[i].classList.remove("active");
  }
  if (value == 1){
    buttons[0].classList.add("active");
  } else if (value == 2){
      buttons[1].classList.add("active")
  } else if (value == 3){
      buttons[2].classList.add("active")
  } else if (value == 4){
      buttons[3].classList.add("active")
  } else if (value == 5){
      buttons[4].classList.add("active")
  }
  
}

function SortAndScore(array, datatype, answer){
  if(datatype == "NULL"){
    return;
  }

  if(answer > 0){
    //console.log("IMPORTANT: " + array[0][datatype]);
    for(var i = 0; i < array.length; i++){
      for(var j = 0; j < array.length - i - 1; j++){
        if(array[j][datatype] > array[j + 1][datatype]){
          array[j + 1] = [array[j], array[j] = array[j + 1]][0];
        }
      }
    }

  }
  else{
    answer = answer * -1;
    //console.log("IMPORTANT: " + array[0][datatype]);
    for(var i = 0; i < array.length; i++){
      for(var j = 0; j < array.length - i - 1; j++){
        if(array[j][datatype] > array[j + 1][datatype]){
          array[j] = [array[j + 1], array[j + 1] = array[j]][0];
        }
      }
    }
  }

  var binSize = array[array.length - 1] - array[0] / 5;
    var bin1 = new Array(); // Strongly disagree
    var bin2 = new Array(); // disagree
    var bin3 = new Array(); // neutral
    var bin4 = new Array(); // agree
    var bin5 = new Array(); // Strongly agree
    for(var i = 0; i < array.length; i++){
      if(array[i][datatype] < binSize){
        bin1.push(array[i]);
      }
      else if(array[i][datatype] < (binSize * 2)){
        bin2.push(array[i]);
      }
      else if(array[i][datatype] < (binSize * 3)){
        bin3.push(array[i]);
      }
      else if(array[i][datatype] < (binSize * 4)){
        bin4.push(array[i]);
      }
      else{
        bin5.push(array[i]);
      }
    }

  if(answer == 1){
    for(var x in bin1){
      x.Score += 1;
    }
    for(var x in bin2){
      x.Score += 1;
    }
  }
  else if(answer == 2){
    for(var x in bin2){
      x.Score += 1;
    }
  }
  else if(answer == 4){
    for(var x in bin4){
      x.Score += 1;
    }
  }
  else if(answer == 5){
    for(var x in bin4){
      x.Score += 1;
    }
    for(var x in bin5){
      x.Score += 1;
    }
  }
}
  
function reveal(){
  var reveals = document.querySelectorAll(".prompt");
  
  for (var i = 0; i < reveals.length; i++){
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
    reveals[i].classList.add("active");
    } else {
    reveals[i].classList.remove("active");
    }
  }
}

function ReadData(filename){ // Thank you for the tutorial: https://www.delftstack.com/howto/javascript/javascript-read-excel-file/
  var DataArray = new Array();
  const XLSX = require('xlsx');

  const parseExcel = (filename) =>{
      const excelData = XLSX.readFile(filename);
      return Object.keys(excelData.Sheets).map(name => ({
          name, data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
      }));
  };

  parseExcel(filename).forEach(element => {
      DataArray.push(element);
      //console.log(element.data);
  })
  return DataArray;
}

window.addEventListener("scroll", reveal);