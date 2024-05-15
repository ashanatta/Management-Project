import React, { useEffect, useState } from "react";

function HomeCompt() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    const savedTotalBalance = JSON.parse(localStorage.getItem("totalBalance"));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
    if (savedTotalBalance) {
      setTotalBalance(savedTotalBalance);
    }
  }, []);

  const handleAddTransaction = () => {
    // Input validation
    if (!text.trim() || !amount.trim() || isNaN(amount)) {
      alert("Please enter valid name and amount.");
      return;
    }

    const newTransaction = {
      id: new Date().getTime(),
      text: text,
      amount: parseFloat(amount),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    const newBalance = totalBalance + newTransaction.amount;
    setTotalBalance(newBalance);
    localStorage.setItem("totalBalance", JSON.stringify(newBalance));

    setText("");
    setAmount("");
  };
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    const deletedTransaction = transactions.find(
      (transaction) => transaction.id === id
    );
    const newBalance = totalBalance - deletedTransaction.amount;

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTotalBalance(newBalance);
    localStorage.setItem("totalBalance", JSON.stringify(newBalance));
  };

  const handleClearHistory = () => {
    setTransactions([]);
    setTotalBalance(0);
    localStorage.removeItem("transactions");
    localStorage.removeItem("totalBalance");
  };

  return (
    <div className="flex flex-col  justify-center items-center">
      <h2 className="text-5xl font-bold mt-4">Personal Account Manager</h2>

      <div>
        <h4 className="text-2xl font-bold text-start mt-4">Your Balance</h4>
        <h1
          id="balance"
          className="text-4xl font-bold  p-3 text-center mt-2 mb-6 bg-slate-300 rounded-2xl"
        >
          {totalBalance.toFixed(2)} $
        </h1>

        <h3 className="text-xl mb-4 font-bold">History</h3>
        <ul id="list" className="text-lg">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`flex justify-between w-96 rounded-2xl items-center mb-3  bg-slate-300 p-3 ${
                transaction.amount >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {transaction.text}{" "}
              <span>
                ${transaction.amount.toFixed(2)}
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  &#10006;
                </button>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="btn bg-red-700 text-white py-1 px-1 rounded"
            onClick={handleClearHistory}
          >
            Clear History
          </button>
        </div>

        <h3 className="text-xl border-b-2 border-white-300 mb-4 font-bold">
          Add new transaction
        </h3>
        <form id="form" className="mb-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="text" className="mb-2">
              Name
            </label>
            <input
              type="text"
              id="text"
              placeholder="Enter name..."
              className="p-2 border border-gray-300 rounded w-96"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="amount" className="mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount..."
              className="p-2 border border-gray-300 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleAddTransaction}
          >
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomeCompt;
