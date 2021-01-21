const fetcher = (url) =>
  fetch("http://localhost:5000" + url).then((r) => {
    if (!r.ok) {
      throw new Error("Not 2xx response")
    } else {
      return r.json()
    }
  })

export default fetcher
