import "./expense.css";
import { IExpense } from "../../Interface";
import { ExpenseEnum } from "../enums";
import { expenseReducer } from "../Reducer";
import React, { useEffect, useReducer, useState } from "react";

const Expense = ({ expense, setExpense }: IExpense) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(0);


  const [state, dispatch] = useReducer(expenseReducer, expense, () => {
    const savedExpense = localStorage.getItem("expenses");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });


  const addExpense = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch({
      type: ExpenseEnum.ADD_EXPENSE,
      payload: {
        name: nameInput,
        amount: amountInput,
        id: Math.round(Math.random() * 1000),
      },
    });
    setNameInput("")
    setAmountInput(0)
    localStorage.setItem("expenses", JSON.stringify(state));
  };



  const handleDelete = (id: number) => {
    dispatch({ type: ExpenseEnum.DELETE_EXPENSE, payload: id });
  };



  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state));
    setExpense(state);
  }, [state, setExpense]);



  return (
    <div className="expenses">
      <div className="expenses_title">
        <h1>Expenses</h1>
      </div>
      <div className="add_expense">
        <form onSubmit={addExpense}>
          <h2>Add Expense:</h2>
          <div className="add_expense_input">
            <label>
              Name:
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amountInput || ""}
                name="expenseAmount"
                onChange={(e) => setAmountInput(Number(e.target.value))}
              />
            </label>
          </div>
          <button type="submit" className="submit_button">
            Add Expense
          </button>
        </form>
      </div>
      <div className="expenses_table">
        {state.map((expense) => (
          <table key={expense.id}>
            <tbody>
              <tr>
                <td>{expense.name.toUpperCase()} </td>
                <td className="amount">
                  £{expense.amount}
                  <div className="amount_button">
                    <button className="button">Edit</button>{" "}
                    <button
                      className="button"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default Expense;
