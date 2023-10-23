'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import styles from '@/styles/Process.module.scss'
import { ProcessState, State } from '@/types'

interface ProcessProps {
  process: ProcessState;
  setProcess: Dispatch<SetStateAction<ProcessState[]>>
  hasStarted: boolean;
  active: number;
} 

export const Process = ({ process, setProcess, hasStarted, active }: ProcessProps) => {
  useEffect(() => {
    if(!hasStarted || process.index === 0) return
    setTimeout(() => {
      setProcess(prev => {
        const newProcesses = structuredClone(prev)
        const index = newProcesses.findIndex((p) => p.index === process.index)
        newProcesses[index].state = State.READY;
        return newProcesses
      })
    }, process.arrivalTime)
  }, [hasStarted])

  return (
    <div
      className={styles.container}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        height: process.burstTime,
        backgroundColor: process.state === State.IDLE ? "white" : process.state === State.READY ? "#98f6ed" : "white"
      }}
    >
      <div style={{
        width: '100%',
        height: process.executionTime - 2,
        backgroundColor: active === process.index ? "#ff0000" : "#98f6ed"
        }} 
      />
  </div>
)

}