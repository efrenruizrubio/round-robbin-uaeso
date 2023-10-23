import { Metric } from "@/types";

interface CardProps {
  metric: Metric;
}

export const Card = ({metric}: CardProps) => {
  return (
    <article 
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        backgroundColor: 'white',
        height: '100%',
        gap: '1rem'
    }}>
      <h3>{metric.title}</h3>
      <ul style={{display: 'grid', gap: '1rem'}}>
        {metric.values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </article>
  )
}