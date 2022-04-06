import React from 'react';
import './App.css';
import {Grid} from "@mui/material";
import SearchItems from "./components/SearchItems";

const App = () => {

    return (
      <Grid
          container
          spacing={2}
          display={{ md: 'flex' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'center' }}
          pt={{ md: 3 }}
      >
          <Grid
            item
            md={10}
            sm={12}
            paddingTop={{ md: 10 }}
            display={{ md: 'flex' }}
            alignItems={{ md: 'center' }}
            justifyContent={{ md: 'center' }}
          >
              <SearchItems />
          </Grid>
      </Grid>
)
}

export default App;
