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

export type ItemType = "expense" | "income"

export interface BasicItem {
  name: string;
  date: string;
  value: number;
  type: ItemType
  group_id: number
}

export interface Item extends BasicItem {
  id: number
}
