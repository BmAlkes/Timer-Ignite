import { Play, HandPalm } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import NewCycleForm from './components/NewCycleForm'
import CountDown from './components/CoutDown'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CycleContext } from '../../context/CycleContext'
import { useContext } from 'react'

interface NewCyleFormData {
  task: string
  minutesAmount: number
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Inform task'),
  minutesAmount: zod.number().min(1).max(90),
})

export const Home = () => {
  const { createNewCycle, activeCycle, interruptCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0,
    },
  })

  const { register, handleSubmit, watch } = newCycleForm

  const task = watch('task')

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(createNewCycle)}>
          <NewCycleForm register={register} />
          <CountDown />
          {activeCycle ? (
            <StopCountDownButton type="button" onClick={interruptCycle}>
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
