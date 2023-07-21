import { HandPalm, Play } from "phosphor-react";
import { CountDowContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(3, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

//interface NewCycleFormData {
//    task: string;
//    minutesAmount: number;
//}

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date

}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]); // Informação de todos os ciclos da aplicação
    const [activeCycleID, setActiveCycleId] = useState<string | null>(null) // Armazenando ciclos ativo e nulo
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleID)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate,
                )

                // eslint-disable-next-line no-empty
                if (secondsDifference >= totalSeconds) {
                    
                }

                setAmountSecondsPassed(secondsDifference)
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds])


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
            if (cycle.id == activeCycleID) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }),
        )
        setActiveCycleId(null)
    }



    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60) //arredondar os minutos
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `Timer: ${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const task = watch('task');
    const isSubmitDisabled = !task;

    console.log(cycles);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm />
                <CountDown />

                

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