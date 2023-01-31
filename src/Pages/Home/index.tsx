import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountButton,
  TaskInput,
} from './styles'
import { useState } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform task'),
  minutesAmount: zod.number().min(5).max(90),
})

interface NewCyleFormData {
  task: string
  minutesAmount: number
}

interface CyCleProps {
  id: string
  task: string
  minutesAmount: number
}

export const Home = () => {
  const [cycle, setCycle] = useState<CyCleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, watch, handleSubmit, reset } = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0,
    },
  })

  const handleCreateNewCycle = (data: NewCyleFormData) => {
    const id = String(new Date().getTime())
    const newCycle: CyCleProps = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = Math.floor(currentSeconds % 60)

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  console.log(cycle)
  const task = watch('task')

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormContainer>
            <label htmlFor="task">I Will Work in</label>
            <TaskInput
              id="task"
              list="task-suggestion"
              placeholder="Give a name for your project"
              {...register('task')}
            />
            <datalist id="task-suggestion">
              <option value="Study" />
              <option value="Workout" />
              <option value="Meditantion" />
              <option value="Read a Book" />
            </datalist>
            <label htmlFor="minutesAmount">During</label>
            <MinutesAmountInput
              id="minutesAmount"
              type="number"
              max={90}
              min={5}
              placeholder="+00-"
              {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>Minutes.</span>
          </FormContainer>
          <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CountdownContainer>
          <StartCountButton disabled={!task}>
            <Play size={24} /> Play
          </StartCountButton>
        </form>
      </HomeContainer>
    </>
  )
}
