async function getTxt(fileName, path) {
  let response = await fetch(`/gettxt${encodeURIComponent(path)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),
  });
  let listName = [];
  result = await response.json();
  for (let i = 0; i < result.length; i++) {
    listName.push(result[i].Name);
  }
  for (let i = 0; i < listName.length; i++) {
    Name = listName[i];
    if (Name == fileName) {
      document.location.href = `/txt/path=${encodeURIComponent(path)}&file=${fileName}`;
    }
  }
  if (listName.indexOf(fileName) == -1) console.log(`Не умею открывать этот файл ${fileName}`)
}