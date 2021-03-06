async function getFileOrDir(data: string) {

  let response = await fetch(`/getdir/path=${encodeURIComponent(data)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const result = await response.json();

  let Files = result.File;
  let Dirs = result.Directory;
  let Path = result.Path;

  for (let i = 0; i < Files.length; i++) {
    let list = document.getElementById('files');
    if(!list){
      console.error("files not found");
      return;
    }
    let div = document.createElement('div');
    div.setAttribute('class', 'flex-item');
    div.addEventListener("click", () => { getFile(Files[i], Path) }, false);
    let p = document.createElement('p');
    var img = document.createElement("img");
    img.src = "../images/text_file.png";
    list.appendChild(div);
    p.appendChild(document.createTextNode(Files[i]));
    div.appendChild(img);
    div.appendChild(p);
  };

  for (let i = 0; i < Dirs.length; i++) {
    let list = document.getElementById('dirs');
    if(!list){
      console.error("dirs not found");
      return;
    }
    let div = document.createElement('div');
    div.setAttribute('class', 'flex-item');
    const Directory = Dirs[i];
    div.addEventListener("click", () => { document.location.href = `/path=${encodeURIComponent(Path)}&dir=${encodeURIComponent(Dirs[i])}` }, false);
    let p = document.createElement('p');
    var img = document.createElement("img");
    img.src = "../images/folder.png";
    list.appendChild(div);
    p.appendChild(document.createTextNode(Dirs[i]));
    div.appendChild(img);
    div.appendChild(p);
  }  
};

