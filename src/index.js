require('dotenv').config();
const app = require('./app')

const main = async ()=>{
  await app.listen(app.get('port'))
  console.log('server on port 3000')
  require('./database').connection();
}

main();