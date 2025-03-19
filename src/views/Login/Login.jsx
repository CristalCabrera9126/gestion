import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert(`Intentando iniciar sesión con:\nEmail: ${email}\nContraseña: ${password}`);
    };

    const handleGoogleLogin = () => {
        alert("Iniciando sesión con Google...");
    };

    const handleFacebookLogin = () => {
        alert("Iniciando sesión con Facebook...");
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <div className="input-group">
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
                Iniciar Sesión
            </button>
            <hr />
            <button className="btn btn-google" onClick={handleGoogleLogin}>
                Iniciar con Google
            </button>
            <button className="btn btn-facebook" onClick={handleFacebookLogin}>
                Iniciar con Facebook
            </button>
        </div>
    );
};

export default Login;
