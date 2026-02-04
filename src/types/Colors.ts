export type PrimaryColor = 'primary'
export type SecondaryColor = 'secondary'
export type TertiaryColor = 'tertiary'
export type SuccessColor = 'success'
export type DangerColor = 'danger'
export type WarningColor = 'warning'
export type InfoColor = 'info'
export type LightColor = 'light'
export type DarkColor = 'dark'
export type TransparentColor = 'transparent';
export type BlackColor = 'black';
export type WhiteColor = 'white';

// Basic colors
export type BWColors = BlackColor | WhiteColor;
export type StatusColors = SuccessColor | DangerColor | WarningColor | InfoColor;

// Rank colors
export type SubRankColors = SecondaryColor | TertiaryColor;
export type RankColors = PrimaryColor | SubRankColors;
export type SubRankBodyColors = `${SubRankColors}-body`;

// Generate subtle variants
type SubtleColorable = RankColors | StatusColors | LightColor | DarkColor;
export type SubtleColors = `${SubtleColorable}-subtle`;

type EmphasisableColors = PrimaryColor | SecondaryColor | StatusColors | LightColor | DarkColor | 'body';
export type EmphasisColors = `${EmphasisableColors}-emphasis`;

// Generate 50 variants for BW colors
export type BW50Colors = `${BWColors}-50`;

export type TextColor = EmphasisColors | PrimaryColor | SecondaryColor | StatusColors | LightColor | DarkColor | BWColors | BW50Colors;
// Combined background colors with subtle variants
export type BackgroundColor = SubtleColorable | SubtleColors | 'body' | SubRankBodyColors | BWColors | TransparentColor;
export type ButtonColors = PrimaryColor | SecondaryColor | StatusColors | LightColor | DarkColor;