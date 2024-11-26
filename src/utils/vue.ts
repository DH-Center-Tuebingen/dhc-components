
import { DefineComponent } from 'vue';

export function useComponent<Props>(component: any, props: Props): DefineComponent{
  return {
    // @ts-ignore
    components: { component },
    setup() {
      return { props };
    },
    template: `<component v-bind="props" />`,
    }; 
}