import React, { useMemo } from 'react';

const initialState = {
  displayQuickOpenModal: false,
}

export const UIContext = React.createContext(initialState)
UIContext.displayName = 'UIContext'

function uiReducer(state, action) {
  switch (action.type) {
    case 'OPEN_QUICK_OPEN_MODAL':
      return { ...state, displayQuickOpenModal: true }
    case 'CLOSE_QUICK_OPEN_MODAL':
      return { ...state, displayQuickOpenModal: false }
  }
}


export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openQuickOpenModal = () => dispatch({ type: 'OPEN_QUICK_OPEN_MODAL' })
  const closeQuickOpenModal = () => dispatch({ type: 'CLOSE_QUICK_OPEN_MODAL' })

  const value = useMemo(
    () => ({
      ...state,
      openQuickOpenModal,
      closeQuickOpenModal,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}
