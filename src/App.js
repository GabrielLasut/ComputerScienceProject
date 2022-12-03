import React from 'react';
import TopBar from './components/TopBar';
import RequestFile from './components/RequestFile';
import AuditReport from './components/AuditReport';
import {Button, Typography} from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  let [button, setButton] = React.useState(false);
  const darkTheme = createTheme({
    palette: {
      background: {
        paper: 'red',
      },
      mode: 'dark',
    },
  });

  if(!button){
    return(
      <div>
        <ThemeProvider theme={darkTheme} sx={{bgcolor: 'background.paper'}}>
          <Typography align='center'>
            <TopBar />
            <RequestFile setButton={setButton}/>
          </Typography>
        </ThemeProvider>
      </div>
    )
  }
  else{
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <Typography align='center'>
            <TopBar />
            <AuditReport/>
            {/* <div className='backbutton'> */}
            <div style={{marginTop:10}}>
            Audit Another file:
            <Button variant="contained" onClick={()=>setButton(false)} size="small">Click to go back</Button>
            </div>
          </Typography>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
