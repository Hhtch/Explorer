import express from 'express';
import fs from 'fs/promises';
import { readdir } from 'fs/promises';
import { readFile } from 'fs/promises';
import { open } from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import mime from 'mime';
import { Request, Response, Router } from 'express';

const router = express.Router();

router.get(`/`, function (req, res, next) {
  res.status(200);
  const clearPath = `D:\\1\\`;
  res.render('index', { title: 'Explorer', data: JSON.stringify(clearPath) });
  
});

router.get(`/path=:startPath&dir=:dirName?`, function (req: Request, res:Response, next) {
  let dir: string = decodeURIComponent(req.params.dirName);
  let startPath: string = decodeURIComponent(req.params.startPath);
  if (typeof req.params.dirName !== "string" || typeof req.params.startPath !== "string" ) {
    res.status(400);
    return;     
    }

  startPath = startPath + dir + '\\';
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
  
});

router.get(`/lastpath=:lastPath`, function (req, res, next) {
  let startPath = req.params.lastPath;
  res.render('dir', { title: 'Explorer', data: JSON.stringify(startPath) });
});

router.get(`/getfile`, function (req, res, next) {
  let url = req.query.path;
  if(!url || typeof url != 'string' ){
    res.status(400);
    return;
  } 
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
  let mim = mime.getType(url);
  if(!mim || typeof mim !== "string" )
    {
      res.status(400);
      return;
    } else {
  res.setHeader('Content-Type', mim);
  
  res.status(200);
  res.sendFile(url, options, function (err) {
    if (err) {
      res.status(404).send("Sorry! You can't see that.")
    } else {
      console.log('Sent:', path.basename( String(url) ))
    }
  })
}
});

router.get(`/mygetfile`, function (req, res, next) {
  let Path = req.query.path;
  if(!Path || typeof Path != 'string' ){
    res.status(400);
    return;
  } 
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

  async function read(fileName: string) {
    try {
      const stat = await fs.stat(fileName);
      let fileSizeInBytes = stat.size;
      const content = await readFile(fileName);
      if (fileSizeInBytes > Size) {
        console.log(fileSizeInBytes);
        res.status(400).send("Too Big");
      } else {
        console.log(fileSizeInBytes);
        let mim = mime.getType(url);
        if(!mim || typeof mim !== "string" )
          {
            res.status(400);
            return;
          } else {
        res.setHeader('Content-Type', mim);
        res.status(200).send(content);
      }
    }
    } catch (err) {
      console.error(err);
    }
  }  read(url);
});



router.get(`/jpg/path=:startPath&file=:fileName`, function (req: Request, res: Response, next) {
  let fileName = req.params.fileName;
  let startPath = req.params.startPath;
  if (typeof req.params.fileName !== "string" || typeof req.params.startPath !== "string" ) {
    res.status(400);
    return;     
    }
  let listName: string[] = [];
  let listJpg: string[] = [];

  async function jpgContent() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".jpg") {
            listName.push(file);
            const readfile = await read(newPath);
            if(readfile)
            listJpg.push(readfile);
          };

        }
      }
      for (let i = 0; i < listName.length; i++) {
        const Name = listName[i];
        const Img = listJpg[i];
        if (Name == fileName) {
          res.render('img', { title: 'Explorer', data: JSON.stringify(startPath), imgload: Img });
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function read(fileName: string) {
    try {
      const content = await readFile(fileName, {encoding: "base64", flag: "r" });
      return content;
    } catch (err) {
      console.error(err);
    }

  }
  jpgContent();
});

router.get(`/txt/path=:startPath&file=:fileName`, function (req: Request, res: Response, next) {
  let fileName = req.params.fileName;
  let startPath = req.params.startPath;
  let listName: string[] = [];
  let listText: string[] = [];

  async function textContent() {
    try {
      const files = await readdir(startPath);
      for (const file of files) {
        const newPath = path.join(startPath, file);
        const stat = await fs.stat(newPath);
        if (stat.isFile()) {
          if (path.extname(file) == ".txt") {
            listName.push(file);
            const readfile = await read(newPath);
            if(typeof readfile === "undefined"){
              res.status(400).send("Can't push undefined");
            }else{
            listText.push(readfile);
            }
          };

        }
      }
      for (let i = 0; i < listName.length; i++) {
        const Name = listName[i];
        const TextContent = listText[i];
        if (Name == fileName) {
          res.render('txt', { title: 'Explorer', data: JSON.stringify(startPath), text: TextContent });
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function read(fileName: string) {
    try {
      const content = await readFile(fileName, {encoding: "utf8", flag: "r" });
      return content;
    } catch (err) {
      console.error(err);
    }

  }
  textContent();

});

router.get('/getfile:startPath', function (req: Request, res: Response, next) {
  let txtFile: string[] = [];
  let jpgFile: string[] = [];
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


router.get(`/getdir/path=:getDir`, function (req: Request, res: Response, next) {
  let startPath = decodeURIComponent(req.params.getDir);
  let sendFile: string[] = [];
  let sendDir: string[] = [];
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
    console.log(data);
    res.json(data);
  }
  fileOrDir();
});

router.get(`/getdir`, async function (req, res, next) {
  const queryPath = req.query.path
  if(!queryPath || typeof queryPath != "string" ){
    res.status(400);
    return;
  }
  let startPath = decodeURIComponent(queryPath);
  let sendFile = [];
  let sendDir = [];
  
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
    console.log(data);
    res.json(data);
  
  
});



export default router;
