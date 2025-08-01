export function siSymbolToStr(symbol?: string | Array<string>) {
    if(!symbol) {
        return '';
    }

    if(Array.isArray(symbol)) {
        return symbol[0];
    } else {
        return symbol;
    }
}