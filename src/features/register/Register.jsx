import "./register.scss";

const Register = () => {
    return (
        <div className="register">
            <h2>Register</h2>
            <input type="text" name="" id="username" placeholder="email"/>
            {/* !!!------!! */}
            <input type="text" name="" id="username" placeholder="username"/>
            <input type="password" name="" id="password" placeholder="password"/>
            <input type="submit" value="LOGIN" id="submit"/>
            <a href="">Forgot password?</a>
        </div>
    );
}

export default Register;