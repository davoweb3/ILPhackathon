import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ModalInfo({ flag, close }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // Use a timer to automatically close the modal after 5 seconds
    const timer = setTimeout(() => {
      close();
    }, 50000);
    // Clear the timer if the modal is closed before the timeout
    return () => clearTimeout(timer);
  }, [flag, close]);

  return (
    <div>
      <Modal
        open={flag}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <center><label className="title">Success!</label></center>
          <Typography id="modal-modal-title" variant="h6" component="h3">
           <center> Your payment is on the way.... 💰!</center>
          </Typography>
          <Box style={{  textAlign: 'center', margin:"1em"}}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              As soon as the information is veryfied you will receive your payment!
            </Typography>
            <Typography style={{color:"blue",marginBottom:'2em'}} sx={{ mt: 2 }}>
            <center><label className="title">Thanks for being green!🌳♻️</label></center>  
              
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={close} style={{backgroundColor:"#e91e63"}} >Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalInfo;
