import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton, } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";



interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date

}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCyclesAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]); // Informação de todos os ciclos da aplicação
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // Armazenando ciclos ativo e nulo
    

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

    function markCyclesAsFinished() {
        setCycles((state) =>
        state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
            }),
        )                


    }
    
    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());



        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        reset();
    }

    function handleInterruptCycle() {
                   
        setCycles(
            cycles.map((cycle) => {
            if (cycle.id == activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }),
        )
        setActiveCycleId(null)
    }
    
    

    const task = watch('task');
    const isSubmitDisabled = !task;

    console.log(cycles);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCyclesAsFinished }}>

                
                <NewCycleForm />
                <CountDown />
                </CyclesContext.Provider>

                

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>

                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>

                )}
            </form>
        </HomeContainer>
    )
}