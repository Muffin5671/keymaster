let sfx = new Audio('sounds/achievement.mp3');

async function readResponses() {
  let x = await fetch('data/keymasterResponses.json');
  let y = await x.json();
  y.forEach((element) => console.log(element));
}

window.onload = readResponses();

function achievement(name, cubeID) {
  sfx.play();
  // unfinished
}
