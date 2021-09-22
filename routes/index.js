const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
const path = require('path');


router.get(`/`, function (req, res, next) {
  const clearPath = `D:\\1\\`;
  res.render('index', { title: 'Explorer', data: JSON.stringify(clearPath) });
});

router.get(`/path=:startPath&dir=:dirName`, function (req, res, next) {
  let dir = decodeURIComponent (req.params.dirName);
  let startPath = decodeURIComponent (req.params.startPath);
  startPath = startPath + dir + '\\';
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
});

router.get(`/lastpath=:lastPath`, function (req, res, next) {
  startPath = req.params.lastPath;
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
});

router.get(`/txt/path=:startPath&file=:fileName`, function (req, res, next) {
  let fileName = req.params.fileName;
  let startPath = req.params.startPath;
  let listName = [];
  let listText = [];

  async function textContent() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            listName.push(file);
            readfile = await read(newPath);
            listText.push(readfile);
          };
        }
      }
      for (let i = 0; i < listName.length; i++) {
        Name = listName[i];
        TextContent = listText[i];
        if (Name == fileName) {
          res.render('txt', { title: 'Explorer', data: JSON.stringify(startPath), fileName: TextContent });
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function read(fileName) {
    try {
      const content = await readFile(fileName, 'utf8', 'r');
      return content;
    } catch (err) {
      console.error(err);
    }

  }
  textContent();

});

router.post('/gettxt:startPath', function (req, res, next) {
  let data = [];
  let startPath = req.params.startPath;
  async function textName() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            data.push({ "Name": file });
          };
        }
      }
    } catch (err) {
      console.error(err);
    }
    res.send(data);
  }
  textName();

});


router.get(`/getdir/path=:getDir`, function (req, res, next) {
  let startPath = decodeURIComponent( req.params.getDir);
  let sendFile = [];
  let sendDir = [];
  async function fileOrDir() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          sendFile.push(file);
        } else if (stat.isDirectory()) {
          sendDir.push(file);
        }
      }
    } catch (err) {
      console.error(err);
    }
    let data = { "File": sendFile, "Directory": sendDir, "Path": startPath };
    res.json(data);
  }
  fileOrDir();
});

module.exports = router;
