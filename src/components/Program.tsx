'use client'

import { useState } from "react";
import { Legend } from "./Legend";
import { Menu } from "./Menu"
import { Metrics } from "./Metrics";
import { ProcessTable } from "./ProcessTable";
import styles from '@/styles/Program.module.scss'

const MAX_PROCESSES = 30;

export const Program = () => {
  const [start, setStart] = useState(false)
  return (
    <section className={styles.container}>
      <Menu startProgram={() => setStart(true)}/>
      <ProcessTable maxProcesses={MAX_PROCESSES} hasStarted={start} />
      <Metrics />
      <Legend />
    </section>
  )
}