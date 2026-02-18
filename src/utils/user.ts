export const getUserColor = (username: string) => {
    let hue = 0;
    for(let i=0; i < username.length; i++) {
        hue = username.charCodeAt(i) + ((hue << 5) - hue);
    }

    hue = hue % 360;
    return `hsl(${hue}, 32%, 75%)`;
}