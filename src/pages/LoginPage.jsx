import TextDecor from "../components/TextDecor";
import LoginComponent from "../features/login/Login";
const Login = () => {
  const loginUser = async (username, password) => {
    const response = await fetch("https://example.com/api/login", {
      method: "POST", // Метод HTTP запроса
      headers: {
        "Content-Type": "application/json", // Тип содержимого
      },
      body: JSON.stringify({
        username: username, // Данные пользователя
        password: password,
      }),
    });

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      throw new Error("Login failed");
    }

    // Получаем данные из ответа
    const data = await response.json();
    return data; // Возвращаем данные
  };

  // Пример вызова функции
  loginUser("myUsername", "myPassword")
    .then((data) => {
      console.log("Login successful:", data); // Обработка успешного логина
    })
    .catch((error) => {
      console.error("Error:", error); // Обработка ошибок
    });

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
