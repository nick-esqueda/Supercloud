import React from 'react'
import Navigation from '../Navigation'

export default function HeaderFooter({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
