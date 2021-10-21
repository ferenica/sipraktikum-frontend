/**
 * @param {*} deadlineStr
 * @param {*} waktu_submisi
 */
export function countTimeLeft(deadlineStr, waktu_submisi) {
  if (deadlineStr === undefined || deadlineStr === null) {
    deadlineStr = '-';
    return {
      deadlineStrTime: '',
      terlambat: false,
      txtSisaDeadline: '-',
      deadline: '-',
      now: '-',
    };
  } else {
    const deadlineStrTime = 'T' + deadlineStr.split(' ')[1] + ':00';
    const deadlineStrDate = deadlineStr
        .split(' ')[0]
        .split('-')
        .reverse()
        .join('-');
    const deadline = new Date(deadlineStrDate + deadlineStrTime);
    let now = new Date();
    if (waktu_submisi != null) {
      const nowSubmisi = waktu_submisi;

      const nowStrTime = 'T' + nowSubmisi.split(' ')[1] + ':00';
      const nowStrDate = nowSubmisi
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-');
      now = new Date(nowStrDate + nowStrTime);
    }
    console.log(now);
    console.log(deadline);
    let selisih = (now.getTime() - deadline.getTime()) / 1000;
    console.log(selisih);

    let terlambat = false;
    let txtSisaDeadline = '';
    if (selisih > 0) {
      terlambat = true;
      if (selisih >= 60 * 60 * 24) {
        selisih = Math.round(selisih / (60 * 60 * 24));
        txtSisaDeadline = selisih + ' hari';
      } else if (selisih >= 60 * 60) {
        selisih = Math.round(selisih / (60 * 60));
        txtSisaDeadline = selisih + ' jam';
      } else if (selisih >= 60) {
        selisih = Math.round(selisih / 60);
        txtSisaDeadline = selisih + ' menit';
      } else {
        selisih = Math.round(selisih);
        txtSisaDeadline = selisih + ' detik';
      }
    } else {
      selisih = selisih * -1;
      if (selisih >= 60 * 60 * 24) {
        selisih = Math.round(selisih / (60 * 60 * 24));
        txtSisaDeadline = selisih + ' hari';
      } else if (selisih >= 60 * 60) {
        selisih = Math.round(selisih / (60 * 60));
        txtSisaDeadline = selisih + ' jam';
      } else if (selisih >= 60) {
        selisih = Math.round(selisih / 60);
        txtSisaDeadline = selisih + ' menit';
      } else {
        selisih = Math.round(selisih);
        txtSisaDeadline = selisih + ' detik';
      }
    }
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    deadlineStr = deadline.toLocaleDateString('id-ID', options);

    return {
      deadlineStrTime: deadlineStrTime,
      terlambat: terlambat,
      txtSisaDeadline: txtSisaDeadline,
      deadline: deadline,
      now: now,
    };
  }
}

export function getDatetimeNow() {
  const currentdate = new Date();

  const datetime =
    addZero(currentdate.getDate()) +
    '-' +
    addZero(currentdate.getMonth() + 1) +
    '-' +
    currentdate.getFullYear() +
    ' ' +
    addZero(currentdate.getHours()) +
    ':' +
    addZero(currentdate.getMinutes());
  console.log(datetime);
  return datetime;
}
export function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
