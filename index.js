const config = require('./config');

const { port } = config || 3000;

const app = require('./app')


app.listen(port,()=>{
    console.log('Server is running on port:', port)
})