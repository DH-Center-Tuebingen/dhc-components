
export function useModelInput(emit: Function, name: string) {
    return function (event: Event) {
        const target = event.target as HTMLInputElement
        emit(`update:${name}`, target.value)
    };
}

export function useModelCheckbox(emit: Function, name: string) {
    return function (event: Event) {
        const target = event.target as HTMLInputElement
        emit(`update:${name}`, target.checked)
    };
}