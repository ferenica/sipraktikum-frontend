import React from 'react';

// Function for return a page for dynamic routing for 'Lihat Penilaian'
export default function LihatPenilaian({match, location}) {
  const {params: {username}} = match;

  return (
    <>
      <div>
        <h2>Lihat Penilaian</h2>
        <h2>{username}</h2>
      </div>
    </>
  );
}
