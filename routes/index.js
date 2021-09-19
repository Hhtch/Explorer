const express = require('express');
const router = express.Router();
const { appendFile } = require('fs');
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
const path = require('path');
const clearPath = `D:\\1\\`;
let startPath;
let lastDir;
/* GET home page. */
router.get(`/`, function (req, res, next) {
  startPath = clearPath;
  res.render('index', { title: 'Explorer' });
});

router.get(`/path=\*newdir=:dirName`, function (req, res, next) {
  // GET http://localhost:3000/path=D:/1/dir/Browser 404 Символ * означает, что на ее месте может быть абсолютно любая последовательность символов, не ограниченная по длине.
  console.log( `${req.params.dirName} Name takoy dir posledniy pered +++++ `); 
  let dir = req.params.dirName;
  startPath = startPath + dir + '\\';
  console.log(`${startPath} Name takoy dir stal posle ++++++ `);  
   
  res.render('dir', { title: 'Explorer' });
 });

 router.get(`/lastpath=\*newdir=:dirName`, function (req, res, next) {
  // GET http://localhost:3000/path=D:/1/dir/Browser 404 Символ * означает, что на ее месте может быть абсолютно любая последовательность символов, не ограниченная по длине.
  console.log(req.params);
  startPath = req.params[0];
  console.log(`${startPath} Name takoy dir stal posle ------- `);  
   
  res.render('dir', { title: 'Explorer' });
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

router.post('/getdir', function (req, res, next) {
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
    let data = { "File": sendFile, "Directory" : sendDir, "Path": startPath, "ClearPath": clearPath };
    res.json(data); 
  }
  fileOrDir(); 
});

module.exports = router;
