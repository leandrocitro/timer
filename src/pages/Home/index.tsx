import { Play } from "phosphor-react";
import { CountDowContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para o seu projeto" />

                    <datalist id="task-suggestions">
                        <option value="Estudar Inglês" />
                        <option value="Estudar React" />
                        <option value="Estudar Node" />
                        <option value="Estudar React Native" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDowContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDowContainer>

                <StartCountDownButton disabled type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>


        </HomeContainer>
    )
}