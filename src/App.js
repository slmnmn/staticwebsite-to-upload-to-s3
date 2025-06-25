import './App.css';
import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = async () => {
    if (!this.state.selectedFile) {
      console.error("No file selected.");
      return;
    }

    const file = this.state.selectedFile;
    const filename = file.name;

    const apiUrl = `https://k7bwb3fkb9.execute-api.us-east-1.amazonaws.com/prod/prueba-bucket-imagenes-uploadv4/${encodeURIComponent(filename)}`;

    console.log(`Sending file to: ${apiUrl}`);

    try {
      const response = await axios.put(
        apiUrl,
        file,
        {
          headers: {
            'Content-Type': file.type
          }
        }
      );

      console.log('File uploaded successfully:', response);
      this.setState({
        selectedFile: null,
        fileUploadedSuccessfully: true
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Error uploading file: ${error.message}`);
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div className="file-details">
          <h2>Detalles de la imagen:</h2>
          <p><strong>Nombre del archivo:</strong> {this.state.selectedFile.name}</p>
          <p><strong>Tipo de archivo:</strong> {this.state.selectedFile.type}</p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully){
      return (
        <div className="status-message success-message">
          <h4>Su archivo ha sido enviado con éxito.</h4>
        </div>
      );
    } else {
      return (
        <div className="status-message info-message">
          <h4>Seleccione un archivo y luego presione el botón de Enviar.</h4>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="contenedor">
        <h2>Procesamiento de placas</h2>
        <h3>Subir imagen a S3 con React y API Serverless terraform</h3>
        <div className="upload-section">
            <div className="file-input-wrapper">
                <input type="file" onChange={this.onFileChange}/>
                <span className="file-input-label">Seleccionar Archivo</span>
            </div>
          <button className="upload-button" onClick={this.onFileUpload} disabled={!this.state.selectedFile}>
            Enviar
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}

export default App;