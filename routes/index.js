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

router.get(`/txtprint:fileName`, function (req, res, next) {
  console.log(req.params);
  console.log( req.params.fileName );    
  let fileName = req.params.fileName;
  let data = [];
  let listName = [];
  let listText = [];
  let aaaaa; 
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
      //console.log(data);       
      for (let i = 0; i < data.length; i++){
        listName.push( data[i].Name );
        listText.push( data[i].Text );      
      }
      //console.log(listName);     
      //console.log(listText); 
      for (let i = 0; i < listName.length; i++) {
        Name = listName[i];
        textetot = listText[i];          
        if ( Name == fileName){ 
          aaaaa = textetot;
          console.log(aaaaa);      
          res.render('txt', { fileName: aaaaa });
        }
      }
      }  
    } catch (err) {
      console.error(err);
    }
    //res.send(data);
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
 

  console.log(aaaaa);


  
});
/*
router.post('/txtchoose', function (req, res, next) {
  nnn = req.body.Name;
  console.log( nnn );    
  res.json({"Name":nnn });
//res.render('txt',{ currentTxt: req.body.Name });  
});
*/
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
