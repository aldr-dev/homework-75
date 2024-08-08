import React, {useState} from 'react';
import {Box, Grid, IconButton, TextField, Typography} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {CipherFormField} from '../../types';

const CipherForm = () => {
  const [cipherData, setCipherData] = useState<CipherFormField>({
    decoded: '',
    password: '',
    encoded: '',
  });

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCipherData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (cipherData.decoded.trim() && cipherData.password.trim().length !== 0 && cipherData.encoded.trim()) {

    }
  };


  return (
    <Box onSubmit={onFormSubmit} component="form" sx={{maxWidth: 600, margin: '0 auto', padding: 2}}>
      <Typography variant="h4" sx={{textAlign: 'center', marginBottom: '20px'}}>Vigenère cipher application</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={onFieldChange}
            label="Decoded Message"
            id="DecodedMessage"
            name="decoded"
            value={cipherData.decoded}
            multiline
            rows={4}/>
        </Grid>
        <Grid item xs={12} container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              onChange={onFieldChange}
              label="Password"
              id="password"
              name="password"
              value={cipherData.password}
              type="password"
              required
            />
          </Grid>
          <Grid item>
            <IconButton type="submit">
              <ArrowDownwardIcon/>
            </IconButton>
            <IconButton type="submit">
              <ArrowUpwardIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onFieldChange}
            label="Encoded Message"
            id="EncodedMessage"
            name="encoded"
            value={cipherData.encoded}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CipherForm;