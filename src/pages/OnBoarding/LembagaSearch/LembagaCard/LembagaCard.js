import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles, withStyles, styled} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    'minWidth': '330px',
    'display': 'flex',
    'margin': '10px',
    'flexDirection': 'column',
    'borderRadius': 10,
    'transition': '.15s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#FFDEC5',
    },
  },
  actionBotton: {
    textAlign: 'right',
    margin: '0px 12px 12px 0px',
  },
  orangeLine: {
    borderLeft: '4px solid #ff0000',
    paddingLeft: '10px',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Nunito Sans',
    color: '#4F4F4F',
  },
  institusi: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
    color: '#404852',
    textTransform: 'capitalize',
    margin: '6px 0px 8px 0px',
  },
  tema: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
    color: '#FF9C51',
    textTransform: 'capitalize',
    margin: '6px 0px 8px 0px',
  },
  description: {
    fontSize: 13,
    color: '#4F4F4F',
  },
  rightAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

const StyledButton = styled(Button)({
  'boxShadow': 'none',
  'textTransform': 'none',
  'fontSize': 14,
  'padding': '8.5px 18px',
  'lineHeight': 1,
  'color': '#FF8326',
  'backgroundColor': 'white',
  'transition': '0.1s',
  '&:hover': {
    backgroundColor: '#FF8326',
    color: 'white',
    boxShadow: 'none',
  },
});

const CustomCardContent = withStyles({
  root: {
    padding: '10px',
    paddingLeft: '15px',
    lineHeight: 1.4,
    overflow: 'auto',
    width: '314px',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
})(CardContent);

const LembagaCard = (props) => {
  const classes = useStyles();
  let editButton;
  if (props.isAdmin) {
    editButton = (
      <CardActions className={classes.rightAlign}>
        <StyledButton href={'/kelola-lembaga/' + props.data.id}>
          Edit
        </StyledButton>
      </CardActions>
    );
  }
  return (
    <Card className={classes.card}>
      <CardActionArea data-testid="card-button" onClick={() => {
        window.open('detail-lembaga/' + props.data.id + '/');
      }}>
        <CustomCardContent>
          <div className={classes.orangeLine}>
            <div className={classes.title}>{props.data.nama}</div>
            <div className={classes.institusi}>{props.data.institusi.nama}</div>
            <div className={classes.tema}>{props.data.tema.nama}</div>
          </div>
        </CustomCardContent>
      </CardActionArea>
      {editButton}
    </Card>
  );
};

export default LembagaCard;

LembagaCard.propTypes = {
  isAdmin: PropTypes.bool,
  data: PropTypes.object,
};
