import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, CyCleProps, cyclesReducer } from "../reducers/reducers";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: CyCleProps[];
  activeCycle: CyCleProps | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CycleContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find(
    (cycle: { id: any }) => cycle.id === activeCycleId
  );

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    });
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
  }
  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: CyCleProps = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });
    // setCycles((state) => [...state, newCycle]);
    setAmountSecondsPassed(0);
  };

  const interruptCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    });

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interrupedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
  };
  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
