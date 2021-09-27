const { Console } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const { readdir } = require('fs/promises');
const { readFile } = require('fs/promises');
const { open } = require('fs/promises');
const { access } = require('fs/promises');
const path = require('path');
const mime = require('mime');
const { constants } = require('fs/promises');

router.get(`/`, function (req, res, next) {
  const clearPath = `D:\\1\\`;
  res.render('index', { title: 'Explorer', data: JSON.stringify(clearPath) });
});

router.get(`/path=:startPath&dir=:dirName*?`, function (req, res, next) {
  let dir = decodeURIComponent(req.params.dirName);
  let startPath = decodeURIComponent(req.params.startPath);
  startPath = startPath + dir + '\\';
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
});

router.get(`/lastpath=:lastPath`, function (req, res, next) {
  startPath = req.params.lastPath;
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
});

router.get(`/getfile`, function (req, res, next) {
  let url = req.query.path;
  let options = {
    lastModified: false,
    cacheControl: false,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    },
    acceptRanges: false,
  }
  res.setHeader('Content-Type', mime.getType(url));
  res.status(200);
  res.sendFile(url, options, function (err) {
    if (err) {
      res.status(404).send("Sorry! You can't see that.")
    } else {
      console.log('Sent:', path.basename(url))
    }
  })
});

router.get(`/mygetfile`, function (req, res, next) {
  let Path = req.query.path;
  const Dir = "D:\\1";
  const Size = 1048576;
  Path = path.normalize(Path);
  if (path.isAbsolute(Path)) {
    Path = path.relative(Dir, Path);
  }
  let url = path.format({
    dir: Dir,
    base: Path,
  });
  
  async function read(fileName) {
    try {
      const stat = await fs.stat(fileName);
      let fileSizeInBytes = stat.size;
      const content = await readFile(fileName);
      if (fileSizeInBytes > Size) {
        console.log(fileSizeInBytes);
        res.status(400).send("Too Big");
      } else {
        console.log(fileSizeInBytes);
        res.setHeader('Content-Type', mime.getType(url));
        res.status(200).send(content);
      }
    } catch (err) {
      console.error(err);
    }
  }

  read(url);
});


router.get(`/jpg/path=:startPath&file=:fileName`, function (req, res, next) {
  let fileName = req.params.fileName;
  let startPath = req.params.startPath;
  let listName = [];
  let listJpg = [];

  async function jpgContent() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".jpg") {
            listName.push(file);
            readfile = await read(newPath);
            listJpg.push(readfile);
          };

        }
      }
      for (let i = 0; i < listName.length; i++) {
        Name = listName[i];
        Img = listJpg[i];
        if (Name == fileName) {
          res.render('img', { title: 'Explorer', data: JSON.stringify(startPath), imgload: Img });
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function read(fileName) {
    try {
      const content = await readFile(fileName, 'base64', 'r');
      return content;
    } catch (err) {
      console.error(err);
    }

  }
  jpgContent();
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
          res.render('txt', { title: 'Explorer', data: JSON.stringify(startPath), text: TextContent });
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

router.get('/getfile:startPath', function (req, res, next) {
  let txtFile = [];
  let jpgFile = [];
  let startPath = req.params.startPath;
  async function textName() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            txtFile.push(file);
          };
          if (path.extname(file) == ".jpg") {
            jpgFile.push(file);
          };
        }
      }
    } catch (err) {
      console.error(err);
    }
    let data = { "TxtFile": txtFile, "JpgFile": jpgFile }
    res.json(data);
  }
  textName();

});


router.get(`/getdir/path=:getDir`, function (req, res, next) {
  let startPath = decodeURIComponent(req.params.getDir);
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
