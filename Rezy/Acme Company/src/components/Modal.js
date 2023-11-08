import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ModalStyle({ flag, close, product,accept }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Modal
        open={flag}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
        <center><label className="title">Payment Sent!</label></center>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <center> A 0.05 USD payment has been sent to the declared payment pointer ID:123123-12312-1231</center>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <center>Sent amount:0.05 USD </center>
          <center>Status:COMPLETED</center>
          <center>Payment ID : 02010-454212-454545-45454</center>
          <center>Metadata { product.Brand ? product.Brand : "Not found "} </center> 
          </Typography>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 350,
              /* maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 }, */
            }}
            pt={2}
            alt="image for product"
            src={ product.image ? product.image : 'https://via.placeholder.com/300/09f/fff.png'}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button 
              variant="contained" 
              style={{backgroundColor:"#8bc34a"}}
              onClick={accept}
            >Close!</Button>
            <Button variant="contained" onClick={close} style={{backgroundColor:"#e91e63"}} >More bottles?</Button>
          </Stack>
        </Box>

      </Modal>
    </div>
  );

}

export default ModalStyle;
