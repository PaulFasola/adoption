import React from 'react';
import { Box, Grid } from '@material-ui/core';

export const Donate: React.FC = () => {
  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Box m={1} p={2}>
        This view will showcase the donation form.
      </Box>
    </Grid>
  );
};
