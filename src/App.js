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

  onFileUpload = async () => { // ASYNC PQ ES UNA API
  if (!this.state.selectedFile) {
    console.error("No file selected.");
    return;
  }

  const file = this.state.selectedFile;
  const filename = file.name;

  // URL DINAMICA PARA PODER CAMBIARLA CUALQUIER COSA.
  const apiUrl = `https://7unz2d7s24.execute-api.us-east-2.amazonaws.com/TESTING/testinguploadingimagesforprocessing/${encodeURIComponent(filename)}`;

  console.log(`Sending file to: ${apiUrl}`);

  try {
    // 2. Make the PUT request with the file and Content-Type header
    const response = await axios.put(
      apiUrl,
      file, // The file object itself is the request body
      {
        headers: {
          'Content-Type': file.type // Set the Content-Type based on the file's MIME type
        }
      }
    );

    // The request was successful
    console.log('File uploaded successfully:', response);
    this.setState({
      selectedFile: null,
      fileUploadedSuccessfully: true
    });

  } catch (error) {
    // Handle any errors from the API call
    console.error('Error uploading file:', error);
    // Optionally, show an error message to the user
    alert(`Error uploading file: ${error.message}`);
  }
};

  fileData = () => {
  if (this.state.selectedFile) {
    return (
      <div>
        <h2>Detalles de la imagen:</h2>
        <p>Nombre del archivo: {this.state.selectedFile.name}</p>
        <p>Tipo de archivo: {this.state.selectedFile.type}</p>
      </div>
    );
    } else if (this.state.fileUploadedSuccessfully){
      return (
        <div>
          <br />
          <h4>Su archivo ha sido enviado con exito</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Seleccione un archivo y luego presione el botón de Enviar</h4>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="contenedor">
        <h2>Procesamiento de placas</h2>
        <h3>Subir imagen a S3 con React y API Serverless</h3>
        <div>
          <input type= "file" onChange={this.onFileChange}/>
          <button onClick={this.onFileUpload}>
          Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}

export default App;
