:root {
  --bg: #071126;
  --panel: #0f1d3f;
  --panel-alt: #16294e;
  --surface: #142245;
  --text: #edf4ff;
  --muted: #9db4d8;
  --accent: #4d86ff;
  --accent-strong: #7db7ff;
  --danger: #5d8de6;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 25px 60px rgba(0, 10, 35, 0.38);
  --radius: 22px;
  --font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2d59 0%, #071126 35%);
  color: var(--text);
  font-family: var(--font);
}

#root {
  display: flex;
  justify-content: center;
  padding: 24px;
}

.app-shell {
  width: 100%;
  max-width: 1320px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(77, 134, 255, 0.14), rgba(10, 18, 42, 0.95));
  border: 1px solid rgba(77, 134, 255, 0.18);
  border-radius: var(--radius);
  backdrop-filter: blur(16px);
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: var(--text);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 18px;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.sidebar-btn:hover,
.sidebar-btn:focus-visible {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.06);
}

.sidebar-btn span {
  font-size: 18px;
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 26px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(35, 72, 143, 0.94) 0%, rgba(14, 24, 47, 0.96) 100%);
  border: 1px solid rgba(77, 134, 255, 0.14);
  box-shadow: var(--shadow);
}

.topbar-logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar-icon {
  font-size: 28px;
  line-height: 1;
}

.topbar h1 {
  margin: 0;
  font-size: 24px;
  letter-spacing: 0.06em;
}

.topbar-label {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.topbar-actions {
  display: flex;
  gap: 12px;
}

.icon-button {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  cursor: pointer;
  font-size: 18px;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.module-panel {
  padding: 28px;
  border-radius: 28px;
  background: rgba(11, 23, 45, 0.96);
  border: 1px solid rgba(77, 134, 255, 0.12);
  box-shadow: var(--shadow);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.module-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.module-title .icon-label {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(77, 134, 255, 0.18);
  font-size: 26px;
}

.module-title h2 {
  margin: 0;
  font-size: 28px;
}

.module-title p {
  margin: 4px 0 0;
  color: var(--muted);
}

.search-panel,
.action-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.search-input,
.input-field,
.select-field {
  width: 100%;
  min-width: 180px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(77, 134, 255, 0.18);
  color: var(--text);
  border-radius: 16px;
  outline: none;
}

.input-field,
.select-field {
  display: block;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  color: var(--muted);
  font-size: 14px;
}

.btn-primary,
.btn-secondary,
.btn-danger,
.btn-outline {
  border: none;
  border-radius: 16px;
  padding: 14px 20px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  font-weight: 700;
}

.btn-primary {
  background: linear-gradient(135deg, #4d86ff 0%, #80b5ff 100%);
  color: #081126;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  border: 1px solid rgba(77, 134, 255, 0.16);
}

.btn-danger {
  background: #5d8de6;
  color: white;
}

.btn-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(77, 134, 255, 0.24);
}

.btn-primary:hover,
.btn-secondary:hover,
.btn-danger:hover,
.btn-outline:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.split-grid {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 24px;
}

.form-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-card h3 {
  margin: 0;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.card,
.table-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card h3,
.table-panel h3 {
  margin: 0;
}

.card p,
.table-panel p {
  margin: 0;
  color: var(--muted);
}

.card-actions,
.row-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.status-pill {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(77, 134, 255, 0.12);
  color: var(--text);
  font-size: 13px;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.data-table th,
.data-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.data-table th {
  color: var(--accent);
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.message {
  color: var(--accent-strong);
  font-size: 14px;
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .split-grid {
    grid-template-columns: 1fr;
  }
}
