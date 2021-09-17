async function getTxt( fileName )    {
    let response = await fetch('/gettxt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
    let listName = [];
    result = await response.json();
    for (let i = 0; i < result.length; i++){
      listName.push( result[i].Name );            
    }
    for (let i = 0; i < listName.length; i++) {
      Name = listName[i];          
      if ( Name == fileName){
        document.location.href = `/txtprint/${fileName}`;   
      }
    }
    if(listName.indexOf( fileName ) == -1 ) console.log( `Не умею открывать этот файл ${fileName}` )   
}