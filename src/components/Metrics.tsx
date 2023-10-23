import { Metric } from "@/types";
import { Card } from "./Card";

interface MetricsProps {
  metrics: Metric[];
}

export const Metrics = ({ metrics }: MetricsProps) => {
  return (
    <div style={{display: 'grid', gap: '1rem', placeContent: 'center', gridTemplateColumns: 'repeat(3, minmax(100px, 300px))'}}>
      {metrics.map((metric) => (
          <Card metric={metric} key={metric.title}/>
        ))
      }
    </div>
  )
}