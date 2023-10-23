'use client'

import { Metric, ProcessState, State } from "@/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Process } from "./Process";
import styles from '@/styles/ProcessTable.module.scss'
import useWindowResize from "@/hooks/useWindowResize";

interface ProcessTableProps {
  maxProcesses: number;
  minProcessTime?: number;
  maxProcessTime?: number;
  hasStarted: boolean;
  setMetrics: Dispatch<SetStateAction<Metric[]>>;
}

export const ProcessTable = ({
  maxProcesses,
  maxProcessTime = 400,
  minProcessTime = 100,
  hasStarted,
  setMetrics
}: ProcessTableProps) => {
  const [processes, setProcesses] = useState<ProcessState[]>(Array.from({ length: maxProcesses }, (_, i: number) => {
    const random = Math.floor(Math.random() * (maxProcessTime - minProcessTime + 1) + minProcessTime)
    return {
      index: i,
      arrivalTime: Math.floor(Math.random() * (10)),
      burstTime: random,
      executionTime: 0,
      quantum: Math.floor(Math.random() * (maxProcessTime - random) + 50),
      state: State.IDLE,
      turnAroundTime: 0,
      waitingTime: 0,
      responseTime: 0,
      remainingTime: random
    }
  }))

  const [active, setActive] = useState<number>(0)
  
  const { windowSize } = useWindowResize()

  const auxRef = useRef<ProcessState[]>([]);
  const auxArrayRef = useRef<ProcessState[]>([]);
  const auxTurnAroundRef = useRef<ProcessState[]>([]);
  const timeoutIdRef = useRef<any>();

  useEffect(() => {
  if (hasStarted) {
    auxRef.current = structuredClone(processes);
    const scheduleProcess = () => {
      const p = auxRef.current.shift();
      if (p !== undefined) {
        setActive(p.index)
        if (p.remainingTime > p.quantum) {
          p.remainingTime -= p.quantum;
          p.executionTime += p.quantum;
          p.turnAroundTime = p.executionTime - p.arrivalTime;
          p.state = State.BLOCKED;
          auxRef.current.push(p);
          auxArrayRef.current.push(p);
          auxTurnAroundRef.current.push(p);
        } else {
          if(p.executionTime < p.burstTime){
            p.executionTime += p.remainingTime;
          }
          p.waitingTime = p.executionTime - p.arrivalTime - p.burstTime;
          p.turnAroundTime = p.executionTime - p.arrivalTime;
          p.responseTime = p.executionTime - p.arrivalTime;
          p.state = State.FINISHED;
          auxArrayRef.current.push(p);
          auxTurnAroundRef.current.push(p);
        }        
        setProcesses(prevProcesses => {
          const newProcesses = [...prevProcesses];
          const index = newProcesses.findIndex(process => process.index === p.index);
          newProcesses[index] = p;
          return newProcesses;
        });
      }
      if (auxRef.current.length > 0) {
        timeoutIdRef.current = setTimeout(() => {
          requestAnimationFrame(scheduleProcess);
        }, 300); 

        
        // const totalCpuTime = auxRef.current.reduce((total, process) => total + process.executionTime, 0);
        // const totalTime = auxRef.current.reduce((total, process) => total + process.burstTime, 0);

        const cpuUsage = ((p?.quantum ?? 0) + (p?.arrivalTime ?? 0));
        const idleTime = (p?.arrivalTime);

        const responseTimeArray = auxArrayRef.current.map(process => process.responseTime);
        const minResponseTime = Math.min(...responseTimeArray)
        const meanResponseTime = responseTimeArray.reduce((total, time) => total + time, 0) / responseTimeArray.length;
        const maxResponseTime = Math.max(...responseTimeArray)

        const variance = responseTimeArray.reduce((total, time) => total + Math.pow(time - meanResponseTime, 2), 0) / responseTimeArray.length;
        const standardDeviation = Math.sqrt(variance);
        
        const turnAroundTimes = auxTurnAroundRef.current.map(process => process.turnAroundTime);
        const minTurnAroundTime = Math.min(...turnAroundTimes)
        const meanTurnAroundTime = turnAroundTimes.reduce((total, time) => total + time, 0) / turnAroundTimes.length;
        const maxTurnAroundTime = Math.max(...turnAroundTimes)

        const varianceTurnAround = turnAroundTimes.reduce((total, time) => total + Math.pow(time - meanTurnAroundTime, 2), 0) / turnAroundTimes.length;
        const standardDeviationTurnAround = Math.sqrt(varianceTurnAround);
        
        setMetrics([
          {
            title: 'CPU',
            values: [
              `Tiempo: ${cpuUsage}ms`,
              `Idle: ${idleTime}ms`,
              `Ocupado: ${cpuUsage - (idleTime ?? 0)}ms`,
            ],
          },
          {
            title: 'Tiempo de respuesta',
            values: [
              `Min: ${minResponseTime}ms`,
              `Media: ${meanResponseTime.toFixed(2)}ms`,
              `Max: ${maxResponseTime}ms`,
              `Desviación estándar: ${standardDeviation.toFixed(2)}ms`
            ],
          },
          {
            title: 'Tiempo turnaround',
            values: [
              `Min: ${minTurnAroundTime.toFixed(2)}ms`,
              `Media: ${meanTurnAroundTime.toFixed(2)}ms`,
              `Max: ${maxTurnAroundTime.toFixed(2)}ms`,
              `Desviación estándar: ${standardDeviationTurnAround.toFixed(2)}ms`,
            ],
          }
        ]);
      }else{
        setActive(-1)
      }
    };
    scheduleProcess();
    return () => {
      cancelAnimationFrame(timeoutIdRef.current);
      clearTimeout(timeoutIdRef.current);
    };
  }
}, [hasStarted]);

  return(
    <div className={styles.table} style={{width: `${windowSize - 100}px`, height: `${maxProcessTime + 30}px`}} >
      {processes.map((process, index) => {
        return (
          <div className={styles.process} key={index}>
            <Process
              process={process}
              setProcess={setProcesses}
              hasStarted={hasStarted}
              active={active}
            />
          </div>
        )
      })}
    
    </div>
  )
}