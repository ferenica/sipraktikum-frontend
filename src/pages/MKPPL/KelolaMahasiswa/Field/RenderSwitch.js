import React from 'react';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

const messageOff =
  'Jika Anda mengubah status menjadi Tampilkan, submisi akan ditampilkan ke mahasiswa';
const messageOn =
  'Jika Anda menonaktifkan status Tampilkan, submisi akan dihilangkan di halaman mahasiswa';

function RenderSwitch({input}) {
  return (
    <>
      <Tooltip title={input.value ? messageOn : messageOff} arrow>
        <Switch
          color="primary"
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      </Tooltip>
    </>
  );
}

export default RenderSwitch;
