import React from 'react';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {styled} from '@material-ui/core';

const StyledAccordion = styled(Accordion)({
  backgroundColor: '#F5F6F8',
  boxShadow: 'none',
  width: '100%',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
});

const FilterType = (props) => {
  return (
    <StyledAccordion
      key={props.name}
      expanded={props.isExpanded}
      onChange={(event) => props.expandHandler(event, props.name)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledTypography>{props.name.toUpperCase()}</StyledTypography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {
            props.type.map((value, index) => {
              return (
                <Filter key={index} checkboxHandler={props.checkboxHandler}
                  value={value} index={index} />
              );
            })
          }
        </FormGroup>
      </AccordionDetails>
    </StyledAccordion>
    
  );
};

export default FilterType;

FilterType.propTypes = {
  name: PropTypes.string,
  isExpanded: PropTypes.bool,
  expandHandler: PropTypes.func,
  type: PropTypes.array,
  checkboxHandler: PropTypes.func,
};
