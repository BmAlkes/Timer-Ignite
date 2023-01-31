import { Play } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountButton,
  TaskInput,
} from "./styles";

// controlled //uncontrolled

export const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { erros },
  } = useForm();
  const [task, setTask] = useState("");

  return (
    <>
      <HomeContainer>
        <form action="" onSubmit={handleSubmit}>
          <FormContainer>
            <label htmlFor="task">I Will Work in</label>
            <TaskInput
              id="task"
              list="task-suggestion"
              placeholder="Give a name for your project"
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
              step={5}
              max={90}
              min={5}
              placeholder="+00-"
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
  );
};
