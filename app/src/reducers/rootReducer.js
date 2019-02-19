import { setCookie, getCookie } from '../helpers/cookieManager'

const initState = {
  default_location: getCookie('DEFAULT_LOCATION'),
  times: [],
  indexes: [],
  current_location: null
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'SET_DEFAULT_LOCATION') {
    setCookie('DEFAULT_LOCATION', action.key, 3600)
    return {
      ...state,
      default_location: getCookie('DEFAULT_LOCATION')
    }
  }
  if (action.type === 'SET_LOCATION_TIMES') {
    let times = state.times
    times[action.key] = action.times
    return {
      ...state,
      times
    }
  }
  if (action.type === 'SET_INDEXES') {
    return {
      ...state,
      indexes: action.indexes
    }
  }
  if (action.type === 'SET_CURRENT_LOCATION') {
    let indexes = [...state.indexes]
    indexes[action.location.key] = action.location
    let current_location = action.location
    return {
      ...state
      , indexes, current_location
    }
  }
  return state
}

export default rootReducer
