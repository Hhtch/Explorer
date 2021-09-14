async function getFileOrDir()    {
  let Files = [],
      Dirs = [];  
  let response = await fetch('/dir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
 

    result = await response.json();
    console.log(result.Directory);
    console.log(result);
    for (let i=0; i < result.lenght; i++ ){
      let file = result[i].File;
      let dir = result[i].Directory;
      console.log(file);
      console.log(dir);
      Files.push( file );
      Dirs.push( dir );
      return Files.push( file );     
    }
    //console.log(dir);
    console.log(Dirs);
    console.log(Files);
}
getFileOrDir();
