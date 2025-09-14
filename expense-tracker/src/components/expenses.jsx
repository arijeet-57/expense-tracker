import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function ExpensePage() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleSave(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("User must be logged in...redirecting to login page");
                setTimeout(() => {
                navigate("/Login");
                }, 2500);
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/expenses" , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    category,
                    expense: amount,
                    date: new Date().toISOString(),
                })
        })
        const data = await res.json();
        setMessage(data.msg);
        if(data.msg === "Expense saved successfully..."){
            setCategory("");
            setAmount("");
        }}catch(err){
            setMessage("Error in server...")
        };
    }
    function expenseReport() {
        navigate("/ExpenseReport")
    }
    return (
        <div>
            <h1>Tracker for Expenses</h1>
            <br /><br /><br />
            <label>Expense Category</label>
            <br />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
            <br /><br />
            <label>Expense Amount</label>
            <br />
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <br /><br />
            <button onClick={handleSave}>Save Expense</button>
            <br /><br />
            <button onClick={expenseReport}>Report Page</button>
            <br /><br />
            {message && <p>{message}</p>}
        </div>
    )
}