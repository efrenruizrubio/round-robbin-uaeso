import styles from '@/styles/Legend.module.scss'

export const Legend = () => {
  return (
    <div className={styles.container}>
      <span>
        Leyenda:
      </span>
      <ul className={styles.list}>
        <li className={styles.list_red}>
          <strong>Ejecutando</strong>
        </li>
        <li className={styles.list_blue}>
          <strong>Cola lista / Terminado</strong>
        </li>
        <li className={styles.list_green}>
          <strong>Bloqueado</strong>
        </li>
      </ul>
    </div>

  )
}