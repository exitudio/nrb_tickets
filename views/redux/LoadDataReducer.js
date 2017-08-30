import * as LoadDataAction from './LoadDataAction'

export const inititialState = {
    loadStatus: '',
    data:{},
    startDate:'2017-01-02',
    endDate:'2017-03-31',
}

export default function productsReducer(state = inititialState, action) {
    switch (action.type) {
        case LoadDataAction.GET_DATA_REQUEST:{
            return {
                ...state,
                loadStatus: LoadDataAction.GET_DATA_REQUEST,
            }
        }
        case LoadDataAction.GET_DATA_FAIL:{
            return {
                ...state,
                loadStatus: LoadDataAction.GET_DATA_FAIL,
            }
        }
        case LoadDataAction.GET_DATA_SUCCESS:{
            return {
                ...state,
                loadStatus: LoadDataAction.GET_DATA_SUCCESS,
                data: action.payload,
            }
        }

        case LoadDataAction.CHANGE_START_DATE:{
            return {
                ...state,
                startDate: action.payload,
            }
        }

        case LoadDataAction.CHANGE_END_DATE:{
            return {
                ...state,
                endDate: action.payload,
            }
        }

        default:
            return state
    }
}