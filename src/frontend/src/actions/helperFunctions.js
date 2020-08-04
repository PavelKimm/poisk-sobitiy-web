// Setup config with token
export const tokenConfig = getState => {
    //Получение токена из state
    const token = getState().auth.auth_token;

    // Заголовки запроса
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Если есть токен, добавить в заголовки
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};