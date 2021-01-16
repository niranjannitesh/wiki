const fetcher = (url) =>
  fetch("http://localhost:5000" + url).then((r) => r.json())

export default fetcher
