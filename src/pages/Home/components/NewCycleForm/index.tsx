import { useForm } from 'react-hook-form';
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

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

export function NewCycleForm () {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    return (
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        disabled= {!!activeCycle}
                        {...register('task')}
                    />


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
                        disabled= {!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>
    )
}