async function getTxt( fileName )    {
    let response = await fetch('/txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
    let listName = [];
    let listText = [];
    result = await response.json();
    for (let i = 0; i < result.length; i++){
      listName.push( result[i].Name );
      listText.push( result[i].Text );      
    }
    for (let i = 0; i < listName.length; i++) {
      Name = listName[i];          
      if ( Name == fileName){
        //console.log(Name);
        fetch('/txtchoose', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "Name": fileName, 
          }),
        });
        document.location.href = "/txtprint";       
      }
    }
    if(listName.indexOf( fileName ) == -1 ) console.log( `Не умею открывать этот файл ${fileName}` )
    
}