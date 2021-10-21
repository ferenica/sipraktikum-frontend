import React, {Component} from 'react';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {DisabledButton} from '../../../../components/MKPPL/Button/Button';
import GrayChips from '../../../../components/MKPPL/Chips/GrayChips';

const StatusSpan = styled.span`
  display: inline-block;
`;
const useStyles = (theme) => ({
  root: {
    width: '274px',
    height: '253px',

    borderRadius: 12,
    textAlign: 'center',
  },
  media: {
    width: '64px',
    height: '64px',
    display: 'block',
    margin: '10px auto 20px',

    // paddingTop: '56.25%', // 16:9
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  disable: {
    background: '#DEDEDE',
    color: '#AAAAAA',
  },
});

class CardPratikum2 extends Component {
  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Pratikum 2"
          image={require('../../../../assets/MKPPL/folder.png')}
          title="Pratikum 2"
        />
        <CardContent>
          <h4 className={classes.header}>Praktikum 2</h4>
          <h5 style={{color: '#4F4F4F'}}>
            Status:{' '}
            <StatusSpan>
              <GrayChips label="Tidak Aktif" />
            </StatusSpan>
          </h5>
        </CardContent>
        <CardActions className={classes.action}>
          <DisabledButton>Lihat Detail</DisabledButton>
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(useStyles)(CardPratikum2);
