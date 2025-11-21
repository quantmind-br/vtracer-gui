import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    autoHideMenuBar: true,
  })

  win.setMenu(null)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()

  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp', 'gif'] }]
    })
    return result.filePaths[0]
  })

  ipcMain.handle('run-vtracer', async (_event, args) => {
    const { inputPath, outputPath, options } = args

    // Construct command arguments
    const cmdArgs = ['--input', inputPath, '--output', outputPath]

    if (options.colormode) cmdArgs.push('--colormode', options.colormode)
    if (options.hierarchical) cmdArgs.push('--hierarchical', options.hierarchical)
    if (options.mode) cmdArgs.push('--mode', options.mode)
    if (options.filter_speckle) cmdArgs.push('--filter_speckle', options.filter_speckle)
    if (options.color_precision) cmdArgs.push('--color_precision', options.color_precision)
    if (options.gradient_step) cmdArgs.push('--gradient_step', options.gradient_step)
    if (options.corner_threshold) cmdArgs.push('--corner_threshold', options.corner_threshold)
    if (options.preset) cmdArgs.push('--preset', options.preset)

    return new Promise((resolve, reject) => {
      const process = spawn('vtracer', cmdArgs)

      let stdout = ''
      let stderr = ''

      process.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      process.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      process.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, stdout })
        } else {
          reject(new Error(`vtracer failed with code ${code}: ${stderr}`))
        }
      })

      process.on('error', (err) => {
        reject(new Error(`Failed to start vtracer: ${err.message}`))
      })
    })
  })

  ipcMain.handle('read-file', async (_event, filePath, encoding = 'utf-8') => {
    const fs = await import('node:fs/promises')
    return fs.readFile(filePath, { encoding: encoding as BufferEncoding })
  })
})
