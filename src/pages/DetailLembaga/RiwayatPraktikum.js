import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Docs from '../../assets/MKPPL/docs.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: '5px',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,

  },
  sumMahasiswa: {
    background: '#B8EFCF',
    borderRadius: '50px',
    width: '100%',
    color: '#219653',
    fontFamily: 'Nunito Sans',
    fontSize: '12px',
    alignContent: 'center',
    alignItems: 'center',
  },
}));

const CustomAccordion = withStyles({
  root: {
    border: '1px solid #DEDEDE',
    borderRadius: '5px',
  },
})(Accordion);

const RiwayatPraktikum = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const listLaporan = props.laporan.data.map((index) => {
    return <li>{index.nama_laporan}</li>;
  });
  return (
    <div className={classes.root}>
      <CustomAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            <img src={Docs} style={{width: '36px'}} alt=""></img>
            <div style={{marginLeft: '10px'}}>
              <div>{props.periode} {props.db_periode}</div>
              <div id="target" className={classes.sumMahasiswa}>{props.count} MAHASISWA</div>
            </div>

          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{textAlign: 'left', marginLeft: '5%'}}>
          <Typography>
            <ul>
              {listLaporan}
            </ul>
          </Typography>
        </AccordionDetails>
      </CustomAccordion>
    </div>
  );
};

export default RiwayatPraktikum;

