const formLogin = document.getElementById("formLogin");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const mensajeLogin = document.getElementById("mensajeLogin");

function mostrarMensaje(texto, tipo) {
  mensajeLogin.textContent = texto;
  mensajeLogin.className = `alert alert-${tipo} mt-3 mb-0 text-center`;
  mensajeLogin.style.display = "block";
}

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const correo = inputCorreo.value.trim();
  const password = inputPassword.value.trim();

  // Validar campos vacíos en el frontend
  if (correo === "" || password === "") {
    mostrarMensaje("Debes escribir el correo y la contraseña.", "warning");
    return;
  }

  try {
    const respuesta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correo, password })
    });

    const datos = await respuesta.json();

    if (datos.ok === true) {
      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));
      mostrarMensaje(datos.mensaje, "success");

      // Redirigir al panel administrativo después de 1 segundo
      setTimeout(() => {
        window.location.href = "admin-productos.html";
      }, 1000);

    } else {
      mostrarMensaje(datos.mensaje, "danger");
    }

  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", "danger");
    console.error("Error:", error);
  }
});