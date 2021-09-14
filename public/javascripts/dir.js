async function getFileOrDir()    {
  let response = await fetch('/dir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(),
  });
 
  result = await response.json();
  let Files = result.File;
  let Dirs = result.Directory;
/*  
  let p = document.createElement("p");
  document.body.appendChild(p);

  



// родительский элемент UL
02
var list = document.getElementById('list2')
03
// элемент для вставки перед ним (первый LI)
04
var firstLi = list.getElementsByTagName('LI')[0]
05
 
06
// новый элемент
07
var newListElem = document.createElement('LI')
08
newListElem.innerHTML = 'Новый элемент списка'
09
 
10
// вставка
11
list.insertBefore(newListElem, firstLi)
*/



  for  ( let i=0; i < Files.length; i++){
     //console.log(Files[i]);
    let list = document.getElementById('files');
    let li = document.createElement('Li');
    li.innerHTML = Files[i];
    list.appendChild(li);
    
  };

  for  ( let i=0; i < Dirs.length; i++){
    //console.log(Files[i]);
   let list = document.getElementById('dirs'); 
   let li = document.createElement('li');
   li.innerHTML = Dirs[i];
   list.appendChild(li);
 };
  //console.log(Dirs);
  //console.log(Files);
    
}
getFileOrDir();
