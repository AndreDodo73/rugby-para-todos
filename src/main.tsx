import React from "react";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root")!;
const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/admin";

async function boot() {
  if (isAdmin) {
    const { default: AdminApp } = await import("./admin/AdminApp");
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <AdminApp />
      </React.StrictMode>,
    );
    return;
  }

  await import("./index.css");
  const { default: App } = await import("./App");
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

void boot();
