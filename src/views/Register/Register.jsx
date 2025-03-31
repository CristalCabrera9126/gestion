import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setFormErrors({});

        // Validate form
        let errors = {};

        if (!name.trim()) {
            errors.name = 'El nombre es requerido';
        }

        if (!validateEmail(email)) {
            errors.email = 'Por favor ingrese un correo electrónico válido';
        }

        if (password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (!acceptTerms) {
            errors.terms = 'Debe aceptar los términos y condiciones';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Handle registration logic here
            console.log('Register with:', { name, email, password });
            // Redirect or show success message
        }
    };

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

    const footer = (
        <div className="flex flex-column">
            <Divider />
            <div className="flex justify-content-between flex-wrap">
                <Button
                    label="Registrarse"
                    icon="pi pi-user-plus"
                    className="p-button-primary"
                    onClick={handleSubmit}
                />
            </div>
            <div className="mt-3 text-center">
                <span>¿Ya tienes una cuenta? </span>
                <Button
                    label="Iniciar Sesión"
                    className="p-button-text p-button-plain p-0"
                    onClick={() => navigate('/login')}
                />
            </div>
        </div>
    );

    return (
        <div className="flex align-items-center justify-content-center min-h-screen">
            <Card title="Crear una cuenta" footer={footer} className="w-full md:w-8 lg:w-6">
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="name" className="font-bold">Nombre completo</label>
                        <InputText
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={formErrors.name ? 'p-invalid' : ''}
                        />
                        {formErrors.name && <small className="p-error">{formErrors.name}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="email" className="font-bold">Correo Electrónico</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={formErrors.email ? 'p-invalid' : ''}
                        />
                        {formErrors.email && <small className="p-error">{formErrors.email}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="font-bold">Contraseña</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            header={passwordHeader}
                            footer={passwordFooter}
                            className={formErrors.password ? 'p-invalid' : ''}
                        />
                        {formErrors.password && <small className="p-error">{formErrors.password}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="confirmPassword" className="font-bold">Confirmar Contraseña</label>
                        <Password
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                            className={formErrors.confirmPassword ? 'p-invalid' : ''}
                        />
                        {formErrors.confirmPassword && <small className="p-error">{formErrors.confirmPassword}</small>}
                    </div>

                    <div className="field-checkbox">
                        <Checkbox
                            inputId="acceptTerms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.checked)}
                            className={formErrors.terms ? 'p-invalid' : ''}
                        />
                        <label htmlFor="acceptTerms" className={formErrors.terms ? 'p-error' : ''}>
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    {formErrors.terms && <small className="p-error block mt-1">{formErrors.terms}</small>}
                </div>
            </Card>
        </div>
    );
};

export default RegisterView;