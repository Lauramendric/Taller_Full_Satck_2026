// Verificar si existe una sesión activa
const usuario = localStorage.getItem("usuario");

if (!usuario) {
  alert("Debes iniciar sesión para ingresar al panel administrativo.");
  window.location.href = "login.html";
}

// Botón cerrar sesión
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
});