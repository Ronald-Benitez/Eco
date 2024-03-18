export interface ColorScheme {
  primaryBackground: string;
  primaryText: string;
  secondaryBackground: string;
  secondaryText: string;
  accentBackground: string;
  accentText: string;
  buttonBackground: string;
  buttonText: string;
  buttonBorder: string;
  inputBorder: string;
  inputBackground: string;
  inputText: string;
  inputPlaceholder: string;
  toastBackground: string;
  toastText: string;
}

export interface DayColors {
  unassigned: string;
  neutral: string;
  happy: string;
  sad: string;
  angry: string;
  anxious: string;
  tired: string;
  excited: string;
  relaxed: string;
  stressed: string;
}

export interface HeaderColors {
  days: string;
  settings: string;
  giveaway: string;
  home: string;
  financials: string;
}

export interface Theme {
  colors: ColorScheme;
  days: DayColors;
  headers: HeaderColors;
}
