import fallback from 'express-history-api-fallback'
import path from 'path'
import express from "express"
import bodyParser from 'body-parser'
//import mongooseInit from './libs/mongoose-init'
import {initServices} from './services'


const serverRoot = path.resolve(process.cwd(), "src")
console.log("server root path is : "+serverRoot)
console.log('server is starting...')
const app = express()


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}))

const port = process.env.PORT || 3000
function listening(){
	console.log('listening in port '+port)
}
app.listen(port, listening)
initServices(app)

//set fallback url to public/index.html
const dirname = path.resolve() // for fixing empty path problem when using gulp


console.log('process.env.NODE_ENV:',app.get('env'))
if(app.get('env')==='development'){
  app.use(express.static(path.join(__dirname, '../public')))
}else{
  app.use(express.static(path.join(__dirname, '../build')))

}
app.use(fallback('/public/index.html', { root: dirname }))

// app.use(express.static(path.join(__dirname, 'public')))

export default app