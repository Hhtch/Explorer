async function getFile(fileName, path) {
  let response = await fetch(`/getfile${encodeURIComponent(path)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },    
  });
  result = await response.json();
 
  let listName = [];
  listTxtFiles = result.TxtFile;
  listJpgFiles = result.JpgFile;
  

  for (let i = 0; i < listTxtFiles.length; i++) {
    Name = listTxtFiles[i];
    if (Name == fileName) {
      document.location.href = `/txt/path=${encodeURIComponent(path)}&file=${fileName}`;
    }
  }
  for (let i = 0; i < listJpgFiles.length; i++) {
    Name = listJpgFiles[i];
    if (Name == fileName) {
      document.location.href = `/jpg/path=${encodeURIComponent(path)}&file=${fileName}`;
    }
  }

  if (listName.indexOf(fileName) == -1) console.log(`Не умею открывать этот файл ${fileName}`)
}