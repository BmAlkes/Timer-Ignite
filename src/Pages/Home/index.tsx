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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform task'),
  minutes: zod.number().min(5).max(90),
})

interface NewCyleFormData {
  task: string
  minutesAmount: number
}

export const Home = () => {
  const { register, handleSubmit, watch } = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleCreateNewCircle = (data: NewCyleFormData) => {
    console.log(data)
  }

  const task = watch('task')

  return (
    <>
      <HomeContainer>
        <form action="" onSubmit={handleSubmit(handleCreateNewCircle)}>
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
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownContainer>
          <StartCountButton type="submit" disabled={!task}>
            <Play size={24} /> Play
          </StartCountButton>
        </form>
      </HomeContainer>
    </>
  )
}
