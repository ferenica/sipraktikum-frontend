import styled from 'styled-components';

export const StyledButton = styled.button`
  background: ${(props) => props.primary ? '#FF8326' : 'white'};
  color: ${(props) => props.primary ? '#FFFFFF' : '#FF8326'};
  border: ${
  (props) => props.secondary ? '1px solid #FF8326' : '0px solid #FF8326'
};
  border-radius: 4px;
  min-height: 45px;
  max-width: 150px;
  padding: auto;
  padding-right: 18px;
  padding-left: 18px;
  margin: 4px;
  text-align: center;
  text-overflow: ellipsis;

  &:hover {
    background: ${(props) => props.primary ? '#F15B15' : '#FF8326'};
    color: ${(props) => props.primary ? 'white' : '#FFFFFF'};
  }
  &:focus {
    outline: none;
  }
`;

export const TriadButton = styled(StyledButton)`
  background: #FFFFFF;
  color: #FF8326;
  border: 0px;
  &:hover {
    background: #FFFFFF;
    color: #FF8326;
    text-decoration: underline;
  }
`;

export const WarningButton = styled(StyledButton)`
  background: #FFFFFF;
  color: #fd6969;
  border: 1px solid #fd6969;
  &:hover {
    background: #fd6969;
    color: #FFFFFF;
  }
`;

export const DisabledButton = styled(StyledButton)`
  background: #DEDEDE;
  color: #AAAAAA;
  pointer-events: none;
  &:hover {
    background: #DEDEDE;
    color: #AAAAAA;
  }
`;
