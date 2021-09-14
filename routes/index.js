const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
const path = require('path');

let startPath = `D:\\1\\`

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Explorer' });
});

router.post('/txt', function (req, res, next) {
  let data = [];

  async function textContent() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            readfile = await read(newPath);
            data.push({"Name":file, "Text": readfile});        
          };
        } 
      }  
    } catch (err) {
      console.error(err);
    }
    res.send(data);
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

// дир 
router.post('/dir', function (req, res, next) {
  
  let sendFile = [];
  let sendDir = [];

  async function fileOrDir() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          sendFile.push( file );                       
        } else if (stat.isDirectory()) {
          sendDir.push( file );
        }
      }
    } catch (err) {
      console.error(err);
    }
    let data = { "File": sendFile, "Directory" : sendDir };
    res.json(data); 
  }
  fileOrDir(); 
});

module.exports = router;
