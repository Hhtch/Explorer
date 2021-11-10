console.log("!!",__dirname);
jest.mock('node-fetch');
const fetch = require("node-fetch");
const {Response} = jest.requireActual('node-fetch');
const {createUser} = require("../__mocks__/dir.js");
console.log(createUser,typeof createUser);


test('createUser calls fetch with the right args and returns the user id', async () => {
  //jest.fn().mockReturnValue(Promise.resolve(new Response('4')));
  fetch.mockReturnValue(Promise.resolve(new Response('4')));
  const userId = await createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
    method: 'POST',
  });
  expect(userId).toBe('4');
});






//const {getFileOrDir} = require('../dir');

//const {fetch} = require("node-fetch");
/**/

//jest.mock("../dir");
//const {getFileOrDir} = require("../dir");

/*
describe("Проверим правильность пути", () => {
  test("Когда есть путь, получаем данные",  async () => {
    //getFileOrDir;
    //const response = await request(app).get("/getdir");
    //expect(response.statusCode).toBe(200);
resp = `D:\\1\\`;
   // getFileOrDir.get.mockResolvedValue(resp);
    expect(getFileOrDir(resp)).anything();
    //expect(fetch).toHaveBeenCalledTimes(1);
    //let response = await fetch(`/getdir`);
   // expect(response).toHaveBeenCalledTimes(1);
    //let response = await fetch(`/getdir/path=${encodeURIComponent(data)}`)
    //expect(response.statusCode).toBe(200);      
    //expect(Files.result[0]).toBe('123.txt');
   // expect(Files.result[0]).toEqual('123.txt');
  });
});
*/
/*
//const { response } = require("express");
const fetch = require("node-fetch");
const {Response} = jest.requireActual('node-fetch');
//const {result} = require("./dir");
const app = require("../../routes/index")
const dir = require ("./dir");


*/

/*
test('the data is peanut butter', ()=> {
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
})

jest.mock('node-fetch');


test('createUser calls fetch with the right args and returns the user id', async () => {
  const createUser = async () => {
    const response = await fetch('http://website.com/users', {method: 'POST'});
    const userId = await response.text();
    return userId;
  };

  fetch.mockReturnValue(Promise.resolve(new Response('4')));

  const userId = await createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
    method: 'POST',
  });
  expect(userId).toBe('4');
});


/*const getFileOrDir = async () => {
  const response = await fetch(`/getdir/path=${encodeURIComponent(data)}`, {method: 'GET'});
  result = await response.json();
  return result;
};*/

/*
test('the data is peanut butter', done => {
  function callback(result) {
    try {
      expect(result).toBe(expect.anything());
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});*/