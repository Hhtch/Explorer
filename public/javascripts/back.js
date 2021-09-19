async function back(){
  let response = await fetch('/getdir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),    
  });
  let result = await response.json();
  let ClearPath = result.ClearPath;
  console.log(`${ClearPath} ClearPath`);
  
  console.log(`${result} resultat`);
  let Path = result.Path;
  console.log(`${Path} Path`);
 
    partOfPath = Path.split('\\')
    console.log(`${partOfPath} partOfPath`);
   
    partOfPath.pop();
    
    lastDir = partOfPath[partOfPath.length - 1];
    
    console.log(`${lastDir} lastDir`);
    partOfPath.pop();
 
    console.log(`${partOfPath} partOfPath new`);
    Path = partOfPath.join('\\')+"\\";
    console.log(`${Path} Path ooo`);
    if (Path == ClearPath ){
      document.location.href = (`/`);
    } else {
    document.location.href = (`/lastpath=${Path}newdir=${lastDir}`);
  }  
};