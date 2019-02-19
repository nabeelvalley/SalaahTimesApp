import { setCookie, getCookie } from '../helpers/cookieManager'

const initState = {
  default_location: getCookie('DEFAULT_LOCATION')
}

const rootReducer = (state = initState, action) => {
  console.log(action)
  if (action.type === 'SET_DEFAULT_LOCATION') {
    setCookie('DEFAULT_LOCATION', action.key, 3600)
    return {
      ...state,
      default_location: getCookie('DEFAULT_LOCATION')
    }
  }
  return state
}

export default rootReducer
