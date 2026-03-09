// setup variables
let music = new Audio('sounds/secretLoop.mp3');
let sfx = new Audio('sounds/achievement.mp3');

let response;
let kmResponseNum;

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
  
  let url = 'data/keymasterResponses.json';
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {

    let data = await fetch(url, options);
    response = await data.json();

    document.getElementById('loading').id = 'keymaster';
    document.getElementById('keymaster').src = 'images/keymaster.png';
    document.getElementById('keymaster').style.transform = 'scale(0.5)';
    
    kmResponseNum = Math.floor(Math.random() * response.length);
    response.forEach((element) => console.log(element));
    return response;
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    document.getElementById('loading').remove();
    
  }
}

// fetches keymaster responses when page loads
window.onload = readResponses();

// get ready for probably the biggest function in this script file
function nextMessage(userInput) {
  document.getElementById('keymasterResponse').innerText = response[kmResponseNum].message.replace('<username>', JSON.parse(localStorage.vosSettings).userName);
  document.getElementById('keymasterResponse').style.color = response[kmResponseNum].color;
  document.getElementById('userInput').value = '';
  if (kmResponseNum == response.length - 1) {
    kmResponseNum = 0;
  } else {
    kmResponseNum++;
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
