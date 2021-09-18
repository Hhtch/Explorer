const express = require('express');
const router = express.Router();
const { appendFile } = require('fs');
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
const path = require('path');
const clearPath = `D:\\1\\`;
let startPath = clearPath;


/* GET home page. */
router.get(`/`, function (req, res, next) {
  res.render('index', { title: 'Explorer' });
});


router.get(`/path=/\*:startPath/:dirName`, function (req, res, next) {
  // GET http://localhost:3000/path=D:/1/dir/Browser 404 Символ * означает, что на ее месте может быть абсолютно любая последовательность символов, не ограниченная по длине.
  console.log(req.params);
  console.log( req.params.dirName);
  console.log( req.params.startPath);
  
  let dir = req.params.dirName;
  if (dir == 'home'){
    startPath = clearPath; 
  }  else{
    startPath = startPath + dir + '\\';
  console.log(startPath);  
  
  }
  res.render('index', { title: 'Explorer' });
 /*
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
  fileOrDir(); */
});
/*
router.get(`/prathclear:${clearPath}`, function (req, res, next) {
  console.log(req.params);
  console.log( req.params.clearPath);
  startPath = clearPath;
  console.log(startPath);  
  res.render('index', { title: 'Explorer' });
});
*/

router.get(`/txt/:fileName`, function (req, res, next) {
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
/*
router.post('/startdir', function (req, res, next) {
  
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
});*/


router.get('/getdir', function (req, res, next) {
  console.log(`tyt ${startPath}  takoy`)
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
    let data = { "File": sendFile, "Directory" : sendDir, "Path": startPath };
    res.json(data); 
  }
  fileOrDir(); 
});

module.exports = router;
