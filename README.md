* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  background-color: #121212;
  color: #ffffff;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.topbar {
  height: 75dp;
  background-color: #1C1C1E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #2C2C2E;
}

.main-layout {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 160px;
  background-color: #1C1C1E;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 14px;
}

.btn-orange {
  width: 100%;
  background-color: #4d86ff;
  color: #edf4ff;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
}

.content-area {
  flex: 1;
  padding: 24px;
}

.grid-menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card {
  background-color: #1C1C1E;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #2C2C2E;
}

.card h3 {
  color: #7db5ff;
  margin-top: 10px;
}

.tabla-historial {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
}

.tabla-historial th {
  background-color: #0f1d3f;
  color: #7db5ff;
  text-align: left;
  padding: 12px;
}

.tabla-historial td {
  padding: 12px;
  border-bottom: 1px solid #1C1C1E;
}

.search-container {
  display: flex;
  background-color: #1C1C1E;
  padding: 12px;
  margin-top: 24px;
  gap: 10px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  outline: none;
}