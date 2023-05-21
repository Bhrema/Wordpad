const electron = require('electron');
const fs = require('fs');   
const {app, BrowserWindow, ipcMain} = electron;

app.on('ready', () => {
    let win = new BrowserWindow({
         webPreferences: {
            nodeIntegration: true
         }
    })
    win.loadFile('index.html');
})

ipcMain.on('save', (event, text)=>{
    //save the text to a file  
    console.log(text);
    fs.writeFile('test.txt', text, (err) => {
    if (err) throw err;
        console.log('The file has been saved!');
    });
});
