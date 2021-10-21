export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          nama: 'test1',
          npm: '171717',
        },
        {
          nama: 'test2',
          npm: '171717',
        }
      ])
 
  })
}