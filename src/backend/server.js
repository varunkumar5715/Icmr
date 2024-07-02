// server.js (Node.js example)
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const audioBasePath = path.join(__dirname, 'audiofiles');

app.get('/api/audiofiles/:folder', (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(audioBasePath, folder);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    res.json(files);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
