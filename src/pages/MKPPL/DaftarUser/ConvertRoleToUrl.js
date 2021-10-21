/**
 * Convert string role to string role with '-'
 * that will be used in url
 * @example
 * // returns 'supervisor-sekolah'
 * convertRoleToURL("Supervisor Sekolah");
 * @param {string} role The role.
 * @return {string} The role with '-'.
 */
export default function convertRoleToURL(role) {
  switch (role) {
    case 'Supervisor Sekolah':
      return 'supervisor-sekolah';
    case 'Supervisor Lembaga':
      return 'supervisor-lembaga';
    case 'Koordinator Praktikum':
      return 'koordinator-kuliah';
    case 'Mahasiswa':
      return 'mahasiswa';
    case 'Administrator':
      return 'administrator';
    default:
      return '';
  }
}
