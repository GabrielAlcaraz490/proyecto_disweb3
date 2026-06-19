<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurante </title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #2d495c;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .window-wrapper {
            width: 100%;
            max-width: 1100px;
            height: 650px;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        }

        .top-bar {
            background-color: #95999c;
            height: 90px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
            border-bottom: 2px solid rgba(0,0,0,0.1);
        }

        .main-title {
            color: #112533;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: 3px;
        }

        .left-actions, .right-actions {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        .icon-dark {
            width: 28px;
            height: 28px;
            fill: #112533;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .icon-dark:hover {
            transform: scale(1.1);
        }

        .workspace {
            flex: 1;
            display: flex;
            background-color: #2d495c;
            overflow: hidden;
        }

        .side-panel {
            background-color: #112533;
            width: 220px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 40px;
            gap: 20px;
        }

        .nav-pill {
            background-color: #95999c;
            color: #112533;
            border: none;
            width: 160px;
            height: 42px;
            border-radius: 21px;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }

        .nav-pill:hover {
            background-color: #ffffff;
            transform: translateY(-2px);
        }

        .dashboard-content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            height: 100%;
            align-content: center;
        }

        .grid-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(17, 37, 51, 0.2);
            border: 2px solid rgba(156, 153, 149, 0.2);
            padding: 30px;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .grid-card:hover {
            background: rgba(17, 37, 51, 0.4);
            border-color: #9c9995;
            transform: translateY(-5px);
        }

        .icon-container {
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon-container svg {
            width: 100%;
            height: 100%;
        }

        .file-icon svg { fill: #ffffff; }
        .circle-icon svg { fill: #112533; }
        .standard-icon svg { fill: #112533; }

        .card-label {
            color: #9c9995;
            margin-top: 15px;
            font-size: 16px;
            letter-spacing: 1.5px;
            font-weight: bold;
        }

        .module-view {
            display: none;
            color: #ffffff;
            height: 100%;
        }

        .view-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            border-bottom: 2px solid rgba(156, 153, 149, 0.3);
            padding-bottom: 10px;
        }

        .view-header h2 {
            font-size: 28px;
            color: #ffffff;
            letter-spacing: 1px;
        }

        .back-btn {
            background-color: #95999c;
            color: #112533;
            border: none;
            padding: 8px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
        }

        .back-btn:hover {
            background-color: #ffffff;
        }

        .action-zone {
            background: #112533;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .form-row {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: center;
        }

        .search-box {
            display: flex;
            gap: 10px;
            flex: 1;
            min-width: 280px;
        }

        input {
            background-color: #2d495c;
            border: 1px solid #9c9995;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            outline: none;
            font-size: 14px;
            flex: 1;
        }

        input::placeholder {
            color: #9c9995;
        }

        input:focus {
            border-color: #ffffff;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 14px;
        }

        .btn-add { background-color: #95999c; color: #112533; }
        .btn-add:hover { background-color: #ffffff; }
        .btn-search { background-color: #2d495c; color: white; border: 1px solid #9c9995; }
        .btn-search:hover { background-color: rgba(255,255,255,0.1); }
        .btn-clear { background-color: #473e31; color: white; }
        .btn-clear:hover { background-color: #615543; }
        .btn-danger { background-color: #a83232; color: white; padding: 6px 12px; font-size: 12px; }
        .btn-danger:hover { background-color: #c74242; }
        .btn-edit { background-color: #9c9995; color: #112533; padding: 6px 12px; font-size: 12px; }
        .btn-edit:hover { background-color: #ffffff; }

        .data-container {
            background: rgba(17, 37, 51, 0.4);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(156, 153, 149, 0.2);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th {
            background-color: #112533;
            color: #9c9995;
            padding: 14px;
            font-size: 14px;
            letter-spacing: 1px;
        }

        td {
            padding: 14px;
            border-bottom: 1px solid rgba(156, 153, 149, 0.1);
            font-size: 14px;
            color: #ffffff;
        }

        tr:last-child td {
            border-bottom: none;
        }
    </style>
</head>
<body>

    <div class="window-wrapper">
        
        <header class="top-bar">
            <div class="left-actions">
                <svg viewBox="0 0 24 24" class="icon-dark" onclick="showMenu()"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </div>
            <h1 class="main-title" id="panel-title">INICIO</h1>
            <div class="right-actions">
                <svg viewBox="0 0 24 24" class="icon-dark"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                <svg viewBox="0 0 24 24" class="icon-dark"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                <svg viewBox="0 0 24 24" class="icon-dark"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </div>
        </header>

        <div class="workspace">
            
            <aside class="side-panel">
                <button class="nav-pill" onclick="switchView('historial')">HISTORIAL</button>
                <button class="nav-pill" onclick="switchView('clientes')">CLIENTES</button>
                <button class="nav-pill" onclick="switchView('fechas')">FECHAS</button>
                <button class="nav-pill" onclick="switchView('horarios')">HORARIOS</button>
            </aside>

            <main class="dashboard-content">
                
                <div id="menu-grid" class="modules-grid">
                    <div class="grid-card" onclick="switchView('historial')">
                        <div class="icon-container file-icon">
                            <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                        </div>
                        <span class="card-label">HISTORIAL</span>
                    </div>

                    <div class="grid-card" onclick="switchView('clientes')">
                        <div class="icon-container circle-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <span class="card-label">CLIENTES</span>
                    </div>

                    <div class="grid-card" onclick="switchView('fechas')">
                        <div class="icon-container standard-icon">
                            <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
                        </div>
                        <span class="card-label">FECHAS</span>
                    </div>

                    <div class="grid-card" onclick="switchView('horarios')">
                        <div class="icon-container standard-icon">
                            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        </div>
                        <span class="card-label">HORARIOS</span>
                    </div>
                </div>

                <div id="view-historial" class="module-view">
                    <div class="view-header">
                        <h2>Historial de Movimientos</h2>
                        <button class="back-btn" onclick="showMenu()">Volver</button>
                    </div>
                    <div class="action-zone">
                        <div class="form-row">
                            <div class="search-box">
                                <input type="text" id="searchHistorial" placeholder="Buscar en el historial...">
                                <button class="btn btn-search" onclick="filtrarHistorial()">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Acción</th>
                                    <th>Detalles</th>
                                    <th>Fecha y Hora</th>
                                </tr>
                            </thead>
                            <tbody id="tablaHistorial">
                                </tbody>
                        </table>
                    </div>
                </div>

                <div id="view-clientes" class="module-view">
                    <div class="view-header">
                        <h2>Gestión de Clientes</h2>
                        <button class="back-btn" onclick="showMenu()">Volver</button>
                    </div>
                    <div class="action-zone">
                        <div class="form-row">
                            <input type="text" id="clienteNombre" placeholder="Nombre completo" style="flex: 2;">
                            <input type="text" id="clienteTelefono" placeholder="Teléfono" style="flex: 1;">
                            <button class="btn btn-add" onclick="agregarCliente()">Agregar</button>
                            <button class="btn btn-clear" onclick="limpiarCamposClientes()">Borrar campos</button>
                        </div>
                        <div class="form-row" style="margin-top: 15px;">
                            <div class="search-box">
                                <input type="text" id="searchClientes" placeholder="Buscar por nombre o ID...">
                                <button class="btn btn-search" onclick="filtrarClientes()">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tablaClientes">
                                </tbody>
                        </table>
                    </div>
                </div>

                <div id="view-fechas" class="module-view">
                    <div class="view-header">
                        <h2>Calendario de Fechas</h2>
                        <button class="back-btn" onclick="showMenu()">Volver</button>
                    </div>
                    <div class="action-zone">
                        <div class="form-row">
                            <input type="date" id="fechaDia" style="flex: 1;">
                            <input type="text" id="fechaDesc" placeholder="Evento o Mesa Especial" style="flex: 2;">
                            <button class="btn btn-add" onclick="agregarFecha()">Agregar</button>
                            <button class="btn btn-clear" onclick="limpiarCamposFechas()">Borrar campos</button>
                        </div>
                        <div class="form-row" style="margin-top: 15px;">
                            <div class="search-box">
                                <input type="text" id="searchFechas" placeholder="Buscar fecha específica (AAAA-MM-DD)...">
                                <button class="btn btn-search" onclick="filtrarFechas()">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tablaFechas">
                                </tbody>
                        </table>
                    </div>
                </div>

                <div id="view-horarios" class="module-view">
                    <div class="view-header">
                        <h2>Asignación de Horarios</h2>
                        <button class="back-btn" onclick="showMenu()">Volver</button>
                    </div>
                    <div class="action-zone">
                        <div class="form-row">
                            <input type="time" id="horarioHora" style="flex: 1;">
                            <input type="text" id="horarioZona" placeholder="Sección (Comedor, Barra, VIP)" style="flex: 2;">
                            <button class="btn btn-add" onclick="agregarHorario()">Agregar</button>
                            <button class="btn btn-clear" onclick="limpiarCamposHorarios()">Borrar campos</button>
                        </div>
                        <div class="form-row" style="margin-top: 15px;">
                            <div class="search-box">
                                <input type="text" id="searchHorarios" placeholder="Buscar por hora o zona...">
                                <button class="btn btn-search" onclick="filtrarHorarios()">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Hora</th>
                                    <th>Zona Asignada</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tablaHorarios">
                                </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    </div>

    <script>

        let bd = {
            clientes: [
                { id: "001", nombre: "Juan Pérez", telefono: "3312345678" },
                { id: "002", nombre: "María Mendoza", telefono: "3398765432" }
            ],
            fechas: [
                { id: "F01", fecha: "2026-06-15", descripcion: "Reserva de Terraza Familiar" }
            ],
            horarios: [
                { id: "H01", hora: "19:30", zona: "Zona VIP - Mesa 4" }
            ],
            historial: [
                { id: "1024", accion: "Nueva Reserva", detalle: "Se agendó mesa en Terraza", fecha: "15/06/2026 14:32" },
                { id: "1023", accion: "Cliente Creado", detalle: "Se registró a María Mendoza", fecha: "15/06/2026 12:15" }
            ]
        };


        function switchView(viewId) {
            document.getElementById('menu-grid').style.display = 'none';
            const views = document.querySelectorAll('.module-view');
            views.forEach(view => view.style.display = 'none');
            
            const targetView = document.getElementById('view-' + viewId);
            if (targetView) {
                targetView.style.display = 'block';
                document.getElementById('panel-title').innerText = viewId.toUpperCase();
            }
        }

        function showMenu() {
            const views = document.querySelectorAll('.module-view');
            views.forEach(view => view.style.display = 'none');
            document.getElementById('menu-grid').style.display = 'grid';
            document.getElementById('panel-title').innerText = 'INICIO';
        }

    
        function obtenerFechaHoraActual() {
            const ahora = new Date();
            const dia = String(ahora.getDate()).padStart(2, '0');
            const mes = String(ahora.getMonth() + 1).padStart(2, '0');
            const anio = ahora.getFullYear();
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
        }

        function registrarHistorial(accion, detalle) {
            const nuevoLog = {
                id: String(Math.floor(1000 + Math.random() * 9000)),
                accion: accion,
                detalle: detalle,
                fecha: obtenerFechaHoraActual()
            };
            bd.historial.unshift(nuevoLog);
            renderHistorial();
        }


        function renderClientes(filtro = "") {
            const tbody = document.getElementById("tablaClientes");
            tbody.innerHTML = "";
            const datosFiltrados = bd.clientes.filter(c => 
                c.nombre.toLowerCase().includes(filtro.toLowerCase()) || c.id.includes(filtro)
            );

            datosFiltrados.forEach(c => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${c.id}</td>
                        <td>${c.nombre}</td>
                        <td>${c.telefono}</td>
                        <td><button class="btn btn-danger" onclick="eliminarCliente('${c.id}')">Eliminar</button></td>
                    </tr>
                `;
            });
        }

        function renderFechas(filtro = "") {
            const tbody = document.getElementById("tablaFechas");
            tbody.innerHTML = "";
            const datosFiltrados = bd.fechas.filter(f => 
                f.fecha.includes(filtro) || f.descripcion.toLowerCase().includes(filtro.toLowerCase())
            );

            datosFiltrados.forEach(f => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${f.id}</td>
                        <td>${f.fecha}</td>
                        <td>${f.descripcion}</td>
                        <td><button class="btn btn-danger" onclick="eliminarFecha('${f.id}')">Eliminar</button></td>
                    </tr>
                `;
            });
        }

        function renderHorarios(filtro = "") {
            const tbody = document.getElementById("tablaHorarios");
            tbody.innerHTML = "";
            const datosFiltrados = bd.horarios.filter(h => 
                h.hora.includes(filtro) || h.zona.toLowerCase().includes(filtro.toLowerCase())
            );

            datosFiltrados.forEach(h => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${h.id}</td>
                        <td>${h.hora}</td>
                        <td>${h.zona}</td>
                        <td><button class="btn btn-danger" onclick="eliminarHorario('${h.id}')">Eliminar</button></td>
                    </tr>
                `;
            });
        }

        function renderHistorial(filtro = "") {
            const tbody = document.getElementById("tablaHistorial");
            tbody.innerHTML = "";
            const datosFiltrados = bd.historial.filter(h => 
                h.accion.toLowerCase().includes(filtro.toLowerCase()) || h.detalle.toLowerCase().includes(filtro.toLowerCase())
            );

            datosFiltrados.forEach(h => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${h.id}</td>
                        <td>${h.accion}</td>
                        <td>${h.detalle}</td>
                        <td>${h.fecha}</td>
                    </tr>
                `;
            });
        }

        function agregarCliente() {
            const nombre = document.getElementById("clienteNombre").value.trim();
            const telefono = document.getElementById("clienteTelefono").value.trim();

            if (!nombre || !telefono) return alert("Llena todos los campos.");

            const nuevo = {
                id: String(bd.clientes.length + 1).padStart(3, '0'),
                nombre: nombre,
                telefono: telefono
            };

            bd.clientes.push(nuevo);
            registrarHistorial("Cliente Agregado", `Se registró a ${nombre}`);
            limpiarCamposClientes();
            renderClientes();
        }

        function eliminarCliente(id) {
            const cliente = bd.clientes.find(c => c.id === id);
            bd.clientes = bd.clientes.filter(c => c.id !== id);
            if (cliente) registrarHistorial("Cliente Eliminado", `Se borró a ${cliente.nombre}`);
            renderClientes();
        }

        function filtrarClientes() {
            const val = document.getElementById("searchClientes").value;
            renderClientes(val);
        }

        function limpiarCamposClientes() {
            document.getElementById("clienteNombre").value = "";
            document.getElementById("clienteTelefono").value = "";
        }


        function agregarFecha() {
            const fecha = document.getElementById("fechaDia").value;
            const desc = document.getElementById("fechaDesc").value.trim();

            if (!fecha || !desc) return alert("Pon una fecha y su descripción.");

            const nuevo = {
                id: "F" + String(bd.fechas.length + 1).padStart(2, '0'),
                fecha: fecha,
                descripcion: desc
            };

            bd.fechas.push(nuevo);
            registrarHistorial("Fecha Programada", `${fecha} - ${desc}`);
            limpiarCamposFechas();
            renderFechas();
        }

        function eliminarFecha(id) {
            const f = bd.fechas.find(x => x.id === id);
            bd.fechas = bd.fechas.filter(x => x.id !== id);
            if (f) registrarHistorial("Fecha Removida", `Se quitó el día ${f.fecha}`);
            renderFechas();
        }

        function filtrarFechas() {
            const val = document.getElementById("searchFechas").value;
            renderFechas(val);
        }

        function limpiarCamposFechas() {
            document.getElementById("fechaDia").value = "";
            document.getElementById("fechaDesc").value = "";
        }

        function agregarHorario() {
            const hora = document.getElementById("horarioHora").value;
            const zona = document.getElementById("horarioZona").value.trim();

            if (!hora || !zona) return alert("Elige la hora y la zona.");

            const nuevo = {
                id: "H" + String(bd.horarios.length + 1).padStart(2, '0'),
                hora: hora,
                zona: zona
            };

            bd.horarios.push(nuevo);
            registrarHistorial("Horario Asignado", `${hora} en sección ${zona}`);
            limpiarCamposHorarios();
            renderHorarios();
        }

        function eliminarHorario(id) {
            const h = bd.horarios.find(x => x.id === id);
            bd.horarios = bd.horarios.filter(x => x.id !== id);
            if (h) registrarHistorial("Horario Cancelado", `Se eliminó la hora ${h.hora}`);
            renderHorarios();
        }

        function filtrarHorarios() {
            const val = document.getElementById("searchHorarios").value;
            renderHorarios(val);
        }

        function limpiarCamposHorarios() {
            document.getElementById("horarioHora").value = "";
            document.getElementById("horarioZona").value = "";
        }

        function filtrarHistorial() {
            const val = document.getElementById("searchHistorial").value;
            renderHistorial(val);
        }

        window.onload = function() {
            renderClientes();
            renderFechas();
            renderHorarios();
            renderHistorial();
            showMenu();
        };
    </script>
</body>
</html>