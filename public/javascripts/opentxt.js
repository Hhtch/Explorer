async function openTxt( )    {
    let response = await fetch('/txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
    result = await response.json();

    let res = await fetch('/txtchoose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(),
  });
    currentTxt = await res.json();
    console.log(currentTxt.Name);

    let listName = [];
    let listText = [];
    
    for (let i = 0; i < result.length; i++){
      listName.push( result[i].Name );
      listText.push( result[i].Text );      
    }
            
    for (let i = 0; i < listName.length; i++) {
      Name = listName[i];          
      if ( Name == currentTxt.Name){        
        let p = document.createElement('p');
        p.appendChild(document.createTextNode( listText[i] ));
        document.body.appendChild(p);
      }
    }
    
  console.log('aaa');  
}
openTxt( );