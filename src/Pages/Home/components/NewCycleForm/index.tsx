import React, { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CycleContext } from '../../../../context/CycleContext'

const NewCycleForm = ({ register }: any) => {
  const { activeCycle } = useContext(CycleContext)

  return (
    <FormContainer>
      <label htmlFor="task">I Will Work in</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Give a name for your project"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        placeholder="+00-"
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>Minutes.</span>
    </FormContainer>
  )
}

export default NewCycleForm
