const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
//const { stat } = require ('fs/promises');
const path = require('path');
const open = require('fs/promises');
const close = require('fs/promises');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

  let startPath = `D:\\1\\`

  async function momo() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        //console.log(file);
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          console.log("'%s' is a file.", newPath);
          if (path.extname(file) == ".txt") {
            console.log("Open file '%s'.", file);
            read(newPath);
           
          };
          // нужно сделать проверку на тхт и если это он открыть если нет дальше перебирать
        } else if (stat.isDirectory()) {
          console.log("'%s' is a directory.", newPath);
        }
      }
      //await read(file);
    } catch (err) {
      console.error(err);
    }

  }
    

  async function read(fileName) {
    let file;
try {
  file = await fs.open(fileName, 'r');
  const stat = await file.stat();
  // use stat
    console.log(stat);
    const promise = readFile(fileName,'utf8', 'r' );
    await promise;
    console.log(promise);
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
} finally {
  await file.close(fileName);
}


    /*try {
      //const controller = new AbortController();
      //const { signal } = controller;
      //const promise = readFile(fileName, { signal });
      const promise = readFile(fileName,'utf8', 'r' );
      // Abort the request before the promise settles.
      //controller.abort();

      await promise;
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }*/
  }
  momo();
  //read(`D:\\1\\123.txt`);



});




/*import { unlinkSync } from 'fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}*/

//import { readdir } from 'fs/promises';



module.exports = router;
