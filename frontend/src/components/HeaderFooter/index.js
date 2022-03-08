import React from 'react'
import Navigation from '../Navigation'
import PlayControls from '../PlayControls'

export default function HeaderFooter({ children }) {
  return (
    <>
      <Navigation />
        {children}
      <PlayControls />
    </>
  )
}
