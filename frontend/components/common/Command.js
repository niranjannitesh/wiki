import tinykeys from "tinykeys"
import React, { useEffect, useState, useRef } from "react"
import useDelayedRender from "use-delayed-render"
import { DialogContent, DialogOverlay } from "@reach/dialog"
import QuickMenu from "./QuickMenu"
import { useUI } from "../context/UIContext"

export default function Command() {
  const [open, setOpen] = useState(false)
  const commandRef = useRef()
  const {
    openQuickOpenModal,
    closeQuickOpenModal,
    displayQuickOpenModal,
  } = useUI()

  const { mounted, rendered } = useDelayedRender(displayQuickOpenModal, {
    enterDelay: -1,
    exitDelay: 200,
  })

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      "$mod+k": () =>
        displayQuickOpenModal ? closeQuickOpenModal() : openQuickOpenModal(),
    })
    return () => {
      unsubscribe()
    }
  })

  useEffect(() => {
    if (commandRef.current) {
      // Bounce the UI slightly
      commandRef.current.style.transform = "scale(0.99)"
      commandRef.current.style.transition = "transform 0.1s ease"
      // Not exactly safe, but should be OK
      setTimeout(() => {
        if (commandRef.current) commandRef.current.style.transform = ""
      }, 100)
    }
  })

  return (
    <>
      <DialogOverlay
        className={`screen ${rendered ? "show" : ""}`}
        isOpen={mounted}
        onDismiss={() => closeQuickOpenModal()}
      >
        <DialogContent className="dialog-content" aria-label="Site Navigation">
          <QuickMenu
            style={{ top: "15vh", position: "relative" }}
            ref={commandRef}
            onClickCallback={() => closeQuickOpenModal()}
          />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
