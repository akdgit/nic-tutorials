import React, {useState, useEffect} from "react";
import "./styles/TutorialsArea.css";
import data from "../registers.json";

function TutorialsArea () {
    const [tutoriales, setTutoriales] = useState([]);

    useEffect(() => {
        setTutoriales(data);
    }, []);

    return (
      <div className="tutorial-list">
        <h1 tabIndex="0">Lista de tutoriales</h1>
        {tutoriales.map((tutorial, index) => (
        <div key={index} className="tutorial-item">
          <p className="titulo" tabIndex="0">{tutorial.titulo}</p>
          <p className="descripcion" tabIndex="0">{tutorial.descripcion}</p>

          <audio controls tabIndex="0" src={tutorial.media}></audio>

          <a
            href={tutorial.media}
            download
            className="descargar"
            aria-label={`Descargar ${tutorial.titulo}`}
            tabIndex="0"
          >
            Descargar
          </a>
        </div>
      ))}
    </div>
    );
}

export default TutorialsArea;