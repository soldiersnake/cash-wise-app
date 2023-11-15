import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerUsuarios } from "../services/obtenerUsuarios";
import { obtenerUsuario } from "../services/obtenerUsuario";
import { MD5 } from "crypto-js";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [respuesta, setRespuesta] = useState("");

  const [errores, setErrores] = useState({
    usuario: "",
    contrasena: "",
  }); //manejo de errores en form

  if (localStorage.getItem("sessionId")) {
    window.location.href = "/";
  }

  function verificarInicioSesion(correoIngresado, contrasenaIngresada) {
    const usuarioLogueado = usuarios.find((usuario) => {
      return (
        usuario.correo === correoIngresado &&
        usuario.clave === MD5(contrasenaIngresada).toString()
      );
    });

    return usuarioLogueado || null;
  }
  function verificarEstado(correoIngresado, contrasenaIngresada) {
    const usuarioLogueado = usuarios.find((usuario) => {
      return (
        usuario.correo === correoIngresado &&
        usuario.clave === MD5(contrasenaIngresada).toString() &&
        usuario.estado === "1"
      );
    });

    return usuarioLogueado || null;
  }

  const ejecutarFuncionPHP = async () => {
    try {
      const response = await fetch(
        "http://localhost/serverWiseApp/inicioSesion.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("sessionId", JSON.stringify(data));
        const usuarioEntero = await obtenerUsuario(usuario);
        localStorage.setItem("user", JSON.stringify(usuarioEntero));
        localStorage.setItem("estado", usuarioEntero.estado);
        window.location.href = "/";
      } else {
        console.log("Error al ejecutar la función PHP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const usuarios = await obtenerUsuarios();
        setUsuarios(usuarios);
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuarios();
  }, []);

  const handleInicioSesion = (e) => {
    e.preventDefault();

    let nuevosErrores = {}; // Objeto para almacenar los posibles errores

    // Validación para el nombre
    if (!usuario.trim()) {
      nuevosErrores.usuario = "El usuario es requerido";
    }

    // Validación para el apellido
    if (!contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es requerida";
    }

    setErrores(nuevosErrores); // Actualiza el estado de errores con los nuevos errores

    if (Object.keys(nuevosErrores).length === 0) {
      const usuarioLogueado = verificarInicioSesion(usuario, contrasena);

      if (usuarioLogueado) {
        if (verificarEstado(usuario, contrasena)) {
          ejecutarFuncionPHP();
        } else {
          setRespuesta(
            "Su usuario se encuentra bloqueado, entre en contacto para mas informacion"
          );
        }
      } else {
        setRespuesta(
          "Inicio de sesión fallido. Correo o contraseña incorrectos."
        );
      }
    }
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div
            className="card border border-5 rounded-sm mt-5"
            style={{ height: "500px" }}
          >
            <div className="card-header">
              <h1 className="text-center">Iniciar sesión</h1>
              <p className="text-center font-weight-light my-1 fs-5">
                Para acceder a las funciones del sitio, debes iniciar sesión o
                registrarte.
              </p>
            </div>
            <div className="card-body mt-3">
              <form onSubmit={handleInicioSesion}>
                <div className="form-floating mb-1">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    name="login"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                  {errores.usuario && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.usuario}
                    </div>
                  )}
                  <label htmlFor="inputEmail">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                  {errores.contrasena && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.contrasena}
                    </div>
                  )}
                  <label htmlFor="inputPassword">Contraseña</label>
                </div>
                <div className="form-floating mb-1">
                  <button
                    type="submit"
                    className="btn btn-dark btn-login"
                    id="ingresar"
                  >
                    Iniciar sesión
                  </button>
                </div>
                {respuesta != "" ? (
                  <>
                    <h3 className="red-text">{respuesta}</h3>
                  </>
                ) : null}
                <div></div>
                <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                  <Link className="small" to="/olvidoContrasena">
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div>
                <Link to="/registro">¿Necesita una cuenta? ¡Registrese!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
