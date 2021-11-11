"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const promises_2 = require("fs/promises");
const promises_3 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
const router = express_1.default.Router();
router.get(`/`, function (req, res, next) {
    res.status(200);
    const clearPath = `D:\\1\\`;
    res.render('index', { title: 'Explorer', data: JSON.stringify(clearPath) });
});
router.get(`/path=:startPath&dir=:dirName?`, function (req, res, next) {
    let dir = decodeURIComponent(req.params.dirName);
    let startPath = decodeURIComponent(req.params.startPath);
    if (typeof req.params.dirName !== "string" || typeof req.params.startPath !== "string") {
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
    if (!url || typeof url != 'string') {
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
    };
    let mim = mime_1.default.getType(url);
    if (!mim || typeof mim !== "string") {
        res.status(400);
        return;
    }
    else {
        res.setHeader('Content-Type', mim);
        res.status(200);
        res.sendFile(url, options, function (err) {
            if (err) {
                res.status(404).send("Sorry! You can't see that.");
            }
            else {
                console.log('Sent:', path_1.default.basename(String(url)));
            }
        });
    }
});
router.get(`/mygetfile`, function (req, res, next) {
    let Path = req.query.path;
    if (!Path || typeof Path != 'string') {
        res.status(400);
        return;
    }
    const Dir = "D:\\1";
    const Size = 1048576;
    Path = path_1.default.normalize(Path);
    if (path_1.default.isAbsolute(Path)) {
        Path = path_1.default.relative(Dir, Path);
    }
    let url = path_1.default.format({
        dir: Dir,
        base: Path,
    });
    async function read(fileName) {
        try {
            const stat = await promises_1.default.stat(fileName);
            let fileSizeInBytes = stat.size;
            const content = await (0, promises_3.readFile)(fileName);
            if (fileSizeInBytes > Size) {
                console.log(fileSizeInBytes);
                res.status(400).send("Too Big");
            }
            else {
                console.log(fileSizeInBytes);
                let mim = mime_1.default.getType(url);
                if (!mim || typeof mim !== "string") {
                    res.status(400);
                    return;
                }
                else {
                    res.setHeader('Content-Type', mim);
                    res.status(200).send(content);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    read(url);
});
router.get(`/jpg/path=:startPath&file=:fileName`, function (req, res, next) {
    let fileName = req.params.fileName;
    let startPath = req.params.startPath;
    if (typeof req.params.fileName !== "string" || typeof req.params.startPath !== "string") {
        res.status(400);
        return;
    }
    let listName = [];
    let listJpg = [];
    async function jpgContent() {
        try {
            const files = await (0, promises_2.readdir)(startPath);
            for (const file of files) {
                const newPath = path_1.default.join(startPath, file);
                const stat = await promises_1.default.stat(newPath);
                if (stat.isFile()) {
                    if (path_1.default.extname(file) == ".jpg") {
                        listName.push(file);
                        const readfile = await read(newPath);
                        if (readfile)
                            listJpg.push(readfile);
                    }
                    ;
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
        }
        catch (err) {
            console.error(err);
        }
    }
    async function read(fileName) {
        try {
            const content = await (0, promises_3.readFile)(fileName, { encoding: "base64", flag: "r" });
            return content;
        }
        catch (err) {
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
            const files = await (0, promises_2.readdir)(startPath);
            for (const file of files) {
                const newPath = path_1.default.join(startPath, file);
                const stat = await promises_1.default.stat(newPath);
                if (stat.isFile()) {
                    if (path_1.default.extname(file) == ".txt") {
                        listName.push(file);
                        const readfile = await read(newPath);
                        if (typeof readfile === "undefined") {
                            res.status(400).send("Can't push undefined");
                        }
                        else {
                            listText.push(readfile);
                        }
                    }
                    ;
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
        }
        catch (err) {
            console.error(err);
        }
    }
    async function read(fileName) {
        try {
            const content = await (0, promises_3.readFile)(fileName, { encoding: "utf8", flag: "r" });
            return content;
        }
        catch (err) {
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
            const files = await (0, promises_2.readdir)(startPath);
            for (const file of files) {
                const newPath = path_1.default.join(startPath, file);
                const stat = await promises_1.default.stat(newPath);
                if (stat.isFile()) {
                    if (path_1.default.extname(file) == ".txt") {
                        txtFile.push(file);
                    }
                    ;
                    if (path_1.default.extname(file) == ".jpg") {
                        jpgFile.push(file);
                    }
                    ;
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        let data = { "TxtFile": txtFile, "JpgFile": jpgFile };
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
            const files = await (0, promises_2.readdir)(startPath);
            for (const file of files) {
                const newPath = path_1.default.join(startPath, file);
                const stat = await promises_1.default.stat(newPath);
                if (stat.isFile()) {
                    sendFile.push(file);
                }
                else if (stat.isDirectory()) {
                    sendDir.push(file);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        let data = { "File": sendFile, "Directory": sendDir, "Path": startPath };
        console.log(data);
        res.json(data);
    }
    fileOrDir();
});
router.get(`/getdir`, async function (req, res, next) {
    const queryPath = req.query.path;
    if (!queryPath || typeof queryPath != "string") {
        res.status(400);
        return;
    }
    let startPath = decodeURIComponent(queryPath);
    let sendFile = [];
    let sendDir = [];
    try {
        const files = await (0, promises_2.readdir)(startPath);
        for (const file of files) {
            const newPath = path_1.default.join(startPath, file);
            const stat = await promises_1.default.stat(newPath);
            if (stat.isFile()) {
                sendFile.push(file);
            }
            else if (stat.isDirectory()) {
                sendDir.push(file);
            }
        }
    }
    catch (err) {
        console.error(err);
    }
    let data = { "File": sendFile, "Directory": sendDir, "Path": startPath };
    console.log(data);
    res.json(data);
});
exports.default = router;
//# sourceMappingURL=index.js.map