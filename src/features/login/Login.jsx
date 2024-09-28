import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <h2>LOGIN</h2>
            <input type="text" name="" id="username" placeholder="username"/>
            <input type="password" name="" id="password" placeholder="password"/>
            <input type="submit" value="LOGIN" id="submit"/>
            <a href="">Forgot password?</a>
        </div>
    );
}

export default Login;