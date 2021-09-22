function back(data) {
  let Path = data;
  partOfPath = Path.split('\\')
  partOfPath.pop();
  partOfPath.pop();
  let StartPath = partOfPath[0] + "\\" + partOfPath[1] + "\\";
  Path = partOfPath.join('\\') + "\\";
  if (StartPath == Path) {
    document.location.href = (`/`);
  } else {
    document.location.href = (`/lastpath=${encodeURIComponent(Path)}`);
  }
};