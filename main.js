const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    transparent: true,    // 배경 투명
    frame: false,          // 상단 바 제거
    alwaysOnTop: true,     // 항상 위
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  // win.setIgnoreMouseEvents(true, { forward: true }); // 필요 시 마우스 관통 설정
}

app.whenReady().then(createWindow);
