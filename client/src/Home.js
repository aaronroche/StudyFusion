import Stack from '@mui/material/Stack';
import StudyFusionLogo from './StudyFusionLogo.png';
import UMLLogo from './uml-logo.png';
import './Home.css'

export default function ScheduleSS() {
  return (
          <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
          >
              <img
                  className="d-inline-block align-top"
                  src={StudyFusionLogo}
                  width="400" height="400"
                  alt="study fusion logo"
              />
              <div>
                  <h1 id='title' className='home-text-title'>StudyFusion</h1>
                  <h1 id='title-desc' className='home-text-title'>Join a Study Group Today!</h1>
              </div>
              <div className='blue-rect'>
                  <Stack 
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                  >
                      <img
                          className="d-inline-block align-top"
                          src={UMLLogo}
                          width="400" height="400"
                          alt="study fusion logo"
                      />
                      <h2 className='study-desc'>
                          Offering a collaborative and enjoyable experience for others,
                          StudyFusion promotes growth among its users
                      </h2>       
                  </Stack>
              </div>
          </Stack>
  );
}