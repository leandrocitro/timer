export function NewCycleForm () {
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