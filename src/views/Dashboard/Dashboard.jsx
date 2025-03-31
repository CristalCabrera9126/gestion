import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import { Chip } from 'primereact/chip';
import { ProgressBar } from 'primereact/progressbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const DashboardView = () => {
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Estados para Mesa Directiva
    const [boardMembers, setBoardMembers] = useState([
        { id: 1, nombre: 'Juan Pérez', cargo: 'Presidente', email: 'juan.perez@ejemplo.com', telefono: '555-1234', foto: '/api/placeholder/100/100' },
        { id: 2, nombre: 'María López', cargo: 'Vicepresidente', email: 'maria.lopez@ejemplo.com', telefono: '555-2345', foto: '/api/placeholder/100/100' },
        { id: 3, nombre: 'Carlos Rodríguez', cargo: 'Secretario', email: 'carlos.rodriguez@ejemplo.com', telefono: '555-3456', foto: '/api/placeholder/100/100' },
        { id: 4, nombre: 'Ana Martínez', cargo: 'Tesorera', email: 'ana.martinez@ejemplo.com', telefono: '555-4567', foto: '/api/placeholder/100/100' },
        { id: 5, nombre: 'Roberto Sánchez', cargo: 'Vocal', email: 'roberto.sanchez@ejemplo.com', telefono: '555-5678', foto: '/api/placeholder/100/100' },
    ]);
    const [boardMemberDialog, setBoardMemberDialog] = useState(false);
    const [boardMember, setBoardMember] = useState({ id: null, nombre: '', cargo: '', email: '', telefono: '', foto: '' });

    // Estados para Foros
    const [forums, setForums] = useState([
        { id: 1, titulo: 'Asamblea General Anual', fecha: new Date('2025-04-15'), estado: 'Programado', participantes: 45, descripcion: 'Asamblea para discutir el presupuesto anual y nuevos proyectos.' },
        { id: 2, titulo: 'Votación de Nuevas Normativas', fecha: new Date('2025-04-05'), estado: 'Programado', participantes: 38, descripcion: 'Foro para votar las nuevas normativas propuestas por la junta.' },
        { id: 3, titulo: 'Discusión de Mejoras Comunitarias', fecha: new Date('2025-03-25'), estado: 'Finalizado', participantes: 52, descripcion: 'Foro para discutir propuestas de mejora en áreas comunes.' },
        { id: 4, titulo: 'Sesión Informativa de Seguridad', fecha: new Date('2025-05-10'), estado: 'Programado', participantes: 0, descripcion: 'Sesión informativa sobre nuevas medidas de seguridad en la comunidad.' },
    ]);
    const [forumDialog, setForumDialog] = useState(false);
    const [forum, setForum] = useState({ id: null, titulo: '', fecha: null, estado: '', participantes: 0, descripcion: '' });

    // Estados para Votaciones
    const [votes, setVotes] = useState([
        { id: 1, titulo: 'Aprobación de Presupuesto Anual', fechaInicio: new Date('2025-04-01'), fechaFin: new Date('2025-04-07'), estado: 'En progreso', participacion: 65, opciones: ['Aprobar', 'Rechazar'], resultados: [75, 25] },
        { id: 2, titulo: 'Elección de Nuevos Miembros Directivos', fechaInicio: new Date('2025-05-01'), fechaFin: new Date('2025-05-10'), estado: 'Pendiente', participacion: 0, opciones: ['Candidato A', 'Candidato B', 'Candidato C'], resultados: [0, 0, 0] },
        { id: 3, titulo: 'Renovación de Áreas Comunes', fechaInicio: new Date('2025-03-10'), fechaFin: new Date('2025-03-20'), estado: 'Finalizada', participacion: 78, opciones: ['Aprobar', 'Rechazar', 'Abstención'], resultados: [68, 22, 10] },
    ]);
    const [voteDialog, setVoteDialog] = useState(false);
    const [vote, setVote] = useState({ id: null, titulo: '', fechaInicio: null, fechaFin: null, estado: '', participacion: 0, opciones: [], resultados: [] });
    const [optionInput, setOptionInput] = useState('');

    // Estados de los dropdowns
    const estadosForo = ['Programado', 'En curso', 'Finalizado', 'Cancelado'];
    const estadosVotacion = ['Pendiente', 'En progreso', 'Finalizada', 'Cancelada'];
    const cargosDirectiva = ['Presidente', 'Vicepresidente', 'Secretario', 'Tesorero', 'Vocal'];

    // Funciones para Mesa Directiva
    const openNewBoardMember = () => {
        setBoardMember({ id: null, nombre: '', cargo: '', email: '', telefono: '', foto: '/api/placeholder/100/100' });
        setBoardMemberDialog(true);
    };

    const saveBoardMember = () => {
        let _boardMembers = [...boardMembers];
        let _boardMember = {...boardMember};

        if (_boardMember.id) {
            const index = findIndexById(_boardMember.id, _boardMembers);
            _boardMembers[index] = _boardMember;
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Miembro actualizado', life: 3000 });
        } else {
            _boardMember.id = createId();
            _boardMembers.push(_boardMember);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Nuevo miembro añadido', life: 3000 });
        }

        setBoardMembers(_boardMembers);
        setBoardMemberDialog(false);
        setBoardMember({ id: null, nombre: '', cargo: '', email: '', telefono: '', foto: '' });
    };

    const editBoardMember = (member) => {
        setBoardMember({...member});
        setBoardMemberDialog(true);
    };

    const confirmDeleteBoardMember = (member) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar a ' + member.nombre + '?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => deleteBoardMember(member)
        });
    };

    const deleteBoardMember = (member) => {
        let _boardMembers = boardMembers.filter(m => m.id !== member.id);
        setBoardMembers(_boardMembers);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Miembro eliminado', life: 3000 });
    };

    const boardMemberDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setBoardMemberDialog(false)} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveBoardMember} />
        </React.Fragment>
    );

    const photoBodyTemplate = (rowData) => {
        return <Avatar image={rowData.foto} shape="circle" size="large" />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex justify-content-end">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editBoardMember(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteBoardMember(rowData)} />
            </div>
        );
    };

    // Funciones para Foros
    const openNewForum = () => {
        setForum({ id: null, titulo: '', fecha: null, estado: 'Programado', participantes: 0, descripcion: '' });
        setForumDialog(true);
    };

    const saveForum = () => {
        let _forums = [...forums];
        let _forum = {...forum};

        if (_forum.id) {
            const index = findIndexById(_forum.id, _forums);
            _forums[index] = _forum;
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Foro actualizado', life: 3000 });
        } else {
            _forum.id = createId();
            _forums.push(_forum);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Nuevo foro añadido', life: 3000 });
        }

        setForums(_forums);
        setForumDialog(false);
        setForum({ id: null, titulo: '', fecha: null, estado: '', participantes: 0, descripcion: '' });
    };

    const editForum = (forum) => {
        setForum({...forum});
        setForumDialog(true);
    };

    const confirmDeleteForum = (forum) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar el foro "' + forum.titulo + '"?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => deleteForum(forum)
        });
    };

    const deleteForum = (forum) => {
        let _forums = forums.filter(f => f.id !== forum.id);
        setForums(_forums);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Foro eliminado', life: 3000 });
    };

    const forumDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setForumDialog(false)} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveForum} />
        </React.Fragment>
    );

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.fecha);
    };

    const statusBodyTemplate = (rowData) => {
        const getStatusSeverity = (status) => {
            switch (status) {
                case 'Programado':
                    return 'info';
                case 'En curso':
                    return 'warning';
                case 'Finalizado':
                    return 'success';
                case 'Cancelado':
                    return 'danger';
                default:
                    return null;
            }
        };

        return <Badge value={rowData.estado} severity={getStatusSeverity(rowData.estado)} />;
    };

    const actionForumTemplate = (rowData) => {
        return (
            <div className="flex justify-content-end">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editForum(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteForum(rowData)} />
            </div>
        );
    };

    // Funciones para Votaciones
    const openNewVote = () => {
        setVote({ id: null, titulo: '', fechaInicio: null, fechaFin: null, estado: 'Pendiente', participacion: 0, opciones: [], resultados: [] });
        setVoteDialog(true);
    };

    const saveVote = () => {
        let _votes = [...votes];
        let _vote = {...vote};

        if (_vote.id) {
            const index = findIndexById(_vote.id, _votes);
            _votes[index] = _vote;
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Votación actualizada', life: 3000 });
        } else {
            _vote.id = createId();
            // Inicializar resultados a ceros
            _vote.resultados = new Array(_vote.opciones.length).fill(0);
            _votes.push(_vote);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Nueva votación añadida', life: 3000 });
        }

        setVotes(_votes);
        setVoteDialog(false);
        setVote({ id: null, titulo: '', fechaInicio: null, fechaFin: null, estado: '', participacion: 0, opciones: [], resultados: [] });
    };

    const editVote = (vote) => {
        setVote({...vote});
        setVoteDialog(true);
    };

    const confirmDeleteVote = (vote) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar la votación "' + vote.titulo + '"?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => deleteVote(vote)
        });
    };

    const deleteVote = (vote) => {
        let _votes = votes.filter(v => v.id !== vote.id);
        setVotes(_votes);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Votación eliminada', life: 3000 });
    };

    const voteDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setVoteDialog(false)} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveVote} />
        </React.Fragment>
    );

    const dateRangeTemplate = (rowData) => {
        return `${formatDate(rowData.fechaInicio)} - ${formatDate(rowData.fechaFin)}`;
    };

    const participationTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <ProgressBar value={rowData.participacion} showValue={false} style={{ width: '10rem', height: '8px' }} />
                <span className="ml-2">{rowData.participacion}%</span>
            </div>
        );
    };

    const actionVoteTemplate = (rowData) => {
        return (
            <div className="flex justify-content-end">
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" tooltip="Ver resultados" />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVote(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteVote(rowData)} />
            </div>
        );
    };

    const addOption = () => {
        if (optionInput.trim()) {
            const _vote = {...vote};
            _vote.opciones = [..._vote.opciones, optionInput.trim()];
            setVote(_vote);
            setOptionInput('');
        }
    };

    const removeOption = (index) => {
        const _vote = {...vote};
        _vote.opciones = _vote.opciones.filter((_, i) => i !== index);
        setVote(_vote);
    };

    // Funciones auxiliares
    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const findIndexById = (id, array) => {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const createId = () => {
        return Math.floor(Math.random() * 1000);
    };

    // Toolbars
    const boardMembersToolbar = (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0">Miembros de la Mesa Directiva</h4>
            <Button label="Nuevo Miembro" icon="pi pi-plus" onClick={openNewBoardMember} />
        </div>
    );

    const forumsToolbar = (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0">Foros y Asambleas</h4>
            <Button label="Nuevo Foro" icon="pi pi-plus" onClick={openNewForum} />
        </div>
    );

    const votesToolbar = (
        <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 className="m-0">Votaciones</h4>
            <Button label="Nueva Votación" icon="pi pi-plus" onClick={openNewVote} />
        </div>
    );

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />

            <h2 className="text-center mb-4">Panel de Administración</h2>

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Mesa Directiva" leftIcon="pi pi-users mr-2">
                    <Card>
                        <Toolbar className="mb-4" left={boardMembersToolbar} />
                        <DataTable
                            value={boardMembers}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            responsiveLayout="scroll"
                        >
                            <Column field="foto" header="Foto" body={photoBodyTemplate} style={{ width: '100px' }}></Column>
                            <Column field="nombre" header="Nombre" sortable style={{ minWidth: '200px' }}></Column>
                            <Column field="cargo" header="Cargo" sortable style={{ minWidth: '200px' }}></Column>
                            <Column field="email" header="Email" sortable style={{ minWidth: '200px' }}></Column>
                            <Column field="telefono" header="Teléfono" style={{ minWidth: '150px' }}></Column>
                            <Column body={actionBodyTemplate} style={{ width: '120px' }}></Column>
                        </DataTable>
                    </Card>
                </TabPanel>

                <TabPanel header="Foros" leftIcon="pi pi-comments mr-2">
                    <Card>
                        <Toolbar className="mb-4" left={forumsToolbar} />
                        <DataTable
                            value={forums}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            responsiveLayout="scroll"
                        >
                            <Column field="titulo" header="Título" sortable style={{ minWidth: '250px' }}></Column>
                            <Column field="fecha" header="Fecha" sortable style={{ minWidth: '150px' }} body={dateBodyTemplate}></Column>
                            <Column field="estado" header="Estado" sortable style={{ minWidth: '150px' }} body={statusBodyTemplate}></Column>
                            <Column field="participantes" header="Participantes" sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="descripcion" header="Descripción" style={{ minWidth: '250px' }}></Column>
                            <Column body={actionForumTemplate} style={{ width: '120px' }}></Column>
                        </DataTable>
                    </Card>
                </TabPanel>

                <TabPanel header="Votaciones" leftIcon="pi pi-chart-bar mr-2">
                    <Card>
                        <Toolbar className="mb-4" left={votesToolbar} />
                        <DataTable
                            value={votes}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            responsiveLayout="scroll"
                        >
                            <Column field="titulo" header="Título" sortable style={{ minWidth: '250px' }}></Column>
                            <Column field="fechas" header="Periodo" sortable style={{ minWidth: '200px' }} body={dateRangeTemplate}></Column>
                            <Column field="estado" header="Estado" sortable style={{ minWidth: '150px' }} body={statusBodyTemplate}></Column>
                            <Column field="participacion" header="Participación" sortable style={{ minWidth: '180px' }} body={participationTemplate}></Column>
                            <Column body={actionVoteTemplate} style={{ width: '180px' }}></Column>
                        </DataTable>
                    </Card>
                </TabPanel>
            </TabView>

            {/* Diálogo para Miembros de la Mesa Directiva */}
            <Dialog
                visible={boardMemberDialog}
                style={{ width: '450px' }}
                header="Detalle de Miembro"
                modal
                className="p-fluid"
                footer={boardMemberDialogFooter}
                onHide={() => setBoardMemberDialog(false)}
            >
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                        id="nombre"
                        value={boardMember.nombre}
                        onChange={(e) => setBoardMember({...boardMember, nombre: e.target.value})}
                        required
                        autoFocus
                        className={!boardMember.nombre ? 'p-invalid' : ''}
                    />
                    {!boardMember.nombre && <small className="p-error">El nombre es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cargo">Cargo</label>
                    <Dropdown
                        id="cargo"
                        value={boardMember.cargo}
                        options={cargosDirectiva}
                        onChange={(e) => setBoardMember({...boardMember, cargo: e.value})}
                        placeholder="Seleccione un cargo"
                        className={!boardMember.cargo ? 'p-invalid' : ''}
                    />
                    {!boardMember.cargo && <small className="p-error">El cargo es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={boardMember.email}
                        onChange={(e) => setBoardMember({...boardMember, email: e.target.value})}
                        required
                        className={!boardMember.email ? 'p-invalid' : ''}
                    />
                    {!boardMember.email && <small className="p-error">El email es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="telefono">Teléfono</label>
                    <InputText
                        id="telefono"
                        value={boardMember.telefono}
                        onChange={(e) => setBoardMember({...boardMember, telefono: e.target.value})}
                    />
                </div>
            </Dialog>

            {/* Diálogo para Foros */}
            <Dialog
                visible={forumDialog}
                style={{ width: '450px' }}
                header="Detalle de Foro"
                modal
                className="p-fluid"
                footer={forumDialogFooter}
                onHide={() => setForumDialog(false)}
            >
                <div className="field">
                    <label htmlFor="titulo">Título</label>
                    <InputText
                        id="titulo"
                        value={forum.titulo}
                        onChange={(e) => setForum({...forum, titulo: e.target.value})}
                        required
                        autoFocus
                        className={!forum.titulo ? 'p-invalid' : ''}
                    />
                    {!forum.titulo && <small className="p-error">El título es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar
                        id="fecha"
                        value={forum.fecha}
                        onChange={(e) => setForum({...forum, fecha: e.value})}
                        showIcon
                        dateFormat="dd/mm/yy"
                        className={!forum.fecha ? 'p-invalid' : ''}
                    />
                    {!forum.fecha && <small className="p-error">La fecha es requerida.</small>}
                </div>
                <div className="field">
                    <label htmlFor="estado">Estado</label>
                    <Dropdown
                        id="estado"
                        value={forum.estado}
                        options={estadosForo}
                        onChange={(e) => setForum({...forum, estado: e.value})}
                        placeholder="Seleccione un estado"
                        className={!forum.estado ? 'p-invalid' : ''}
                    />
                    {!forum.estado && <small className="p-error">El estado es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="participantes">Participantes Esperados</label>
                    <InputText
                        id="participantes"
                        value={forum.participantes}
                        onChange={(e) => setForum({...forum, participantes: parseInt(e.target.value) || 0})}
                        keyfilter="int"
                    />
                </div>
                <div className="field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputTextarea
                        id="descripcion"
                        value={forum.descripcion}
                        onChange={(e) => setForum({...forum, descripcion: e.target.value})}
                        rows={3}
                    />
                </div>
            </Dialog>

            {/* Diálogo para Votaciones */}
            <Dialog
                visible={voteDialog}
                style={{ width: '500px' }}
                header="Detalle de Votación"
                modal
                className="p-fluid"
                footer={voteDialogFooter}
                onHide={() => setVoteDialog(false)}
            >
                <div className="field">
                    <label htmlFor="tituloVotacion">Título</label>
                    <InputText
                        id="tituloVotacion"
                        value={vote.titulo}
                        onChange={(e) => setVote({...vote, titulo: e.target.value})}
                        required
                        autoFocus
                        className={!vote.titulo ? 'p-invalid' : ''}
                    />
                    {!vote.titulo && <small className="p-error">El título es requerido.</small>}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="fechaInicio">Fecha Inicio</label>
                        <Calendar
                            id="fechaInicio"
                            value={vote.fechaInicio}
                            onChange={(e) => setVote({...vote, fechaInicio: e.value})}
                            showIcon
                            dateFormat="dd/mm/yy"
                            className={!vote.fechaInicio ? 'p-invalid' : ''}
                        />
                        {!vote.fechaInicio && <small className="p-error">Requerida</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="fechaFin">Fecha Fin</label>
                        <Calendar
                            id="fechaFin"
                            value={vote.fechaFin}
                            onChange={(e) => setVote({...vote, fechaFin: e.value})}
                            showIcon
                            dateFormat="dd/mm/yy"
                            minDate={vote.fechaInicio}
                            className={!vote.fechaFin ? 'p-invalid' : ''}
                        />
                        {!vote.fechaFin && <small className="p-error">Requerida</small>}
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="estadoVotacion">Estado</label>
                    <Dropdown
                        id="estadoVotacion"
                        value={vote.estado}
                        options={estadosVotacion}
                        onChange={(e) => setVote({...vote, estado: e.value})}
                        placeholder="Seleccione un estado"
                        className={!vote.estado ? 'p-invalid' : ''}
                    />
                    {!vote.estado && <small className="p-error">El estado es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="opciones">Opciones de Votación</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={optionInput}
                            onChange={(e) => setOptionInput(e.target.value)}
                            placeholder="Añadir opción"
                        />
                        <Button icon="pi pi-plus" onClick={addOption} />
                    </div>
                    {vote.opciones.length === 0 && <small className="p-error">Debe añadir al menos una opción.</small>}
                    <div className="mt-3">
                        {vote.opciones.map((option, i) => (
                            <Chip
                                key={i}
                                label={option}
                                removable
                                onRemove={() => removeOption(i)}
                                className="mr-2 mb-2"
                            />
                        ))}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DashboardView;