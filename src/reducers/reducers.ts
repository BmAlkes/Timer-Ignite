/* eslint-disable prettier/prettier */
export interface CyCleProps {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupedDate?: Date;
  finishDate?: Date;
}
export interface CyclesState {
  cycles: CyCleProps[];
  activeCycleId: string | null;
}
export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interrupedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    default:
      return state;
  }
};
