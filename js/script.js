// setup script

import jquery400Min from "./libraries/jquery-4.0.0.min.js";

let music = new Audio('sounds/secretLoop.mp3');
let sfx = new Audio('sounds/achievement.mp3');

let audioOn = JSON.parse(localStorage.vosSettings).audio;

let response;
let kmResponseNum;

let response2;
let kmMessageNum;

let response3;
let kmBasementNum;

let isMobile;
function mobileTest() {
  isMobile = /iPhone|Android/.test(navigator.userAgent);
  if (isMobile) {
    alert('Note: It is recommended to use a larger screen like a desktop and not a small screen like a phone. You can manually change the page size to a proper one.');
  }
}

function mobileTap() {
  document.body.addEventListener("click", mobileTest);
}

// when you enter this page for the first time
if (localStorage.vosSettings == undefined) {
  localStorage.vosSettings = generateSettingsFile({defaultUsername: true});
}

// plays audio on page click
function playAudio() {
  document.body.addEventListener("click", audioCheck);
}

// checks if audio option is on/off
function audioCheck() {
  if (audioOn) {
    music.loop = true;
    music.play();
  }
}

// all keymaster messages are in an external JSON
async function readResponses() {
  

  try {

    response = await fetch('data/keymasterResponses.json').then(res => res.json());
    
    // responses start on a random number
    kmResponseNum = Math.floor(Math.random() * response.length);
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    
  }


  try {

    response2 = await fetch('data/keymasterMessages.json').then(res => res.json());
    
    // can start on array index 0 or array index 9

    if (Math.round(Math.random()) == 1) {
      kmMessageNum = 9;
    } else {
      kmMessageNum = 0;
    }

    document.getElementById('keymasterResponse').innerText = response2[kmMessageNum].message.replace('<username>', JSON.parse(localStorage.vosSettings).userName);

    kmMessageNum++;
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    
  }


  try {

    response3 = await fetch('data/keymasterBasement.json').then(res => res.json());
    
    kmBasementNum = Math.floor(Math.random() * response3.length);
    /* debug script: response3.forEach((element) => console.log(element)); */
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    
  }

}

// fetches keymaster responses when page loads
window.onload = readResponses();

// keymaster's next message, who 'reads' your messages
function nextMessage(userInput) {

  if (!userInput == '') {

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

// messages when basement door clicked but locked
function basementMessage() {

  // just in case any mods make this use your username :)))
  alert(response3[kmBasementNum].replace('<username>', JSON.parse(localStorage.vosSettings).userName));
  
  if (kmBasementNum == response3.length - 1) {
    kmBasementNum = 0;
  } else {
    kmBasementNum++;
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
  opt1.id = 'volumeSlider'
  opt1.type = 'range';
  opt1.oninput = "music.volume = document.getElementById('volumeSlider').value / 100"; // doesn't work ??
  element.append(opt1);
  document.body.append(element);
}

function generateSettingsFile({defaultUsername: defaultUsername}) {

  let userName;

  if (defaultUsername) {
    userName = 'Player';
  }

  return {
    userName: userName,
    audio: audioOn,
  }
}

function loadMod(zip) {
  // mod reader
}