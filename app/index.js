const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createwindow(){
  win =  new BrowserWindow({width: 1450, height: 700});

  /*let electron_button = document.getElementById('electron_button');
  electron_button.addEventListener('click', (event) => {
    alert("Hello World !!");
  });*/

  win.loadURL(url.format({
    pathname:path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createwindow);
