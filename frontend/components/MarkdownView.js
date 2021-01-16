const md = require("markdown-it")({})
const mk = require("markdown-it-katex")
import ma from "../lib/anchor"

md.use(mk).use(ma)

export default function MarkdownView({ file }) {
  const html = md.render(file.contents)

  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: html }}></article>
    </div>
  )
}
