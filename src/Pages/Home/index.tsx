import { Play, HandPalm } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { createContext, useState } from 'react'
import NewCycleForm from './components/NewCycleForm'
import CountDown from './components/CoutDown'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface NewCyleFormData {
  task: string
  minutesAmount: number
}
interface CyCleProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishDate?: Date
}

interface CycleContextType {
  activeCycle: CyCleProps | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Inform task'),
  minutesAmount: zod.number().min(1).max(90),
})

export const CyclesContext = createContext({} as CycleContextType)

export const Home = () => {
  const [cycle, setCycle] = useState<CyCleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0,
    },
  })

  const { register, handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const handleCreateNewCycle = (data: NewCyleFormData) => {
    const id = String(new Date().getTime())
    const newCycle: CyCleProps = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const handleInterruptCounter = () => {
    setActiveCycleId(null)
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const task = watch('task')

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <CyclesContext.Provider
            value={{
              activeCycle,
              activeCycleId,
              markCycleAsFinished,
              amountSecondsPassed,
              setSecondsPassed,
            }}
          >
            <NewCycleForm register={register} />

            <CountDown />
          </CyclesContext.Provider>
          {activeCycle ? (
            <StopCountDownButton type="button" onClick={handleInterruptCounter}>
              <HandPalm size={24} /> Stop
            </StopCountDownButton>
          ) : (
            <StartCountDownButton disabled={!task}>
              <Play size={24} /> Start
            </StartCountDownButton>
          )}
        </form>
      </HomeContainer>
    </>
  )
}
