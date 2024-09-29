import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
    const [email, setEmail] = useState("");
    const [userRole, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // used to redirect after successful registration

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission behavior
        setLoading(true);   // set loading to true while waiting for the backend

        try {
            const response = await fetch("http://localhost:5062/api/Authenticate/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    userRole: userRole,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error("Registration failed. Please check the details.");
            }

            // On success, redirect to login page
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false); // reset loading state
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Role"
                    value={userRole}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="username"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="submit"
                    value={loading ? "Registering..." : "Register"}
                    id="submit"
                    disabled={loading}
                />
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default Register;