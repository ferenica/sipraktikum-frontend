import React from 'react';
import styled from 'styled-components';
import DefaultAvatar from './../../../assets/MKPPL/default-avatar.png';

// Styled components
const ImageProfile = styled.img`
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const ImageIcon = styled.img`
  width: 48px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default function StyledAvatar(props) {
  return (
    <div style={{textAlign: 'center'}}>
      {props.profile ?
        <ImageProfile src={DefaultAvatar} /> :
        <ImageIcon src={DefaultAvatar}/>
      }
    </div>
  );
}

// Function to split the first initial of user's name
// export default function StyledAvatar(props) {
// const classes = useStyles();
// const [name, setName] = useState('Nama');
// useEffect(() => {
//   getInitials(name)
// });

// function getInitials(string) {
//   const names = string.split(' ');
//   let initials = names[0].substring(0, 1).toUpperCase();

//   if (names.length > 1) {
//     initials += names[names.length - 1].substring(0, 1).toUpperCase();
//   }
//   console.log(initials)
//   setName(initials);
// };

//   let avatar;
//   if (props.icon) {
//     avatar = (
//       <div className={classes.root}>
//         <Avatar className={classes.icon}>{name}</Avatar>
//       </div>
//     );
//   } else {
//     avatar = (
//       <div className={classes.root}>
//         <Avatar className={classes.profile}>{name}</Avatar>
//       </div>
//     );
//   }
//   return <>{avatar}</>;
// }
