export type TabsProps = {
    tabs: Array<string>;
    direction: 'horizontal' | 'vertical';
    style: 'none' | 'tabs' | 'pills' | 'underline';
    width: 'normal' | 'fill' | 'fill-evenly';
};