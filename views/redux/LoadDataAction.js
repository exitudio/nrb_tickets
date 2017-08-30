import axios from 'axios'
export const PRODUCTS_URL = '/services/getdata'

export const GET_DATA_REQUEST = 'get_data_request'
export const GET_DATA_SUCCESS = 'get_data_success'
export const GET_DATA_FAIL = 'get_data_FAIL'
export const CHANGE_START_DATE = 'change_start_date'
export const CHANGE_END_DATE = 'change_end_date'

const MAX_LOAD_TIMES = 3
let loadTimes = 0

const loadProducts = (resolve, reject, startDate, endDate) => {
    axios.get(`${PRODUCTS_URL}?start=${startDate}&end=${endDate}`)
        .then(response => {
            resolve(response)
        })
        .catch(response => {
            //reload if fail
            loadTimes++
            if (loadTimes <= MAX_LOAD_TIMES) {
                loadProducts(resolve, reject)
            } else {
                reject(response)
            }
        })
}

export const onLoadAction = () => {
    loadTimes = 0
    return (dispatch,getState) => {
        dispatch({ type: GET_DATA_REQUEST })
        let startDate = getState().loadDataReducer.startDate
        let endDate = getState().loadDataReducer.endDate
        console.log('startDate:',startDate)
        return new Promise((resolve, reject) => {
            loadProducts(resolve, reject, startDate, endDate)
        })
            .then(response => {
                dispatch({ type: GET_DATA_SUCCESS, payload: response.data })
            })
            .catch(response => {
                console.log(response)
                dispatch({
                    type: GET_DATA_FAIL,
                })
            })


    }
}

export const changeStartDate = date => ({
    type:CHANGE_START_DATE,
    payload: date,
})
export const changeEndDate = date => ({
    type:CHANGE_END_DATE,
    payload: date,
})