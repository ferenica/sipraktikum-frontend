import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    borderRadius: 10,
  },
  actionBotton: {
    margin: '30px 0 20px 0',
  },
  addIcon: {
    fontSize: 35,
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: '#4F4F4F',
  },
  contentCard: {
    'height': '100%',
    'width': '100%',
    'minHeight': '160px',
    'maxWidth': '330px',
    'margin': '10px',
    'display': 'flex',
    'flexDirection': 'column',
    'borderRadius': 10,
    'backgroundColor': '#FF8326',
    'transition': '.15s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#FFDEC5',
    },
    'boxShadow': '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
}));

const AddLembagaCard = () => {
  const classes = useStyles();
  return (
    <Button className={classes.contentCard} href={'/tambah-lembaga'} data-testid="addbtn">
      <div className="button-add" style={{margin: 'auto', textAlign: 'center', color: '#FFFFFF', fontSize: '20px', justifyContent: 'center'}}>
        <AddIcon className={classes.addIcon}></AddIcon>
        Tambah Lembaga
      </div>
    </Button>
  );
};

export default AddLembagaCard;
