'use client'

import { useCallback, useEffect, useState } from 'react'

export default function useWindowResize () {
  const [windowSize, setWindowSize] = useState(window?.innerWidth)

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  return { windowSize }
}
