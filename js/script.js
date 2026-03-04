async function readResponses() {
  let x = await fetch('data/keymasterResponses.json');
  let y = await x.json();
  y.forEach((element) => console.log(element));
}

/*let user = ' [' + prompt('Enter a comma-seperated list of the numbers that The Keymaster gave you') + ']'
let a = 4;
let b = 8;
let c = 15;
let d = 20;
let e = 48;
let f = 100;

let result = String(b - a) + String(c - b) + String(d - c) + String(e - d) + String(f - e);
document.getElementById('result').innerHTML = result;*/
