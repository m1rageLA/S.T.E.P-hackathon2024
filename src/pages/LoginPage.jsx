import TextDecor from "../components/TextDecor";
import LoginComponent from "../features/login/Login";
const Login = () => {
  

  return (
    <div className="loginPage">
      <div className="loginPage__box">
        <div className="loginPage__left">
          <header className="header">
            <a href="/">
              <p>S.T.E.P.</p>
            </a>
          </header>
          <main className="main">
            <LoginComponent />
          </main>
        </div>
        <div className="loginPage__right">
          <TextDecor />
        </div>
      </div>
    </div>
  );
};

export default Login;
