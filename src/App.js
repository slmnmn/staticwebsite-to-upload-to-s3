import './App.css';
import React, {Component} from 'react';

class App extends Component{
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  } 

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.put("https://7unz2d7s24.execute-api.us-east-2.amazonaws.com/TESTING/testinguploadingimagesforprocessing/", formData).then(() => {
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
    })
  }
  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    //llamar api (aun no esta disponible)
    console.log(formData);
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
  }

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
