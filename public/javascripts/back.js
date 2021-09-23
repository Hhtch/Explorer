function back(data) {
  let Path = data;
  partOfPath = Path.split('\\')
  let StartPath = partOfPath[0] + "\\" + partOfPath[1] + "\\";
  if (StartPath == Path) {
    document.location.href = (`/`);
  } else {
    partOfPath.pop();
    partOfPath.pop();
    Path = partOfPath.join('\\') + "\\";
    if (StartPath == Path) {
      document.location.href = (`/`);
    } else {
      document.location.href = (`/lastpath=${encodeURIComponent(Path)}`);
    }
  }

};