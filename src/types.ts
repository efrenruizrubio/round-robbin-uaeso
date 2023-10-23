export enum State {
  BLOCKED = 'blocked',
  READY = 'ready',
  EXECUTING = 'executing',
  FINISHED = 'finished',
  IDLE = 'idle',
}

export interface ProcessState {
  index: number;
  state: State;
  arrivalTime: number;
  executionTime: number;
  burstTime: number;
  waitingTime: number;
  turnAroundTime: number;
  quantum: number;
  remainingTime: number;
  responseTime: number;
}

export interface Metric {
  title: string;
  values: string[]
}