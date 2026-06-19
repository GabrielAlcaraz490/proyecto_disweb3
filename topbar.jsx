function Sidebar({ cambiarVista }) {
  return (
    <aside className="sidebar">
      <button className="sidebar-btn" onClick={() => cambiarVista('HISTORIAL')}><span>📜</span>Historial</button>
      <button className="sidebar-btn" onClick={() => cambiarVista('CLIENTES')}><span>👥</span>Clientes</button>
      <button className="sidebar-btn" onClick={() => cambiarVista('FECHAS')}><span>📅</span>Fechas</button>
      <button className="sidebar-btn" onClick={() => cambiarVista('HORARIOS')}><span>🕒</span>Horarios</button>
    </aside>
  );
}

export default Sidebar;