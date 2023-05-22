const electron = require('electron');
const fs = require('fs');   
const {app, BrowserWindow, ipcMain, dialog, Menu, Accelerator} = electron;
let win;
let filePath;

app.on('ready', () => {
     win = new BrowserWindow({
         webPreferences: {
            nodeIntegration: true
         }
    })
    win.loadFile('index.html');
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)
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
        win.webContents.send('saved', 'success')
    });
}

const menuTemplate = [
    {
        label: "File",
        submenu:[
            {
                label: "Save",
                accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
                click(){
                    win.webContents.send('save-clicked');
                }
            },
            {
                label: "Save as",
                accelerator: process.platform === 'darwin' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S',
                click(){
                    filePath = undefined
                    win.webContents.send('save-clicked');

                }
            }
        ]
    },
    {role: 'editMenu'},
    {role: 'viewMenu'}
]
    
