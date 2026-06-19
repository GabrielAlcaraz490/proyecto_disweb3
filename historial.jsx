import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const initialForm = {
  fecha: '',
  dia: '',
  reservasActivas: '',
  estado: 'Mesas Disponibles',
};

const estados = [
  { value: 'Mesas Disponibles', label: 'Mesas Disponibles' },
  { value: 'Ocupación Media', label: 'Ocupación Media' },
  { value: 'Casi Lleno', label: 'Casi Lleno' },
];

function Fechas({ volver }) {
  const [fechas, setFechas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerFechas();
  }, []);

  const obtenerFechas = async () => {
    const querySnapshot = await getDocs(collection(db, 'fechas'));
    const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFechas(lista);
  };

  const getColor = (estado) => {
    if (estado === 'Ocupación Media') return '#5d8de6';
    if (estado === 'Casi Lleno') return '#3c6dba';
    if (estado === 'Mesas Disponibles') return '#7db5ff';
    return '#edf4ff';
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!formData.fecha || !formData.dia) {
      setMessage('Completa la fecha y el día.');
      return;
    }

    const payload = {
      fecha: formData.fecha,
      dia: formData.dia,
      reservasActivas: Number(formData.reservasActivas) || 0,
      estado: formData.estado,
    };

    if (editId) {
      await updateDoc(doc(db, 'fechas', editId), payload);
      setMessage('Fecha actualizada correctamente.');
    } else {
      await addDoc(collection(db, 'fechas'), payload);
      setMessage('Fecha agregada correctamente.');
    }

    setFormData(initialForm);
    setEditId(null);
    obtenerFechas();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      fecha: item.fecha || '',
      dia: item.dia || '',
      reservasActivas: item.reservasActivas ? String(item.reservasActivas) : '',
      estado: item.estado || 'Mesas Disponibles',
    });
    setMessage('Edita estos datos y guarda para actualizar la reservación.');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta fecha?')) return;
    await deleteDoc(doc(db, 'fechas', id));
    setMessage('Fecha eliminada.');
    obtenerFechas();
  };

  const fechasFiltradas = fechas.filter((item) =>
    item.fecha?.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.dia?.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.estado?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="module-panel">
      <div className="module-header">
        <div className="module-title">
          <div className="icon-label">📅</div>
          <div>
            <h2>Fechas</h2>
            <p>Administra reservaciones, estado y disponibilidad por fecha.</p>
          </div>
        </div>
        <button className="btn-secondary" onClick={volver}>Volver</button>
      </div>

      <div className="search-panel">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar fecha, día o estado"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="split-grid">
        <form className="form-card" onSubmit={handleSave}>
          <h3>{editId ? 'Editar fecha' : 'Agregar fecha'}</h3>
          <div className="input-group">
            <label>Fecha</label>
            <input
              className="input-field"
              type="date"
              value={formData.fecha}
              onChange={(e) => handleChange('fecha', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Día</label>
            <input
              className="input-field"
              value={formData.dia}
              onChange={(e) => handleChange('dia', e.target.value)}
              placeholder="Lunes, Martes, etc."
            />
          </div>
          <div className="input-group">
            <label>Reservas Activas</label>
            <input
              className="input-field"
              type="number"
              min="0"
              value={formData.reservasActivas}
              onChange={(e) => handleChange('reservasActivas', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="input-group">
            <label>Estado del Lugar</label>
            <select
              className="select-field"
              value={formData.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
            >
              {estados.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="row-actions">
            <button type="submit" className="btn-primary">
              {editId ? 'Actualizar fecha' : 'Agregar fecha'}
            </button>
            {editId && (
              <button type="button" className="btn-secondary" onClick={() => { setFormData(initialForm); setEditId(null); setMessage(''); }}>
                Cancelar
              </button>
            )}
          </div>
          {message && <p className="message">{message}</p>}
        </form>

        <div className="table-panel">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Día</th>
                  <th>Reservas</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fechasFiltradas.map((item) => (
                  <tr key={item.id}>
                    <td>{item.fecha}</td>
                    <td>{item.dia}</td>
                    <td>{item.reservasActivas ?? 0}</td>
                    <td><span className="status-pill" style={{ color: getColor(item.estado), borderColor: getColor(item.estado) }}>{item.estado}</span></td>
                    <td>
                      <div className="row-actions">
                        <button className="btn-outline" type="button" onClick={() => handleEdit(item)}>Editar</button>
                        <button className="btn-danger" type="button" onClick={() => handleDelete(item.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Fechas;
