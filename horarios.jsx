import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const initialForm = {
  accion: '',
  detalles: '',
};

function Historial({ volver }) {
  const [historial, setHistorial] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const obtenerHistorial = async () => {
    const querySnapshot = await getDocs(collection(db, 'historial'));
    const lista = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => (b.fechaHora || '').localeCompare(a.fechaHora || ''));
    setHistorial(lista);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!formData.accion || !formData.detalles) {
      setMessage('Completa acción y detalles.');
      return;
    }

    const payload = {
      accion: formData.accion,
      detalles: formData.detalles,
      fechaHora: new Date().toLocaleString('es-419'),
    };

    if (editId) {
      await updateDoc(doc(db, 'historial', editId), payload);
      setMessage('Entrada de historial actualizada.');
    } else {
      await addDoc(collection(db, 'historial'), payload);
      setMessage('Entrada de historial agregada.');
    }

    setFormData(initialForm);
    setEditId(null);
    obtenerHistorial();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({ accion: item.accion || '', detalles: item.detalles || '' });
    setMessage('Edita la entrada y guarda para actualizarla.');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta entrada de historial?')) return;
    await deleteDoc(doc(db, 'historial', id));
    setMessage('Entrada eliminada.');
    obtenerHistorial();
  };

  const historialFiltrado = historial.filter((item) =>
    item.accion?.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.detalles?.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.fechaHora?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="module-panel">
      <div className="module-header">
        <div className="module-title">
          <div className="icon-label">📜</div>
          <div>
            <h2>Historial</h2>
            <p>Registra, busca, edita y elimina movimientos del sistema.</p>
          </div>
        </div>
        <button className="btn-secondary" onClick={volver}>Volver</button>
      </div>

      <div className="search-panel">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar acciones, detalles o fecha"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="split-grid">
        <form className="form-card" onSubmit={handleSave}>
          <h3>{editId ? 'Editar historial' : 'Agregar entrada'}</h3>
          <div className="input-group">
            <label>Acción</label>
            <input
              className="input-field"
              value={formData.accion}
              onChange={(e) => handleChange('accion', e.target.value)}
              placeholder="Acción realizada"
            />
          </div>
          <div className="input-group">
            <label>Detalles</label>
            <textarea
              className="input-field"
              rows="4"
              value={formData.detalles}
              onChange={(e) => handleChange('detalles', e.target.value)}
              placeholder="Descripción de la acción"
            />
          </div>
          <div className="row-actions">
            <button type="submit" className="btn-primary">
              {editId ? 'Actualizar entrada' : 'Agregar entrada'}
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
                  <th>ID</th>
                  <th>Acción</th>
                  <th>Detalles</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historialFiltrado.map((item, index) => (
                  <tr key={item.id}>
                    <td>#{historial.length - index}</td>
                    <td>{item.accion}</td>
                    <td>{item.detalles}</td>
                    <td>{item.fechaHora}</td>
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

export default Historial;
