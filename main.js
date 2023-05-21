const electron = require('electron');
const fs = require('fs');   
const {app, BrowserWindow, ipcMain, dialog} = electron;
let win;
let filePath;

app.on('ready', () => {
     win = new BrowserWindow({
         webPreferences: {
            nodeIntegration: true
         }
    })
    win.loadFile('index.html');
})

ipcMain.on('save', (event, text)=>{
    if(filePath === undefined){
        dialog.showSaveDialog(win, {defaultPath:'filename.txt'}, (fullPath)=>{
            if(fullPath){
                filePath = fullPath;
                writeToFile(text);
            }
        })
    }else{
        writeToFile(text);
    }
});
function writeToFile(text) {
    fs.writeFile(filePath, text, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

