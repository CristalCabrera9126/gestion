import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError(false);
        setPasswordError(false);

        // Validate form
        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError(true);
            isValid = false;
        }

        if (password.length < 6) {
            setPasswordError(true);
            isValid = false;
        }

        if (isValid) {
            // Handle login logic here
            console.log('Login with:', { email, password, rememberMe });
            sessionStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard');
            // Redirect or show success message
        }
    };

    const footer = (
        <div className="flex flex-column">
            <Divider />
            <div className="flex justify-content-between flex-wrap">
                <Button
                    label="Iniciar Sesión"
                    icon="pi pi-sign-in"
                    className="p-button-primary"
                    onClick={handleSubmit}
                />
                <Button
                    label="Recuperar Contraseña"
                    icon="pi pi-lock"
                    className="p-button-text p-button-plain"
                    onClick={() => navigate('/recover-password')}
                />
            </div>
            <div className="mt-3 text-center">
                <span>¿No tienes una cuenta? </span>
                <Button
                    label="Regístrate"
                    className="p-button-text p-button-plain p-0"
                    onClick={() => navigate('/register')}
                />
            </div>
        </div>
    );

    return (
        <div className="flex align-items-center justify-content-center min-h-screen">
            <Card title="Iniciar Sesión" footer={footer} className="w-full md:w-6 lg:w-4">
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="email" className="font-bold">Correo Electrónico</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'p-invalid' : ''}
                        />
                        {emailError && <small className="p-error">Por favor ingrese un correo electrónico válido.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="font-bold">Contraseña</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                            className={passwordError ? 'p-invalid' : ''}
                        />
                        {passwordError && <small className="p-error">La contraseña debe tener al menos 6 caracteres.</small>}
                    </div>

                    <div className="field-checkbox">
                        <Checkbox
                            inputId="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.checked)}
                        />
                        <label htmlFor="rememberMe">Recordarme</label>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default LoginView;