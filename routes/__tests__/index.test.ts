import request from "supertest";
import {app} from "../../app";
  
  describe("Test the root path /mygetfile", () => {
    test("It should response the GET method /mygetfile?path=some_path", async() => {
      await request(app)
      .get(`/mygetfile?path=D:/1/photo.jpg`)  
      .expect(200)
      .expect('Content-Type', 'image/jpeg')    
        });  
    });
 
    
    describe("Test the root path /getdir?path=D:/1/Browser", () => {
      test("It should response the GET method /getdir?path=D:/1/Browser", async() => {
        await request(app)
        .get(`/getdir/path=D%3A%5C1%5CBrowser%5C`)
        .expect('Content-Type', /json/)
        .expect(200, {
          File: [
            'Accessible.tlb',
            'AccessibleHandler.dll',
            'AccessibleMarshal.dll',
            'application.ini',
            'chrome.manifest',
            'd3dcompiler_47.dll',
            'dependentlibs.list',
            'firefox.exe',
            'firefox.VisualElementsManifest.xml',
            'freebl3.dll',
            'IA2Marshal.dll',
            'lgpllibs.dll',
            'libEGL.dll',
            'libGLESv2.dll',
            'mozavcodec.dll',
            'mozavutil.dll',
            'mozglue.dll',
            'nss3.dll',
            'nssckbi.dll',
            'nssdbm3.dll',
            'omni.ja',
            'platform.ini',
            'plugin-container.exe',
            'plugin-hang-ui.exe',
            'precomplete',
            'qipcap.dll',
            'removed-files',
            'softokn3.dll',
            'tbb_version.json',
            'update-settings.ini',
            'updater.exe',
            'updater.ini',
            'xul.dll'
          ],
          Directory: [ 'browser', 'defaults', 'fonts', 'TorBrowser' ],
          Path: 'D:\\1\\Browser\\'
        })            
          });  
      }); 
       
         
    
     
/*
describe("Test the root path", () => {
  test("It should response the GET method from start page /", async() => {
    const res = await request(app)
    .get("/")
    .send({ title: 'Explorer', data: JSON.stringify(`D:\\1\\`) });
    expect(res.statusCode).toBe(200);        
      });  
  });

  describe("Test the root path /path=:startPath&dir=:dirName*?", () => {
    test("It should response the GET method /path=:startPath&dir=:dirName*?", async() => {
      const res = await request(app)
      .get(`/path=D%3A%5C1%5C&dir=Browser`)
      .send({ title: 'Explorer', data: JSON.stringify(`D:\\1\\Brows\\`) }); // А чо я в сенд вставляю ересь а тест проходит, что этот сенд вообще делает
      expect(res.statusCode).toBe(200);        
        });  
    });

  describe("Test the root path /lastpath=:lastPath", () => {
      test("It should response the GET method /lastpath=:lastPath", async() => {
        const res = await request(app)
        .get(`/lastpath=D%3A%5C1%5CBrowser%5C`);  
        expect(res.statusCode).toBe(200);        
          });  
      });

describe("Test the root path /mygetfile", () => {
    test("It should response the GET method /mygetfile?path=some_path", async() => {
      const res = await request(app)
      .get(`/mygetfile?path=D:/1/photo.jpg`);  
      expect(res.statusCode).toBe(200);        
        });  
    }); 
      

  describe("Test the root path /jpg/path=:startPath&file=:fileName", () => {
    test("It should response the GET method /jpg/path=:startPath&file=:fileName", async() => {
      const res = await request(app)
      .get(`/jpg/path=D%3A%5C1%5C&file=photo.jpg`);
      //.send(`D:\\1\\photo.jpg`);
      expect(res.statusCode).toBe(200);        
        });  
    });

    describe("Test the root path /txt/path=:startPath&file=:fileName", () => {
      test("It should response the GET method /txt/path=:startPath&file=:fileName", async() => {
        const res = await request(app)
        .get(`/txt/path=D%3A%5C1%5C&file=123.txt`);
        expect(res.statusCode).toBe(200);        
          });  
      });

    describe("Test the root path /getfile:startPath", () => {
      test("It should response the GET method /getfile:startPath", async() => {
        const res = await request(app)
        .get(`/getfileD%3A%5C1%5CBrowser%5C`);    
        expect(res.statusCode).toBe(200);        
          });  
      });
*/



//console.log(rout);

//jest.mock("../index");

//const {aaa} = require("../index");
/*
describe('GET /', function(){
  it('Проверяем /', (done)=> {
    request(router)
      .get('/')
      //.set('Accept', 'json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});
*/
/*
describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
*/





/*
const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
})
*/




/*
describe("Test the root path", () => {
    test("It should response the GET method", async () => {
    //expect(aaa).toHaveBeenCalled();
      //expect(aaa).toBe(`D:\\1\\`)
      const response = await request(router).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
*/



