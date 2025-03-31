import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { Password } from 'primereact/password';

const RecoverPasswordView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleRequestCode = () => {
        setEmailError('');

        if (!validateEmail(email)) {
            setEmailError('Por favor ingrese un correo electrónico válido');
            return;
        }

        // Simulate sending a recovery code
        setSuccessMessage('Se ha enviado un código de recuperación a tu correo electrónico');
        setActiveIndex(1);
    };

    const handleVerifyCode = () => {
        setCodeError('');

        if (!code.trim() || code.length !== 6) {
            setCodeError('Por favor ingrese un código válido de 6 dígitos');
            return;
        }

        // Simulate code verification
        setActiveIndex(2);
    };

    const handleResetPassword = () => {
        setPasswordError('');

        if (newPassword.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        // Simulate password reset
        setSuccessMessage('Tu contraseña ha sido restablecida exitosamente');
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const steps = [
        {
            label: 'Solicitar código',
            command: () => setActiveIndex(0)
        },
        {
            label: 'Verificar código',
            command: () => setActiveIndex(1)
        },
        {
            label: 'Nueva contraseña',
            command: () => setActiveIndex(2)
        }
    ];

    const passwordHeader = <h6>Crea una contraseña segura</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias:</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una letra minúscula</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    const getStepContent = () => {
        switch (activeIndex) {
            case 0:
                return (
                    <div className="p-fluid">
                        {successMessage && <Message severity="success" text={successMessage} className="w-full mb-3" />}
                        <div className="field">
                            <label htmlFor="email" className="font-bold">Correo Electrónico</label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={emailError ? 'p-invalid' : ''}
                            />
                            {emailError && <small className="p-error">{emailError}</small>}
                        </div>
                        <Button
                            label="Enviar código de recuperación"
                            icon="pi pi-envelope"
                            className="w-full"
                            onClick={handleRequestCode}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="p-fluid">
                        <div className="field">
                            <label htmlFor="code" className="font-bold">Código de Verificación</label>
                            <InputText
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={codeError ? 'p-invalid' : ''}
                                keyfilter="int"
                                maxLength={6}
                                placeholder="Ingrese el código de 6 dígitos"
                            />
                            {codeError && <small className="p-error">{codeError}</small>}
                        </div>
                        <Button
                            label="Verificar código"
                            icon="pi pi-check"
                            className="w-full"
                            onClick={handleVerifyCode}
                        />
                        <div className="mt-3 text-center">
                            <Button
                                label="Reenviar código"
                                className="p-button-text p-button-plain"
                                onClick={handleRequestCode}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="p-fluid">
                        {successMessage && <Message severity="success" text={successMessage} className="w-full mb-3" />}
                        <div className="field">
                            <label htmlFor="newPassword" className="font-bold">Nueva Contraseña</label>
                            <Password
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                toggleMask
                                header={passwordHeader}
                                footer={passwordFooter}
                                className={passwordError ? 'p-invalid' : ''}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="confirmPassword" className="font-bold">Confirmar Contraseña</label>
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleMask
                                feedback={false}
                                className={passwordError ? 'p-invalid' : ''}
                            />
                            {passwordError && <small className="p-error">{passwordError}</small>}
                        </div>
                        <Button
                            label="Restablecer Contraseña"
                            icon="pi pi-lock-open"
                            className="w-full"
                            onClick={handleResetPassword}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const footer = (
        <div className="flex flex-column">
            <Divider />
            <div className="mt-2 text-center">
                <Button
                    label="Volver al inicio de sesión"
                    icon="pi pi-sign-in"
                    className="p-button-text"
                    onClick={() => navigate('/login')}
                />
            </div>
        </div>
    );

    return (
        <div className="flex align-items-center justify-content-center min-h-screen">
            <Card title="Recuperar Contraseña" footer={footer} className="w-full md:w-8 lg:w-6">
                <Steps model={steps} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={true} className="mb-5" />
                {getStepContent()}
            </Card>
        </div>
    );
};

export default RecoverPasswordView;