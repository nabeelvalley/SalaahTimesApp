import {setCookie, getCookie} from '../helpers/cookieManager'

const initState = {
  default_location: getCookie('DEFAULT_LOCATION')
}

const rootReducer = (state=initState, action) => {
  console.log(state)
  return state
}

export default rootReducer