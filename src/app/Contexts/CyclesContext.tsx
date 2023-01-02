import { createContext, ReactNode, useState } from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        }
        return cycle;
      }),
    );
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      }),
    );

    setActiveCycleId(null);
  };

  const valuesContext = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    createNewCycle,
    interruptCurrentCycle,
  };
  return (
    <CyclesContext.Provider value={valuesContext}>
      {children}
    </CyclesContext.Provider>
  );
}
