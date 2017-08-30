import getData from './getData'
import setCronjob from './setCronjob'
export function initServices(app){
  app.use('/services',getData)
  app.use('/services',setCronjob)
}


