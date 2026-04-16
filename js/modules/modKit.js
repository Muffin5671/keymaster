import * as zip from '@zip.js/zip.js';

class ModReader {
  constructor(file) {
    
    return {
      name: modName,
      author: modAuthor,
      description: modDesc,
      web_version: webVer,
      mod_version: modVer,
      mobileCompatible: mobile
    }
  }
}

class Application {
  redirect(url) {}
}

const ModUtils = {
  km() {
    return document.querySelector('#keymaster');
  },
  res() {
    return document.querySelector('#keymasterResponse');
  },
  door() {
    return document.querySelector('#basementDoor');
  },
  logo() {
    return document.querySelector('#logo');
  },
  uInput() {
    return document.querySelector('#userInput');
  },
  modData() {
    return localStorage.getItem(modName);
  },
  xml(str) {
    return new DOMParser().parseFromString(str, 'text/xml');
  }
}

const req = {
  send(url, options) {
    const allowed = confirm(`A mod wants to fetch a resource from ${url}. Press OK to allow.`);
    if (allowed) {
      return {res: fetch(url, options), allowed: true};
    } else {
      return {allowed: false};
    }
  },
  json(url, options) {
    const allowed = confirm(`A mod wants to fetch a resource from ${url}. Press OK to allow.`);
    if (allowed) {
      return {res: fetch(url, options).then(res => res.json()), allowed: true};
    } else {
      return {allowed: false};
    }
  },
  xml() {
    const allowed = confirm(`A mod wants to fetch a resource from ${url}. Press OK to allow.`);
    if (allowed) {
      return {xhr: new XMLHttpRequest(), allowed: true};
    } else {
      return {allowed: false};
    }
  }
}

const Settings = {
  createSetting(label, type, onChecked, id) {
    const optMenu = document.querySelector('#optMenu');
    let newSetting;
    switch (type) {
      case 'button':
        newSetting = document.createElement('button');
        newSetting.innerText = label;
        break;
      case 'check':
        newSetting = document.createElement('input');
        newSetting.type = 'checkbox';
        break;
    }
    optMenu.append(newSetting);
    return newSetting;
  },
  getSetting(id) {
    return;
  }
}

function getDocument() {
  const allowed = confirm('A mod wants to get the document of the page. This will allow it to create anything on the page, delete the page, or modify this page\'s URL. Press OK to allow.');
  if (allowed) {
    return {page: document, allowed: true};
  } else {
    return {allowed: false};
  }
}

function modAlert(str) {
  alert(`${modName}: ${str}`);
}

const scriptURL = new URLSearchParams(window.location.search).get('script');

let script;
let urlIsNull = scriptURL == null;
if (!urlIsNull) {
  script = document.createElement('script');
  script.src = scriptURL;
  script.type = 'module';

  document.body.append(script);
}
 
export {ModReader, ModUtils, req, Settings, getDocument, modAlert};