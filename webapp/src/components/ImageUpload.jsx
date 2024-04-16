import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Grid,
  styled,
  Box,
  Paper,
  CircularProgress,
  LinearProgress,
} from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const ImageContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
}));

const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: theme.spacing(2),
}));

const OutputContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
  marginTop: theme.spacing(3),
}));

const OutputItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(1),
}));

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
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageData(response.data.image);
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Root>
      <ImageContainer>
        <Typography variant="h5" gutterBottom>
          IMG
        </Typography>
        {file && <Image src={URL.createObjectURL(file)} alt="Uploaded" />}
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'SUBMIT'}
        </Button>
      </ImageContainer>
      <OutputContainer>
        <Typography variant="h5" gutterBottom>
          OUTPUT
        </Typography>
        {isLoading && <LinearProgress />}
        {Object.keys(output).map((key) => (
          <OutputItem key={key}>
            <Typography>{key}</Typography>
            <Box display="flex" alignItems="center">
              <Typography>{output[key].toFixed(2)}%</Typography>
              <LinearProgress
                variant="determinate"
                value={output[key]}
                style={{ width: '100px', marginLeft: '1rem' }}
              />
            </Box>
          </OutputItem>
        ))}
      </OutputContainer>
    </Root>
  );
};

export default ImageUpload;