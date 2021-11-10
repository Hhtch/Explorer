async function getFile(fileName: string, path: string) {
  let response = await fetch(`/getfile${encodeURIComponent(path)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },    
  });
  const result = await response.json();
 
  let listName: string[] = [];
  const listTxtFiles = result.TxtFile;
  const listJpgFiles = result.JpgFile;
  

  for (let i = 0; i < listTxtFiles.length; i++) {
    const Name = listTxtFiles[i];
    if (Name == fileName) {
      document.location.href = `/txt/path=${encodeURIComponent(path)}&file=${fileName}`;
    }
  }
  for (let i = 0; i < listJpgFiles.length; i++) {
    const Name = listJpgFiles[i];
    if (Name == fileName) {
      document.location.href = `/jpg/path=${encodeURIComponent(path)}&file=${fileName}`;
    }
  }

  if (listName.indexOf(fileName) == -1) console.log(`Не умею открывать этот файл ${fileName}`)
}