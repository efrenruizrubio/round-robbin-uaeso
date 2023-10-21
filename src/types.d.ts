export interface ProcessState {
  index: number;
  state: 'En ejecución' | 'Bloqueado' | 'Terminado';
  arrivalTime: number;
  executionTime: number;
  burstTime: number;
  waitingTime: number;
  turnAroundTime: number;
  quantum: number;
}