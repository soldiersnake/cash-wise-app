import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

const ModalEditarPerfil = ({ showModal, cerrarModal, usuario, cliente }) => {
  const [formData, setFormData] = useState({
    idusuario: 0,
    nombre: "",
    apellido: "",
    sueldo: 0,
  });

  const [errores, setErrores] = useState({
    nombre: "",
    apellido: "",
    sueldo: "",
  }); //manejo de errores en form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (usuario) {
      setFormData({
        idusuario: usuario.idusuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        sueldo: cliente.sueldomensual,
      });
    }
  }, [usuario, cliente, showModal]);

  const showToast = () => {
    toast.info("Perfil editado", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleEditar = async () => {

    let nuevosErrores = {}; // Objeto para almacenar los posibles errores

    // Validación para el nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }

    // Validación para el apellido
    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = "El apellido es requerido";
    }

    // Validación para el apellido
    if (!formData.sueldo.trim()) {
        nuevosErrores.sueldo = "El sueldo es requerido";
      }

    setErrores(nuevosErrores); // Actualiza el estado de errores con los nuevos errores

    if (Object.keys(nuevosErrores).length === 0) {

        try {
          const response = await fetch(
            "http://localhost/serverWiseApp/editarUsuario.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            if (data.mensaje == "true") {
              cerrarModal();
              setTimeout(() => {
                window.location.reload();
              }, 1300);
            } else {
              console.error("Error al editar el perfil.");
            }
          } else {
            console.error("Error en la solicitud al servidor.");
          }
        } catch (error) {
          console.error("Error en la solicitud al servidor:", error);
        }
    
        showToast();
    }

  };

  return (
    <div>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar perfil</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <form className="modal-body">
                <input
                  type="hidden"
                  name="idusuario"
                  value={usuario.idusuario}
                />
                <div className="form-group m-2">
                  <label className="mb-2" htmlFor="nombre">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    name="nombre"
                  />
                  {errores.nombre && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.nombre}
                    </div>
                  )}
                </div>
                <div className="form-group m-2">
                  <label className="mb-2" htmlFor="apellido">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    name="apellido"
                  />
                  {errores.apellido && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.apellido}
                    </div>
                  )}
                </div>

                {!usuario.admin ? (
                  <div className="form-group m-2">
                    <label className="mb-2" htmlFor="sueldo">
                      Sueldo:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="sueldo"
                      value={formData.sueldo}
                      onChange={handleChange}
                      name="sueldo"
                    />
                    {errores.sueldo && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.sueldo}
                    </div>
                  )}
                  </div>
                ) : null}
              </form>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button className="btn btn-primary" onClick={handleEditar}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
};

ModalEditarPerfil.propTypes = {
  showModal: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
  usuario: PropTypes.any.isRequired,
  cliente: PropTypes.any.isRequired,
};

export default ModalEditarPerfil;
