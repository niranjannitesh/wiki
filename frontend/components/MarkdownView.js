export default function MarkdownView({ html }) {
  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: html }}></article>
    </div>
  )
}
