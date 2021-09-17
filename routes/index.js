const express = require('express');
const { appendFile } = require('fs');
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

router.get(`/txtprint/:fileName`, function (req, res, next) {
  console.log(req.params);
  console.log( req.params.fileName );    
  let fileName = req.params.fileName;
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
        if ( Name == fileName){                       
          res.render('txt', { fileName: TextContent });
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

router.post('/gettxt', function (req, res, next) {
  let data = [];

  async function textName() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            data.push({ "Name":file });        
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

// дир 
router.post('/getdir', function (req, res, next) {
  
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
