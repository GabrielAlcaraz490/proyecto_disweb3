import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const initialForm = {
  nombre: '',
  telefono: '',
  email: '',
  reservas: '',
};

function Clientes({ volver }) {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    const querySnapshot = await getDocs(collection(db, 'clientes'));
    const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setClientes(lista);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formData.nombre || !formData.telefono) {
      setMessage('Completa el nombre y teléfono.');
      return;
    }

    const payload = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      reservas: Number(formData.reservas) || 0,
    };

    if (editId) {
      await updateDoc(doc(db, 'clientes', editId), payload);
      setMessage('Cliente actualizado correctamente.');
    } else {
      await addDoc(collection(db, 'clientes'), payload);
      setMessage('Cliente agregado correctamente.');
    }

    setFormData(initialForm);
    setEditId(null);
    obtenerClientes();
  };

  const handleEdit = (cliente) => {
    setEditId(cliente.id);
    setFormData({
      nombre: cliente.nombre || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      reservas: cliente.reservas ? String(cliente.reservas) : '',
    });
    setMessage('Edita los campos y guarda para actualizar.');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    await deleteDoc(doc(db, 'clientes', id));
    setMessage('Cliente eliminado.');
    obtenerClientes();
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="module-panel">
      <div className="module-header">
        <div className="module-title">
          <div className="icon-label">👥</div>
          <div>
            <h2>Clientes</h2>
            <p>Agrega, busca, edita o elimina datos de los clientes.</p>
          </div>
        </div>
        <button className="btn-secondary" onClick={volver}>Volver</button>
      </div>

      <div className="search-panel">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar cliente por nombre, correo o teléfono"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="split-grid">
        <form className="form-card" onSubmit={handleSave}>
          <h3>{editId ? 'Editar cliente' : 'Agregar cliente'}</h3>

          <div className="input-group">
            <label>Nombre</label>
            <input
              className="input-field"
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              placeholder="Nombre completo"
            />
          </div>

          <div className="input-group">
            <label>Teléfono</label>
            <input
              className="input-field"
              value={formData.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              placeholder="Ej. 555-123-4567"
            />
          </div>

          <div className="input-group">
            <label>Correo</label>
            <input
              className="input-field"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="cliente@correo.com"
            />
          </div>

          <div className="input-group">
            <label>Reservas</label>
            <input
              className="input-field"
              type="number"
              min="0"
              value={formData.reservas}
              onChange={(e) => handleChange('reservas', e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="row-actions">
            <button type="submit" className="btn-primary">
              {editId ? 'Actualizar cliente' : 'Agregar cliente'}
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
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <div className="card" key={cliente.id}>
                <div className="module-title" style={{ alignItems: 'flex-start' }}>
                  <div className="icon-label">🧾</div>
                  <div>
                    <h3>{cliente.nombre || 'Sin nombre'}</h3>
                    <p>{cliente.email || 'Sin correo'}</p>
                  </div>
                </div>
                <p>Teléfono: {cliente.telefono || 'N/A'}</p>
                <p>Reservas: {cliente.reservas ?? 0}</p>
                <div className="card-actions">
                  <button className="btn-outline" type="button" onClick={() => handleEdit(cliente)}>Editar</button>
                  <button className="btn-danger" type="button" onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <h3>No hay clientes</h3>
              <p>Agrega uno usando el formulario para comenzar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Clientes;