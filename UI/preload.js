const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
  API_URL: 'http://127.0.0.1:8000/predict'
});