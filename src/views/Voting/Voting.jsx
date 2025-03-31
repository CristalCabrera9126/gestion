import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { io } from 'socket.io-client';

const VotingView = () => {
    const toast = useRef(null);
    const socket = useRef(null);
    const [activeVotes, setActiveVotes] = useState([]);
    const [selectedVote, setSelectedVote] = useState(null);
    const [voteDetailsVisible, setVoteDetailsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState({});
    const [votingResults, setVotingResults] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [votingInProgress, setVotingInProgress] = useState(false);

    // Datos de prueba para simular votaciones activas
    const testActiveVotes = [
        {
            id: 1,
            titulo: 'Aprobación de Presupuesto Anual',
            fechaInicio: new Date('2025-04-01'),
            fechaFin: new Date('2025-04-07'),
            estado: 'En progreso',
            descripcion: 'Votación para la aprobación del presupuesto anual 2025-2026.',
            opciones: ['Aprobar', 'Rechazar'],
            resultados: [45, 12]
        },
        {
            id: 2,
            titulo: 'Elección de Nuevos Miembros Directivos',
            fechaInicio: new Date('2025-03-28'),
            fechaFin: new Date('2025-04-05'),
            estado: 'En progreso',
            descripcion: 'Elección para renovar los cargos de Presidente y Tesorero de la mesa directiva.',
            opciones: ['Juan Pérez / María Gómez', 'Roberto Sánchez / Ana López', 'Carlos Martínez / Laura Torres'],
            resultados: [23, 18, 27]
        },
        {
            id: 3,
            titulo: 'Renovación de Áreas Comunes',
            fechaInicio: new Date('2025-03-25'),
            fechaFin: new Date('2025-04-02'),
            estado: 'En progreso',
            descripcion: 'Votación para decidir sobre la renovación de jardines y áreas comunes.',
            opciones: ['Aprobar', 'Rechazar', 'Abstención'],
            resultados: [37, 15, 8]
        }
    ];

    useEffect(() => {
        // En una implementación real, aquí se conectaría al servidor socket
        // Por ahora simularemos la conexión y los datos
        setActiveVotes(testActiveVotes);

        // Simula la conexión de socket
        setIsConnected(true);

        // Simular recepción de datos iniciales
        const initialVotingResults = {};
        testActiveVotes.forEach(vote => {
            initialVotingResults[vote.id] = {
                total: vote.resultados.reduce((sum, val) => sum + val, 0),
                resultados: vote.resultados
            };
        });
        setVotingResults(initialVotingResults);

        // Simular socket en una implementación real
        // socket.current = io('http://your-server-url');
        // socket.current.on('connect', () => setIsConnected(true));
        // socket.current.on('voteUpdate', handleVoteUpdate);
        // socket.current.on('disconnect', () => setIsConnected(false));

        // Función para simular actualizaciones aleatorias en los votos cada 5 segundos
        const simulateVoteUpdates = setInterval(() => {
            const randomVoteIndex = Math.floor(Math.random() * testActiveVotes.length);
            const randomVoteId = testActiveVotes[randomVoteIndex].id;
            const randomOptionIndex = Math.floor(Math.random() * testActiveVotes[randomVoteIndex].opciones.length);

            handleVoteUpdate({
                voteId: randomVoteId,
                optionIndex: randomOptionIndex,
                newResults: [...votingResults[randomVoteId]?.resultados || testActiveVotes[randomVoteIndex].resultados]
            });

        }, 5000);

        return () => {
            clearInterval(simulateVoteUpdates);
            // En implementación real: socket.current.disconnect();
        };
    }, []);

    // Manejar actualizaciones de votos (simulado)
    const handleVoteUpdate = (data) => {
        setVotingResults(prev => {
            const newResults = {...prev};
            if (newResults[data.voteId]) {
                const updatedResults = [...newResults[data.voteId].resultados];
                updatedResults[data.optionIndex] += 1;

                newResults[data.voteId] = {
                    total: newResults[data.voteId].total + 1,
                    resultados: updatedResults
                };

                // Notificar al usuario sobre la actualización
                /*if (toast.current) {
                    toast.current.show({
                        severity: 'info',
                        summary: '¡Nuevo voto recibido!',
                        detail: `Votación: ${activeVotes.find(v => v.id === data.voteId)?.titulo}`,
                        life: 3000
                    });
                }*/
            }
            return newResults;
        });
    };

    // Abrir detalles de la votación
    const openVoteDetails = (vote) => {
        setSelectedVote(vote);
        setSelectedOption(null);
        setVoteDetailsVisible(true);
    };

    // Enviar voto
    const submitVote = () => {
        if (!selectedOption && selectedOption !== 0) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Debe seleccionar una opción para votar',
                life: 3000
            });
            return;
        }

        setVotingInProgress(true);

        // Simular envío de voto al servidor
        setTimeout(() => {
            // En implementación real: socket.current.emit('castVote', { voteId: selectedVote.id, option: selectedOption });

            setVotingResults(prev => {
                const newResults = {...prev};
                if (newResults[selectedVote.id]) {
                    const updatedResults = [...newResults[selectedVote.id].resultados];
                    updatedResults[selectedOption] += 1;

                    newResults[selectedVote.id] = {
                        total: newResults[selectedVote.id].total + 1,
                        resultados: updatedResults
                    };
                }
                return newResults;
            });

            // Marcar como votado
            setHasVoted(prev => ({...prev, [selectedVote.id]: true}));

            toast.current.show({
                severity: 'success',
                summary: 'Voto registrado',
                detail: 'Su voto ha sido registrado exitosamente',
                life: 3000
            });

            setVotingInProgress(false);
            setVoteDetailsVisible(false);
        }, 1500);
    };

    // Formatear fecha
    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Calcular porcentaje para una opción
    const calculatePercentage = (voteId, optionIndex) => {
        const results = votingResults[voteId];
        if (!results || results.total === 0) return 0;
        return Math.round((results.resultados[optionIndex] / results.total) * 100);
    };

    // Renderizar tarjeta de votación
    const renderVoteCard = (vote) => {
        const results = votingResults[vote.id] || { total: 0, resultados: vote.resultados };
        const userHasVoted = hasVoted[vote.id];

        return (
            <Card key={vote.id} className="mb-3" title={vote.titulo}>
                <div className="mb-3">
                    <p><strong>Periodo de votación:</strong> {formatDate(vote.fechaInicio)} - {formatDate(vote.fechaFin)}</p>
                    <p><strong>Estado:</strong> <Badge value={vote.estado} severity="warning" /></p>
                    <p><strong>Participación actual:</strong> {results.total} votos</p>
                </div>

                <div className="mb-4">
                    <h5>Resultados parciales:</h5>
                    {vote.opciones.map((opcion, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-content-between align-items-center mb-1">
                                <span>{opcion}</span>
                                <span>{calculatePercentage(vote.id, index)}%</span>
                            </div>
                            <ProgressBar
                                value={calculatePercentage(vote.id, index)}
                                showValue={false}
                                style={{ height: '10px' }}
                                color={index === 0 ? '#4CAF50' : index === 1 ? '#F44336' : '#2196F3'}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-content-end">
                    {userHasVoted ? (
                        <Button label="Ya ha votado" icon="pi pi-check" className="p-button-success" disabled />
                    ) : (
                        <Button
                            label="Votar"
                            icon="pi pi-check-circle"
                            onClick={() => openVoteDetails(vote)}
                            className="p-button-primary"
                        />
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />

            <div className="flex align-items-center mb-4">
                <h2 className="text-center flex-grow-1 m-0">Votaciones Activas</h2>
                <Badge
                    value={isConnected ? 'Conectado' : 'Desconectado'}
                    severity={isConnected ? 'success' : 'danger'}
                    className="ml-2"
                />
            </div>

            {activeVotes.length === 0 ? (
                <Card>
                    <div className="text-center p-5">
                        <i className="pi pi-info-circle" style={{ fontSize: '2rem', color: '#64B5F6' }}></i>
                        <h3>No hay votaciones activas</h3>
                        <p>Actualmente no hay ninguna votación en curso.</p>
                    </div>
                </Card>
            ) : (
                activeVotes.map(vote => renderVoteCard(vote))
            )}

            {/* Diálogo de Votación */}
            <Dialog
                visible={voteDetailsVisible}
                style={{ width: '450px' }}
                header="Votar"
                modal
                onHide={() => setVoteDetailsVisible(false)}
                footer={
                    <div>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={() => setVoteDetailsVisible(false)}
                            className="p-button-text"
                        />
                        <Button
                            label="Votar"
                            icon="pi pi-check"
                            onClick={submitVote}
                            loading={votingInProgress}
                            disabled={selectedOption === null && selectedOption !== 0}
                        />
                    </div>
                }
            >
                {selectedVote && (
                    <div>
                        <h4>{selectedVote.titulo}</h4>
                        <p>{selectedVote.descripcion}</p>

                        <div className="field-radiobutton mb-2">
                            <h5>Seleccione una opción:</h5>
                            {selectedVote.opciones.map((opcion, index) => (
                                <div key={index} className="flex align-items-center mb-3">
                                    <RadioButton
                                        inputId={`option_${index}`}
                                        name="voteOption"
                                        value={index}
                                        onChange={() => setSelectedOption(index)}
                                        checked={selectedOption === index}
                                    />
                                    <label htmlFor={`option_${index}`} className="ml-2">{opcion}</label>
                                </div>
                            ))}
                        </div>

                        <div className="p-message p-message-info p-message-icon-only mb-2">
                            <small>
                                <i className="pi pi-info-circle mr-2"></i>
                                Los resultados se actualizarán en tiempo real a medida que otros usuarios voten.
                            </small>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default VotingView;