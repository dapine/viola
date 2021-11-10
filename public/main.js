const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open video',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [
                { name: 'Video', extensions: ['mkv', 'avi', 'mp4'] },
              ]
            })
              .then(function (fileObj) {
                if (!fileObj.canceled) {
                  win.webContents.send('FILE_OPEN', fileObj.filePaths)
                }
              })
              .catch(function (err) {
                console.error(err)
              })
          }
        },
        {
          label: 'Export...',
          submenu: [
            {
              label: 'To SubRip (SRT)',
              accelerator: 'CmdOrCtrl+Shift+S',
              click() {
                dialog.showSaveDialog({
                  filters: [
                    {name: 'SubRip', extensions: ['srt']}
                  ]
                })
                  .then(function (fileObj) {
                    if (!fileObj.canceled) {
                      win.webContents.send('EXPORT_SRT', fileObj.filePath)
                    }
                  })
                  .catch(function (err) {
                    console.error(err)
                  })
              }
            }
          ]
        },
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)

  win.loadURL('http://localhost:3000');

  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('EXPORT_SRT', function (e, data) {
  if (data.content !== '') {
    fs.writeFile(data.filepath, data.content, function (err) {
      if (err)
        console.log(err)
    })
  }
})