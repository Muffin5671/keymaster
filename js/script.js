// setup variables
let music = new Audio('sounds/secretLoop.mp3');
let sfx = new Audio('sounds/achievement.mp3');

let response;
let kmResponseNum;
let response2;
let kmMessageNum;

// when you enter this page for the first time
if (localStorage.vosSettings == undefined) {
  localStorage.vosSettings = '{"userName": "Player", "audio": false}'
}

// plays audio on page click
function playAudio() {
  document.body.addEventListener("click", audioCheck)
}

// checks if audio option is on/off
function audioCheck() {
  if (JSON.parse(localStorage.vosSettings).audio) {
    music.loop = true;
    music.play();
  }
}

// keymaster responses are in an external JSON
async function readResponses() {
  
  url = 'data/keymasterResponses.json';
  
  options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {

    let data = await fetch(url, options);
    response = await data.json();
    
    kmResponseNum = Math.floor(Math.random() * response.length);
    response.forEach((element) => console.log(element));
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    
  }

  url = 'data/keymasterMessages.json';
  
  options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {

    let data2 = await fetch(url, options);
    response2 = await data2.json();
    
    kmMessageNum = 0;

    document.getElementById('keymasterResponse').innerText = response2[kmMessageNum].message.replace('<username>', JSON.parse(localStorage.vosSettings).userName);

    kmMessageNum++;
    
    response2.forEach((element) => console.log(element));
    return response2;
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    
  }
}

// fetches keymaster responses when page loads
window.onload = readResponses();

// get ready for probably the biggest function in this script file
function nextMessage(userInput) {

  if (!(userInput == '')) {

    document.getElementById('keymasterResponse').innerText = response[kmResponseNum].message.replace('<username>', JSON.parse(localStorage.vosSettings).userName);
    document.getElementById('keymasterResponse').style.color = response[kmResponseNum].color;
    document.getElementById('userInput').value = '';
    if (kmResponseNum == response.length - 1) {
      kmResponseNum = 0;
    } else {
      kmResponseNum++;
    }

  } else {

    document.getElementById('keymasterResponse').innerText = response2[kmMessageNum].message.replace('<username>', JSON.parse(localStorage.vosSettings).userName);
    document.getElementById('keymasterResponse').style.color = response2[kmMessageNum].color;
    document.getElementById('userInput').value = '';
    if (kmMessageNum == response2.length - 1) {
      kmMessageNum = 0;
    } else {
      kmMessageNum++;
    }
  }
}

function achievement(name, cubeID) {
  
  if (JSON.parse(localStorage.vosSettings).audio) {
    sfx.play();
  }
  
  let element = document.createElement('div');
  element.id = 'achPopup';
  element.className = 'brownbox';
  let achName = document.createElement('p');
  achName.id = 'achName';
  achName.innerText = name;
  element.append(achName);
  document.body.append(element);
  
}

function optMenu() {
  let element = document.createElement('div');
  element.id = 'optMenu';
  element.className = 'brownbox';
  let opt1 = document.createElement('input');
  opt1.type = 'checkbox';
  element.append(opt1);
  document.body.append(element);
}