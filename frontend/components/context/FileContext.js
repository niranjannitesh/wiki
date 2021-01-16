import React, { useMemo } from 'react';
import useSWR from 'swr'
import fetcher from '../../lib/fetch';


const initialState = {
  files: [],
  mutateFiles: () => { },
  error: null,
}

export const FileContext = React.createContext(initialState)
FileContext.displayName = 'FileContext'


export const FileProvider = (props) => {
  const { data: files, error, mutate: mutateFiles } = useSWR('/api/file', fetcher)

  const value = useMemo(
    () => ({
      files,
      error,
      mutateFiles
    }),
    [files, error, mutateFiles]
  )

  return <FileContext.Provider value={value} {...props} />
}

export const useFile = () => {
  const context = React.useContext(FileContext)
  if (context === undefined) {
    throw new Error(`useFile must be used within a FileProvider`)
  }
  return context
}
