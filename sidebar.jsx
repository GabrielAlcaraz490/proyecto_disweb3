import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const initialForm = {
  hora: '',
  estado: 'Libre',
};

const opcionesEstado = [
  { value: 'Libre', label: 'Libre' },
  { value: 'Reservado', label: 'Reservado' },
  { value: 'Ocupado', label: 'Ocupado' },
];

function Horarios({ volver }) {
  const [turnos, setTurnos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerHorarios();
  }, []);

  const obtenerHorarios = async () => {
    const querySnapshot = await getDocs(collection(db, 'horarios'));
    const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTurnos(lista);
  };

  const getStatusColor = (estado) => {
    if (estado === 'Libre') return '#7db5ff';
    if (estado === 'Reservado') return '#5d8de6';
    if (estado === 'Ocupado') return '#3c6dba';
    return '#edf4ff';
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.hora) {
      setMessage('Ingresa una hora válida.');
      return;
    }

    const payload = {
      hora: formData.hora,
      estado: formData.estado,
      color: getStatusColor(formData.estado),
    };

    if (editId) {
      await updateDoc(doc(db, 'horarios', editId), payload);
      setMessage('Horario actualizado correctamente.');
    } else {
      await addDoc(collection(db, 'horarios'), payload);
      setMessage('Horario agregado correctamente.');
    }

    setFormData(initialForm);
    setEditId(null);
    obtenerHorarios();
  };

  const handleEdit = (turno) => {
    setEditId(turno.id);
    setFormData({ hora: turno.hora || '', estado: turno.estado || 'Libre' });
    setMessage('Edita el turno y guarda los cambios.');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este horario?')) return;
    await deleteDoc(doc(db, 'horarios', id));
    setMessage('Horario eliminado.');
    obtenerHorarios();
  };

  const turnosFiltrados = turnos.filter((turno) =>
    turno.hora?.toLowerCase().includes(busqueda.toLowerCase()) ||
    turno.estado?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="module-panel">
      <div className="module-header">
        <div className="module-title">
          <div className="icon-label">🕒</div>
          <div>
            <h2>Horarios</h2>
            <p>Gestiona turnos con estado, edición rápida y eliminación.</p>
          </div>
        </div>
        <button className="btn-secondary" onClick={volver}>Volver</button>
      </div>

      <div className="search-panel">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar horario o estado"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="split-grid">
        <form className="form-card" onSubmit={handleSave}>
          <h3>{editId ? 'Editar horario' : 'Agregar horario'}</h3>
          <div className="input-group">
            <label>Hora</label>
            <input
              className="input-field"
              type="time"
              value={formData.hora}
              onChange={(e) => handleChange('hora', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Estado</label>
            <select
              className="select-field"
              value={formData.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
            >
              {opcionesEstado.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
              ))}
            </select>
          </div>
          <div className="row-actions">
            <button type="submit" className="btn-primary">
              {editId ? 'Actualizar horario' : 'Agregar horario'}
            </button>
            {editId && (
              <button type="button" className="btn-secondary" onClick={() => { setFormData(initialForm); setEditId(null); setMessage(''); }}>
                Cancelar
              </button>
            )}
          </div>
          {message && <p className="message">{message}</p>}
        </form>

        <div className="grid-cards">
          {turnosFiltrados.length > 0 ? (
            turnosFiltrados.map((turno) => (
              <div className="card" key={turno.id}>
                <div className="module-title" style={{ alignItems: 'flex-start' }}>
                  <div className="icon-label">⏱️</div>
                  <div>
                    <h3>{turno.hora}</h3>
                    <span className="status-pill" style={{ borderColor: getStatusColor(turno.estado), color: getStatusColor(turno.estado) }}>{turno.estado}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="btn-outline" type="button" onClick={() => handleEdit(turno)}>Editar</button>
                  <button className="btn-danger" type="button" onClick={() => handleDelete(turno.id)}>Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <h3>No hay horarios</h3>
              <p>Agrega uno usando el formulario para comenzar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Horarios;