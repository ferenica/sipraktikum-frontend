import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function Switch({input, label}) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          // control={
          //   <Switch
          //     label={label}
          //     checked={input.value ? true : false}
          //     onChange={input.onChange}
          //   />}
          label="Tampilkan:"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}


// export default function StyledSwitch(props) {
//   const [state, setState] = React.useState({
//     checked: props.checked,
//   });

//   const handleChange = (event) => {
//     alert('Apakah Anda yakin ingin mengubah status tampilkan laporan?');
//     setState({...state, [event.target.name]: event.target.checked});
//   };

//   return (
//     <FormControl component="fieldset">
//       <FormGroup aria-label="position" row>
//         <FormControlLabel
//           id="status_publikasi"
//           value="show"
//           control={
//             <Switch
//               color="primary"
//               checked={state.checked}
//               onChange={handleChange}
//               name="checked"
//             />}
//           label="Tampilkan:"
//           labelPlacement="start"
//           m={2}
//         />
//       </FormGroup>
//     </FormControl>
//   );
// }
