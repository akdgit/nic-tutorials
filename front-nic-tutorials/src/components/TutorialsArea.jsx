import React, { useState, useEffect, useRef } from "react";
import "./styles/TutorialsArea.css";
import EditTutorialForm from "./EditTutorialForm";
import { useNavigate } from "react-router-dom";

const speak = (text) => {
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "es-ES";
  msg.rate = 1;
  msg.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
};

function TutorialsArea({ nuevoTutorial = null, adminMode = false }) {
  const navigate = useNavigate();

  const [tutoriales, setTutoriales] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const firstResultRef = useRef(null);
  const endRef = useRef(null);
  const lastAudioRef = useRef(null);

  // ============================
  // Cargar tutoriales
  // ============================

  useEffect(() => {
    const cargarTutoriales = async () => {
      try {
        const res = await fetch(
          "https://nic-audio-tutorials.onrender.com/api/tutorials"
        );

        const data = await res.json();

        setTutoriales(data);
        setFiltrados(data);
      } catch (err) {
        console.error(err);
      }
    };

    cargarTutoriales();
  }, []);

  // ============================
  // Agregar nuevo tutorial
  // ============================

  useEffect(() => {
    if (!nuevoTutorial) return;

    setTutoriales((prev) => {
      const existe = prev.some((t) => t.id === nuevoTutorial.id);
      return existe ? prev : [...prev, nuevoTutorial];
    });

    setFiltrados((prev) => {
      const existe = prev.some((t) => t.id === nuevoTutorial.id);
      return existe ? prev : [...prev, nuevoTutorial];
    });

    setTimeout(() => {
      endRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      lastAudioRef.current?.focus();
    }, 300);

  }, [nuevoTutorial]);

  // ============================
  // Buscar
  // ============================

  const ejecutarBusqueda = () => {

    const termino = busqueda.trim().toLowerCase();

    if (termino === "soyadmin") {

      setBusqueda("");

      speak("Modo administración activo");

      setTimeout(() => {
        navigate("/manager");
      }, 500);

      return;
    }

    if (!termino) {
      setFiltrados(tutoriales);
      return;
    }

    const resultados = tutoriales.filter((t) =>
      t.titulo.toLowerCase().includes(termino) ||
      t.descripcion.toLowerCase().includes(termino)
    );

    setFiltrados(resultados);

    setTimeout(() => {
      firstResultRef.current?.focus();
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      ejecutarBusqueda();
    }
  };

  // ============================
  // Editar
  // ============================

  const handleUpdate = (tutorial) => {
    setEditando(tutorial);
  };

  // ============================
  // Eliminar
  // ============================

  const handleDelete = async (id) => {

    if (!confirm("¿Eliminar este tutorial?")) return;

    try {

      const res = await fetch(
        `https://nic-audio-tutorials.onrender.com/api/tutorials/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("No se pudo eliminar.");
        return;
      }

      setTutoriales((prev) => prev.filter((t) => t.id !== id));
      setFiltrados((prev) => prev.filter((t) => t.id !== id));

    } catch (err) {

      console.error(err);

      alert("Error de conexión.");

    }
  };
  

  const lista = filtrados.length ? filtrados : tutoriales;

  return (
    <div className="tutorial-list">

      <h1 tabIndex="0">Lista de tutoriales</h1>

      <div className="search-box">

        <input
          type="text"
          className="buscador"
          value={busqueda}
          placeholder="Buscar tutorial..."
          aria-label="Buscar tutorial"
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={ejecutarBusqueda}
          aria-label="Buscar"
          className="botonbuscar"
        >
          Buscar
        </button>

      </div>

      {lista.map((t, index) => (

        <div
          key={t.id}
          className="tutorial-item"
        >

          <p
            className="titulo"
            tabIndex="0"
            ref={index === 0 ? firstResultRef : null}
          >
            {t.titulo}
          </p>

          <p
            className="descripcion"
            tabIndex="0"
          >
            {t.descripcion}
          </p>

          <audio
            controls
            src={t.media}
            tabIndex="0"
            ref={index === lista.length - 1 ? lastAudioRef : null}
          />

          {adminMode ? (

            <div className="admin-buttons">

              <button
                className="material-symbols-outlined"
                aria-label="Editar tutorial"
                onClick={() => handleUpdate(t)}
              >
                edit_square
              </button>

              <button
                className="material-symbols-outlined"
                aria-label="Eliminar tutorial"
                onClick={() => handleDelete(t.id)}
              >
                delete
              </button>

            </div>

          ) : (

            <a
              href={t.media}
              download
              className="descargar"
              aria-label={`Descargar ${t.titulo}`}
            >
              Descargar
            </a>

          )}

        </div>

      ))}

      <div ref={endRef}></div>

      {editando && (

        <EditTutorialForm
          tutorial={editando}
          onClose={() => setEditando(null)}
          onSave={(tutorialActualizado) => {

            setTutoriales((prev) =>
              prev.map((t) =>
                t.id === tutorialActualizado.id
                  ? tutorialActualizado
                  : t
              )
            );

            setFiltrados((prev) =>
              prev.map((t) =>
                t.id === tutorialActualizado.id
                  ? tutorialActualizado
                  : t
              )
            );

            setEditando(null);

          }}
        />

      )}
          
    </div>
  );
}

export default TutorialsArea;