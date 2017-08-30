import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

export default host