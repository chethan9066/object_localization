import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState({});

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageData(response.data.image);
        // setOutput(response.data.output);
      // setImageData(file);
      // setOutput(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: "10px" }}>
        <div >
          <div className="fixed-grid">
            <div className='grid'>
              <div className="box">
                <h5 className="title is-5">Input Image</h5>
                {file && (
                  <figure className="image is-square">
                    <img src={URL.createObjectURL(file)} alt="Uploaded" />
                  </figure>
                )}
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file...</span>
                    </span>
                    <span className="file-name"></span>
                  </label>
                </div>
                <button
                  className={`button is-link is-fullwidth ${isLoading ? 'is-loading' : ''
                    }`}
                  onClick={handleUpload}
                  disabled={isLoading || !file}
                >
                  {isLoading ? 'Uploading...' : 'SUBMIT'}
                </button>
              </div>
              <div className="box">
                <h5 className="title is-5">OUTPUT</h5>
                {isLoading && <progress className="progress is-small is-primary" max="100"></progress>}
                {/* {Object.keys(output).map((key) => (
              <div key={key} className="level">
                <div className="level-left">
                  <div className="level-item">
                    <span>{key}</span>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <progress
                      className="progress is-small is-primary"
                      value={output[key]}
                      max="100"
                    >
                      {output[key].toFixed(2)}%
                    </progress>
                  </div>
                </div>
              </div>
            ))} */}
                {imageData && (
                  <figure className="image is-square">
                    <img src={`data:image/png;base64,${imageData}`} alt="output" />
                  </figure>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;