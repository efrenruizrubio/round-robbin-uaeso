'use client'

import { Dispatch, SetStateAction, useEffect } from 'react';

import styles from '@/styles/Process.module.scss'
import { ProcessState, State } from '@/types'

interface ProcessProps {
  process: ProcessState;
  setProcess: Dispatch<SetStateAction<ProcessState[]>>
  hasStarted: boolean;
} 

export const Process = ({ process, setProcess, hasStarted }: ProcessProps) => {
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


  useEffect(() => {
    if(process.state !== State.EXECUTING) return
    let timer = setInterval(() => {
      setProcess(prev => {
        const newProcesses = structuredClone(prev)
        const p = prev[process.index];
        const nextIndex = p.index + 1 < prev.length ? p.index + 1 : 0;

        p.executionTime += 1
        
        if(p.executionTime === p.burstTime) {
          p.state = State.FINISHED;
          if(newProcesses[nextIndex].state !== State.FINISHED) newProcesses[nextIndex].state = State.EXECUTING;
          return newProcesses
        }
        return newProcesses
      });
    }, 5);

    return () => clearInterval(timer);
  }, [process.state]);
  

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
        backgroundColor: process.state === State.EXECUTING ? 
          "#ff0000" 
          : process.state === State.READY || process.state === State.FINISHED 
            ? "#98f6ed" : "##8def8f"
        }} 
      />
    </div>
  )
}