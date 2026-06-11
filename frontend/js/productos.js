// URL base del backend
const URL_BASE = "http://localhost:3000";

// Variable para saber si estamos editando
let idEditando = null;

// ================================
// LISTAR PRODUCTOS
// ================================
function listarProductos() {
    fetch(`${URL_BASE}/productos`)
    .then(res => res.json())
    .then(productos => {
        const tabla = document.getElementById("tablaProductos");
        tabla.innerHTML = "";

        if (productos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="7">No hay productos registrados</td></tr>`;
            return;
        }

        productos.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>$${p.precio}</td>
                    <td>${p.categoria}</td>
                    <td>${p.stock}</td>
                    <td>${p.imagen}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-1" onclick="cargarEditar(${p.id}, '${p.nombre}', '${p.descripcion}', ${p.precio}, '${p.categoria}', ${p.stock}, '${p.imagen}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(error => {
        console.error("Error al listar:", error);
    });
}

// ================================
// GUARDAR O ACTUALIZAR PRODUCTO
// ================================
document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        categoria: document.getElementById("categoria").value,
        stock: document.getElementById("stock").value,
        imagen: document.getElementById("imagen").value
    };

    if (idEditando) {
        // ACTUALIZAR
        fetch(`${URL_BASE}/productos/${idEditando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            idEditando = null;
            document.getElementById("formProducto").reset();
            listarProductos();
        })
        .catch(error => console.error("Error al actualizar:", error));

    } else {
        // REGISTRAR
        fetch(`${URL_BASE}/productos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            document.getElementById("formProducto").reset();
            listarProductos();
        })
        .catch(error => console.error("Error al registrar:", error));
    }
});

// ================================
// CARGAR DATOS PARA EDITAR
// ================================
function cargarEditar(id, nombre, descripcion, precio, categoria, stock, imagen) {
    idEditando = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("precio").value = precio;
    document.getElementById("categoria").value = categoria;
    document.getElementById("stock").value = stock;
    document.getElementById("imagen").value = imagen;

    // Scroll hacia arriba para ver el formulario
    window.scrollTo(0, 0);
}

// ================================
// ELIMINAR PRODUCTO
// ================================
function eliminarProducto(id) {
    if (confirm("¿Estás segura de que quieres eliminar este producto?")) {
        fetch(`${URL_BASE}/productos/${id}`, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            listarProductos();
        })
        .catch(error => console.error("Error al eliminar:", error));
    }
}

// ================================
// CARGAR PRODUCTOS AL ABRIR LA PÁGINA
// ================================
listarProductos();