const md = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
})
// const mk = require("markdown-it-katex")
const mk = require("@iktakahiro/markdown-it-katex")
import ma from "./anchor"

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
