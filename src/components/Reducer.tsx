import { ExpenseProps } from "../Interface";
import { ExpenseEnum } from "./enums";

type ExpenseState = ExpenseProps[];

type ExpenseAction =
  | { type: ExpenseEnum.ADD_EXPENSE; payload: ExpenseProps }
  | { type: ExpenseEnum.DELETE_EXPENSE; payload: number };

export const expenseReducer = (state: ExpenseState, action: ExpenseAction) => {
  switch (action.type) {
    case ExpenseEnum.ADD_EXPENSE:
      return [...state, action.payload];
    case ExpenseEnum.DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);

  }
};
