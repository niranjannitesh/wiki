import { useRouter } from "next/router"
import { useEffect } from "react"

export default function MarkdownView({ html }) {
  const router = useRouter()

  useEffect(() => {
    const custom_links = document.querySelectorAll("a.auto-file-link")
    for (const link of custom_links) {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const fileId = e.target.dataset.fileId
        if (fileId) {
          router.push("/file/" + fileId)
        }
      })
    }
  }, [])

  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: html }}></article>
    </div>
  )
}
