'use client'

import { useState } from "react";
import { Legend } from "./Legend";
import { Menu } from "./Menu"
import { Metrics } from "./Metrics";
import { ProcessTable } from "./ProcessTable";
import styles from '@/styles/Program.module.scss'
import { Metric } from "@/types";

const MAX_PROCESSES = 30;

export const Program = () => {
  const [start, setStart] = useState(false)
  const [metrics, setMetrics] = useState<Metric[]>([])
  return (
    <section className={styles.container}>
      <Menu startProgram={() => setStart(true)}/>
      <ProcessTable maxProcesses={MAX_PROCESSES} hasStarted={start} setMetrics={setMetrics}/>
      <Metrics metrics={metrics} />
      <Legend />
    </section>
  )
}