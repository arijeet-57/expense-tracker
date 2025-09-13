import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleInput(e) {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:3000/login" , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({username, password})
            })

            const data = await res.json();
            setMessage(data.msg);

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/Expense");
            }
        }catch(err) {
            setMessage("Error fetching the data...")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <br /><br />
            <label>Username</label>
            <br />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br /><br />
            <label>Password</label>
            <br />
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br /><br />
             {message && <p>{message}</p>}
              <br /><br />
            <button onClick={handleInput}>Login</button>
        </div>
    )
}
