import React, {useEffect, useState} from 'react';
import {Backdrop, Box, CircularProgress, Grid, IconButton, TextField, Typography} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {CipherFormField} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchDecoded, fetchEncoded} from '../../store/cipherThunks';
import {selectDecodedMessage, selectEncodedMessage, selectIsLoading} from '../../store/cipherSlice';
import {toast} from 'react-toastify';

const CipherForm = () => {
  const [cipherData, setCipherData] = useState<CipherFormField>({
    decoded: '',
    password: '',
    encoded: '',
  });
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const decodedMessage = useAppSelector(selectDecodedMessage);
  const encodedMessage = useAppSelector(selectEncodedMessage);

  useEffect(() => {
    if (encodedMessage) {
      setCipherData((prevState) => ({
        ...prevState,
        encoded: encodedMessage.encoded,
        password: '',
        decoded: '',
      }));
    }
  }, [encodedMessage]);

  useEffect(() => {
    if (decodedMessage) {
      setCipherData((prevState) => ({
        ...prevState,
        decoded: decodedMessage.decoded,
        password: '',
        encoded: '',
      }));
    }
  }, [decodedMessage]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCipherData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDecode = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    if (cipherData.password.trim().length === 0 || cipherData.encoded.trim().length === 0) {
      toast.error('Enter your password and decoded message!');
      return;
    }
    try {
      const decoded = {message: cipherData.encoded, password: cipherData.password};
      await dispatch(fetchDecoded(decoded)).unwrap();
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  const handleEncode = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    if (cipherData.password.trim().length === 0 || cipherData.decoded.trim().length === 0) {
      toast.error('Enter your password and encoded message!');
      return;
    }
    try {
      const encoded = {message: cipherData.decoded, password: cipherData.password};
      await dispatch(fetchEncoded(encoded)).unwrap();
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  return (
    <>
      <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Box component="form" sx={{maxWidth: 600, margin: '0 auto', padding: 2}}>
        <Typography variant="h4" sx={{textAlign: 'center', marginBottom: '20px'}}>Vigenère cipher
          application</Typography>
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
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleEncode} type="submit" disabled={loading}>
                <ArrowDownwardIcon/>
              </IconButton>
              <IconButton onClick={handleDecode} type="submit" disabled={loading}>
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
    </>
  );
};

export default CipherForm;
