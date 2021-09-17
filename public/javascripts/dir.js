async function getFileOrDir() {
  let response = await fetch('/getdir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),
  });

  result = await response.json();
  let Files = result.File;
  let Dirs = result.Directory;

  for (let i = 0; i < Files.length; i++) {    
    let list = document.getElementById('files');
    let div = document.createElement('div');
    div.setAttribute('class', 'flex-item');
    div.addEventListener ("click", () => {getTxt( Files[i] )}, false);
    let p = document.createElement('p');
    var img = document.createElement("img");
    img.src = "/images/text_file.png";
    list.appendChild(div);
    p.appendChild(document.createTextNode(Files[i]));
    div.appendChild(img);
    div.appendChild(p);
  };

  for (let i = 0; i < Dirs.length; i++) {
    let list = document.getElementById('dirs');
    let div = document.createElement('div');
    div.setAttribute('class', 'flex-item');
    let p = document.createElement('p');
    var img = document.createElement("img");
    img.src = "/images/folder.png";
    list.appendChild(div);
    p.appendChild(document.createTextNode(Dirs[i]));
    div.appendChild(img);
    div.appendChild(p);
  }
}
getFileOrDir();
