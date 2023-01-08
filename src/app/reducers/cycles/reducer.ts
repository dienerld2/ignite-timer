import { produce } from 'immer';

import { ActionTypes } from './actions';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const indexCurrentCycle = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );

      if (indexCurrentCycle === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[indexCurrentCycle].interruptedDate = new Date();
        draft.activeCycleId = null;
      });
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const indexCurrentCycle = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );

      if (indexCurrentCycle === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[indexCurrentCycle].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    }

    default:
      return state;
  }
}
