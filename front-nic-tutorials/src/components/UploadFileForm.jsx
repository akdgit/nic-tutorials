import React from "react";
import { useState   } from "react";

function UploadFileForm() {
    return (
        <div>
            <form 
                tabIndex="0" 
                autoFocus 
                role="region" 
                aria-labelledby="form-title" 
                className="form-upload" 
                onSubmit={handleSubmit}
            >
                <h2 
                    id="form-title"
                >
                    Cargar audio tutorial
                </h2>
                <div className="input-container">
                    <input 
                        type="text"
                        tabIndex="0"
                        aria-label="Título para identificar el tutorial"
                        placeholder="Nueva contraseña"
                        required
                    />
                    <label>Título:</label>
                </div>
                <div>
                    <input 
                        type="text"
                        tabIndex="0"
                        aria-label="Breve descripción del tutotial"
                        required
                    />
                    <label>Descripción:</label>
                </div>
                <input 
                    type="file" 
                    tabIndex="0"
                    aria-label="Cargar archivo de audio del tutorial"
                    required
                />
                <button type="submit">Cargar</button>
                <button type="reset">Limpiar</button>
            </form>
        </div>
    )
}

export default UploadFileForm;