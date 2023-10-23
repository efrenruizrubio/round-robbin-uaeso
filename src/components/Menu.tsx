'use client'

import styles from '@/styles/Menu.module.scss'
import { useState } from 'react'

export const Menu = ({startProgram, stopProgram}: {startProgram: () => void, stopProgram: () => void}) => {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className={styles.container}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.container_button}
      >
        Archivo
      </button>
      
      <ul className={`${styles.container_options} ${showMenu ? styles.container_options_open : ''}`}>
        <li>
          <button
            onClick={() => {
              setShowMenu(!showMenu)
              startProgram()
            }}
            className={styles.container_button}
          >
            Ejecutar
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setShowMenu(!showMenu)
              stopProgram()
            }}
            className={styles.container_button}
          >
            Terminar
          </button>
        </li>
      </ul>
    </div>
  )
}