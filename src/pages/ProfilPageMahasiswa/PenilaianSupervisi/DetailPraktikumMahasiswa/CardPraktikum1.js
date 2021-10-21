import React, {Component} from 'react';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {StyledButton} from '../../../../components/MKPPL/Button/Button';
import Chips from '../../../../components/MKPPL/Chips/Chips';
import {Link} from 'react-router-dom';

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
});

class CardPratikum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <Card data-test="component-card-pratikum-satu" className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Pratikum 1"
          image={require('../../../../assets/MKPPL/folder.png')}
          title="Pratikum 1"
        />
        <CardContent>
          <h4 className={classes.header}>Praktikum 1</h4>
          <h5 style={{color: '#4F4F4F'}}>
            Status:{' '}
            <StatusSpan>
              <Chips label="Aktif" />
            </StatusSpan>
          </h5>
        </CardContent>
        <Link to="/mahasiswa/penilaian/detail-praktikum">
          <CardActions className={classes.action}>
            <StyledButton secondary>
              Lihat Detail
            </StyledButton>
          </CardActions>
        </Link>
      </Card>
    );
  }
}
export default withStyles(useStyles)(CardPratikum);
