'use client'

import { ProcessState } from "@/types";
import { useEffect, useState } from "react";
import { Process } from "./Process";
import styles from '@/styles/ProcessTable.module.scss'
import useWindowResize from "@/hooks/useWindowResize";

interface ProcessTableProps {
  maxProcesses: number;
  minProcessTime?: number;
  maxProcessTime?: number;
  hasStarted?: boolean;
}

export const ProcessTable = ({
  maxProcesses,
  maxProcessTime = 400,
  minProcessTime = 100,
  hasStarted
}: ProcessTableProps) => {

  const [processes, setProcesses] = useState<ProcessState[]>(Array.from({ length: maxProcesses }, (_, i: number) => {
    const random = Math.floor(Math.random() * (maxProcessTime - minProcessTime + 1) + minProcessTime)
    return {
      index: i,
      arrivalTime: i,
      burstTime: random,
      executionTime: 0,
      quantum: Math.floor(Math.random() * (maxProcessTime - random) + minProcessTime),
      state: "Bloqueado",
      turnAroundTime: 0,
      waitingTime: 0
    }
  }))
  
  const { windowSize } = useWindowResize()

  useEffect(() => {
    if(hasStarted) setProcesses((prev) => {
      const newProcesses = structuredClone(prev)
      newProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime)
      newProcesses[0].state = "En ejecución"
      return newProcesses
    })
  }, [hasStarted])

  return(
    <div className={styles.table} style={{width: `${windowSize - 100}px`, height: `${maxProcessTime + 30}px`}} >
      {processes.map((process, index) => {
        return (
          <div className={styles.process} key={index}>
            <Process
              process={process}
              setProcess={setProcesses}
            />
          </div>

        )
      })}
    
    </div>
  )
}