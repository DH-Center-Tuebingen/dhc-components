declare global {
    interface Window {
        useI18n: any
    }
} 

export function useGlobalI18n() {
    
    const missingTranslation = () => {
        return {
            t: (msg: string)=>{
                console.warn("Could not find the 't' function of 'vue-18n' on the window object!")
                return msg;
            }
        }
    }
    
    return window.useI18n ? window.useI18n() : missingTranslation()
}