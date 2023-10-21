import styles from '@/styles/Legend.module.scss'

export const Legend = () => {
  return (
    <div className={styles.container}>
      <span>
        Leyenda:
      </span>
      <ul className={styles.list}>
        <li className={styles.list_green}>
          <strong>Bloqueado</strong>
        </li>
        <li className={styles.list_blue}>
          <strong>Finalizado</strong>
        </li>
        <li className={styles.list_red}>
          <strong>Ejecutando</strong>
        </li>
      </ul>
    </div>

  )
}