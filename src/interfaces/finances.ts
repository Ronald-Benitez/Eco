export interface BasicGroup {
  name: string;
  month: string;
  year: string;
  expenses: number;
  incomes: number;
  goal: number;
}

export interface Group extends BasicGroup {
  id: number;
}
