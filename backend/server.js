const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir comunicación con frontend
app.use(cors());
app.use(express.json());

// Configuración de conexión
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Trabajo.26",
    database: "contactos_db"
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});


// ✅ RUTA PARA GUARDAR DATOS
app.post("/guardar", (req, res) => {

    const { nombre, correo, asunto, mensaje } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = "INSERT INTO contactos (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)";

    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }

        console.log("Registro insertado:", result);
        res.send("Datos guardados correctamente");
    });
});
// ✅ RUTA PARA LOGIN
app.post("/login", (req, res) => {
    const { correo, password } = req.body;

    // Validar que no estén vacíos
    if (!correo || !password) {
        return res.status(400).json({
            ok: false,
            mensaje: "El correo y la contraseña son obligatorios"
        });
    }

    // Consultar la tabla usuarios
    const sql = "SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND password = ?";

    db.query(sql, [correo, password], (err, resultados) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({
                ok: false,
                mensaje: "Error del servidor al validar el usuario"
            });
        }

        // Si no existe el usuario
        if (resultados.length === 0) {
            return res.status(401).json({
                ok: false,
                mensaje: "Credenciales incorrectas"
            });
        }

        // Si existe el usuario
        res.json({
            ok: true,
            mensaje: "Ingreso correcto",
            usuario: resultados[0]
        });
    });
});

//  RUTAS CRUD PARA PRODUCTOS

// 1. LISTAR todos los productos
app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al listar productos");
        }
        res.json(resultados);
    });
});

// 2. REGISTRAR un producto nuevo
app.post("/productos", (req, res) => {
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send("Nombre y precio son obligatorios");
    }
    const sql = "INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, descripcion, precio, categoria, stock, imagen], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al registrar producto");
        }
        res.send("Producto registrado correctamente");
    });
});

// 3. ACTUALIZAR un producto
app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send("Nombre y precio son obligatorios");
    }
    const sql = "UPDATE productos SET nombre=?, descripcion=?, precio=?, categoria=?, stock=?, imagen=? WHERE id=?";
    db.query(sql, [nombre, descripcion, precio, categoria, stock, imagen, id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al actualizar producto");
        }
        res.send("Producto actualizado correctamente");
    });
});

// 4. ELIMINAR un producto
app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al eliminar producto");
        }
        res.send("Producto eliminado correctamente");
    });
});
// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});