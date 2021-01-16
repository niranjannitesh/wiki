import tinykeys from "tinykeys"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "./Logo"
import useDelayedRender from "use-delayed-render"
import { DialogContent, DialogOverlay } from "@reach/dialog"
import QuickMenu from "./QuickMenu"

export default function Command() {
  const [open, setOpen] = useState(false)

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200,
  })

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      "$mod+k": () => setOpen((o) => !o),
    })
    return () => {
      unsubscribe()
    }
  })

  return (
    <>
      <CommandButton title="⌘K" onClick={() => setOpen(true)}>
        <Logo width="36px" height="36px" />
      </CommandButton>

      <DialogOverlay
        className={`screen ${rendered ? "show" : ""}`}
        isOpen={mounted}
        onDismiss={() => setOpen(false)}
      >
        <DialogContent className="dialog-content" aria-label="Site Navigation">
          <QuickMenu style={{ top: 190, position: "relative" }} />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

const CommandButton = styled.button`
  width: 50px;
  height: 50px;

  background-color: #f5f5f5;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  :focus {
    outline: none;
  }
`
