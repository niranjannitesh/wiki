import { useFile } from "../components/context/FileContext"

const md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
})
// const mk = require("markdown-it-katex")
const mk = require("@iktakahiro/markdown-it-katex")
import ma from "./anchor"
import mf from "./linkFile"

md.use(mk, { throwOnError: false, errorColor: " #cc0000" }).use(ma)

export default md

const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex("target")
  var bIndex = tokens[idx].attrIndex("rel")

  const hrefIndex = tokens[idx].attrIndex("href")
  const hrefValue = tokens[idx].attrs[hrefIndex][1]
  const domain = hrefValue
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0]
  const isSameDomain = domain === window.location.hostname

  if (!isSameDomain) {
    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]) // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank" // replace value of existing attr
    }

    if (bIndex < 0) {
      tokens[idx].attrPush(["rel", "nofollow"]) // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = "nofollow" // replace value of existing attr
    }
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

/**
 * Hooks
 */

function getHeadings(html) {
  const el = document.createElement(`div`)
  el.innerHTML = html
  const all_headings = el.querySelectorAll("h1, h2, h3, h4, h5, h6")
  if (all_headings.length === 0) {
    return
  }
  const response = []
  all_headings.forEach((x) => {
    response.push({
      text: x.innerHTML,
      id: x.id,
    })
  })
  return response
}

function autoLinkFiles(html, files) {
  const file_link_regex = /\[\[(.*)\]\]/g
  const matches = html.match(file_link_regex)
  if (matches) {
    for (let match of matches) {
      const text = match.replace("[[", "").replace("]]", "").trim()
      let [file_name, custom_label] = text.split("|")
      file_name = file_name.trim()
      const file = files.find((x) => x.title === file_name)
      if (file) {
        html = html.replace(
          match,
          `<a class="auto-file-link" data-file-id="${file.id}" href="/file/${
            file.id
          }">${custom_label || file_name}</a>`
        )
      }
    }
  }
  return html
}

export function useMarkdown(contents) {
  const { files } = useFile()
  let html = autoLinkFiles(md.render(contents), files)

  const all_headings = getHeadings(html)

  return { html, all_headings }
}
