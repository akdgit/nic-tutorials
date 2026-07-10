import React, { useEffect, useState }  from "react";
import "./styles/Manager.css";
import UploadFileForm from "../components/UploadFileForm";
import TutorialsArea from "../components/TutorialsArea";
import { useNavigate } from "react-router-dom";

function Manager () {
    const [nuevoTutorial, setNuevoTutorial] = useState(null);
    const navigate = useNavigate();

    const handleVolver = () => {
        if (!("speechSynthesis" in window)) {
            navigate("/");
            return;
        }

        window.speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance(
            "Modo administrador desactivado"
        );

        msg.lang = "es-ES";
        msg.onend = () => navigate("/");

        window.speechSynthesis.speak(msg);
   };

    return (
        <div 
            className="admin" 
            aria-live="assertive"
            id="admin-panel"
            tabIndex="-1"
            >
            <h1>Administración de tuotoriales</h1>
            <UploadFileForm  onTutorialAdded={setNuevoTutorial} />
            <TutorialsArea  nuevoTutorial={nuevoTutorial} adminMode = { true } />
            <button
                className="botonvolver"
                onClick={handleVolver}
                aria-label="Volver a la página principal"
                >
                Volver
            </button>
        </div>
        
        
    );
}

export default Manager;