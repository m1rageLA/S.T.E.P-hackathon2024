import { useState } from "react";
import Button from "../../components/Button";
import "./login.scss";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Set loading to true while fetching

        try {
            const response = await fetch("http://localhost:5062/api/Authenticate/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "email": username, "password":password })
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            localStorage.setItem('userData', data)
 
            navigate("/")
            
            
        } catch (error) {
            setErrorMessage(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    id="password" 
                    placeholder="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <Button 
                    value={loading ? "LOADING..." : "LOGIN"} 
                    type="submit" 
                    width={"100%"} 
                    disabled={loading}
                />
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <a href="">Forgot password?</a>
        </div>
    );
}

export default Login;