'use client'

import styles from '@/styles/Process.module.scss'
import { ProcessState } from '@/types'
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ProcessProps {
  process: ProcessState;
  setProcess: Dispatch<SetStateAction<ProcessState[]>>

}

export const Process = ({ process, setProcess }: ProcessProps) => {
  useEffect(() => {
    if(process.state !== 'En ejecución') return
    let timer = setInterval(() => {
      setProcess(prev => {
        const newProcesses = structuredClone(prev)
        const process = prev[0];
        newProcesses[0].executionTime += 1
        return newProcesses
      });
    }, 10);

    return () => clearInterval(timer);
  }, [process.state]);
  

  return (
    <div
      className={styles.container}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        height: process.burstTime,
      }}
    >
      <div style={{width: '100%', height: process.executionTime, backgroundColor: process.state === "Bloqueado" ? "#82fb93" : process.state === "En ejecución" ? "#ff0000" : "#98f6ed"}} />
    </div>
  )
}