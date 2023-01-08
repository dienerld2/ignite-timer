import { createContext, ReactNode, useReducer, useState } from 'react';

enum ActionReducer {
  MARK_CURRENT_CYCLE_AS_FINISHED,
  ADD_NEW_CYCLE,
  INTERRUPT_CURRENT_CYCLE,
}

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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case ActionReducer.ADD_NEW_CYCLE: {
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        }

        case ActionReducer.INTERRUPT_CURRENT_CYCLE: {
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() };
              }
              return cycle;
            }),
            activeCycleId: null,
          };
        }

        case ActionReducer.MARK_CURRENT_CYCLE_AS_FINISHED: {
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              }
              return cycle;
            }),
            activeCycleId: null,
          };
        }

        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );

  const { activeCycleId, cycles } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: ActionReducer.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    });
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

    dispatch({
      type: ActionReducer.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });

    // setCycles((state) => [...state, newCycle]);
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionReducer.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    });
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
