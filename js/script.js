// setup script

let music = new Audio('sounds/secretLoop.mp3');
let sfx = new Audio('sounds/achievement.mp3');

// when you enter this page for the first time
if (localStorage.vosSettings == undefined) {
  localStorage.vosSettings = JSON.stringify(generateSettingsFile({defaultSettings: true}));
}

let userName = JSON.parse(localStorage.vosSettings).userName;
let audioOn = JSON.parse(localStorage.vosSettings).audio;

if (!(localStorage.vosSettings == undefined)) {
  userName = JSON.parse(localStorage.vosSettings).userName;
  audioOn = JSON.parse(localStorage.vosSettings).audio;
} else {
  userName = 'Player';
  audioOn = false;
}

document.getElementById('userNameInput').value = JSON.parse(localStorage.vosSettings).userName;

let response;
let kmResponseNum;

let response2;
let kmMessageNum;

let response3;
let kmBasementNum;

// mobile popup
let isMobile;
function mobileTest() {
  isMobile = /iPhone|Android/.test(navigator.userAgent);
  if (isMobile) {
    alert('Note: It is recommended to use a larger screen like a desktop and not a small screen like a phone. You can manually change the page size to a proper one.');
    onclick = null;
    return true;
  } else {
    return false;
  }
}

// plays audio on page click
function playAudio() {
  document.body.addEventListener('click', audioCheck);
}

function clickActions() {
  audioCheck();
  mobileTest();
}

onclick = clickActions;

// checks if audio option is on/off
function audioCheck() {
  if (audioOn) {
    music.loop = true;
    music.play();
  }
}

function gzip(string) {
  const compressed = pako.gzip(string);
  return btoa(String.fromCharCode(...compressed));
}

function ungzip(string) {
  const binary = atob(string);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder().decode(pako.ungzip(bytes));
}

let cached = {};
if (!(localStorage.vosCached == undefined)) {
  cached = JSON.parse(atob(ungzip(JSON.parse(localStorage.vosCached).data)));
}

// all keymaster messages are in an external JSON
async function readResponses() {
  

  try {

    if (!(cached.responses == undefined)) {
      response = cached.responses;
    } else {
      response = await fetch('data/keymasterResponses.json').then(res => res.json());
    }
    
    // responses start on a random number
    kmResponseNum = Math.floor(Math.random() * response.length);
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    throw new Error(err);
    
  }


  try {
    
    if (!(cached.messages == undefined)) {
      response2 = cached.messages;
    } else {
      response2 = await fetch('data/keymasterMessages.json').then(res => res.json());
    }
    
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
    throw new Error(err);

  }


  try {

    if (!(cached.basement == undefined)) {
      response3 = cached.basement;
    } else {
      response3 = await fetch('data/keymasterBasement.json').then(res => res.json());
    }
    
    kmBasementNum = Math.floor(Math.random() * response3.length);
    
  } catch (err) {
    
    document.getElementById('keymasterResponse').innerHTML = 'Something went wrong...';
    throw new Error(err);

  }

  if (localStorage.vosCached == undefined) {
    localStorage.vosCached = JSON.stringify({data: gzip(btoa(JSON.stringify({messages: response2, responses: response, basement: response3})))});
  }

}

function getAchievementData() {
  fetch('data/achievementList.json')
  .then(res => res.json()).then(data => {
    let achMenuElement = document.getElementById('achMenu');
    data.forEach((object) => {
      achievementDiv = document.createElement('div');
      achievementDiv.id = object.id;
      achievementDiv.title = `Hint: ${object.hint}`;
      iconImg = document.createElement('img');
      iconImg.src = `images/icons/${object.cube}.png`;
      iconImg.style.inlineSize = '60px';
      achLabel = document.createElement('p');
      achLabel.innerText = object.name;
      achLabel.style.fontSize = '20px';
      achLabel.style.webkitTextStroke = '1px';
      achLabel.style.webkitTextStrokeColor = '#000000';
      achLabel.style.margin = 0;
      achievementDiv.append(iconImg);
      achievementDiv.append(achLabel);
      achMenuElement.append(achievementDiv);
    })
  })
}

function loadFetch() {
  readResponses();
  getAchievementData();
}

// fetches keymaster responses when page loads
onload = loadFetch;

// keymaster's next message, who 'reads' your messages
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
  document.getElementById('optMenu').style.display = '';
}

function achMenu() {
  document.getElementById('achMenu').style.display = 'flex';
}

function generateSettingsFile({defaultSettings: defaultSettings}) {

  let settingsUserName;
  let settingsAudioOn;

  if (defaultSettings) {
    settingsUserName = 'Player';
    settingsAudioOn = false;
  } else {
    settingsUserName = document.getElementById('userNameInput').value;
    settingsAudioOn = audioOn;
  }

  return {
    userName: settingsUserName,
    audio: settingsAudioOn,
  }
}

function saveSettings() {
  localStorage.vosSettings = JSON.stringify(generateSettingsFile({defaultSettings: false}));
}

function loadMod(zip) {
  // mod reader
}