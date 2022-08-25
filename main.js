const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

log.transports.file.resolvePath = () => path.join(__dirname, '/logs/main.log');
log.log("Application version " + app.getVersion());
log.info('Hello log.');
log.warn('Some problem appears.');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 300,
        height: 400
    });

    win.loadFile(path.join(__dirname, 'index.html'));
}

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
    log.info('Update available.');
});

autoUpdater.on('checking-for-update', () => {
    log.info("Checking for update.");
});

autoUpdater.on('update-not-available', () => {
    log.info("Update not available.");
});

autoUpdater.on('error', (err) => {
    log.info("Error in auto-updater. " + err);
});

autoUpdater.on('download-progress', (progressTrack) => {
    log.info("Download progress.");
    log.info(progressTrack)
});

autoUpdater.on('update-downloaded', () => {
    log.info("Update downloaded.");
    autoUpdater.quitAndInstall();
});