const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const electron = require("electron")
const fs = require('fs')
const path = require('path')

// copied from electron-is-dev (https://github.com/sindresorhus/electron-is-dev)
function isElectronDev(electron) {
  if (typeof electron === 'string') {
    throw new TypeError('Not running in an Electron environment!')
  }

  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1

  return isEnvSet ? getFromEnv : !electron.app.isPackaged
}

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
          accelerator: 'CmdOrCtrl+Shift+O',
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
        { type: 'separator' },
        {
          label: 'Open project',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [
                { name: 'JSON', extensions: ['json'] },
              ]
            })
              .then(function (fileObj) {
                if (!fileObj.canceled) {
                  fs.readFile(fileObj.filePaths[0], 'utf8', (err, json) => {
                    if (!err)
                      win.webContents.send('OPEN_PROJECT', JSON.parse(json))
                  })
                }
              })
              .catch(function (err) {
                console.error(err)
              })
          }
        },
        {
          label: 'Save project',
          accelerator: 'CmdOrCtrl+S',
          click() {
            dialog.showSaveDialog({
              filters: [
                { name: 'JSON', extensions: ['json'] }
              ]
            })
              .then(function (fileObj) {
                if (!fileObj.canceled) {
                  win.webContents.send('SAVE', fileObj.filePath)
                }
              })
              .catch(function (err) {
                console.error(err)
              })
          }
        },
        { type: 'separator' },
        {
          label: 'Export...',
          submenu: [
            {
              label: 'To SubRip (SRT)',
              accelerator: 'CmdOrCtrl+Shift+S',
              click() {
                dialog.showSaveDialog({
                  filters: [
                    { name: 'SubRip', extensions: ['srt'] }
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

  const url = isElectronDev(electron) ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

  win.loadURL(url);
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

ipcMain.on('SAVE', function (e, data) {
  if (data.content !== '') {
    fs.writeFile(data.filepath, data.content, function (err) {
      if (err)
        console.log(err)
    })
  }
})