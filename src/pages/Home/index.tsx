import { Play } from "phosphor-react";
import { CountDowContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <input id="task" />

                    <label htmlFor="">Durante</label>
                    <input type="number" id="minutesAmount" />

                    <span>Minutos.</span>
                </FormContainer>

                <CountDowContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDowContainer>

                <button type="submit">
                    <Play size={24} />
                    Começar
                </button>
            </form>


        </HomeContainer>
    )
}