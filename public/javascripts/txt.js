async function getTxt()    {
    let response = await fetch('/txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });

    result = await response.json();
    console.log(result);        
}
getTxt();
