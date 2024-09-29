import { DefineComponent } from 'vue';
import {
    useModal,
} from 'vue-final-modal';


let modalId = 0;


export function showInModal(component: DefineComponent, ): void{
    const uid = modalId++;
    const modal = useModal({
        component,
        attrs: {
            uid,
        }, 
    })
}