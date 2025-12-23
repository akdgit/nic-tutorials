import React, { useEffect, useState }  from "react";
import "./styles/Manager.css";
import UploadFileForm from "../components/UploadFileForm";
import TutorialsArea from "../components/TutorialsArea";
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

function Manager () {
    const [nuevoTutorial, setNuevoTutorial] = useState(null);
    const navigate = useNavigate();
    
    const hanleBack = () => {
        navigate("/");
        speak("Has salido del modo administración");
    }

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
                onClick={hanleBack} 
                aria-label="Volver a la página principal"
                className="boton-volver"
                >
                Volver
            </button>
       </div>
        
        
    );
}

export default Manager;