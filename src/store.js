import { configureStore } from '@reduxjs/toolkit'
import { modelReducer, addressReducer, issueReducer, DateReducer, MobileReducer, ImageReducer, UserReducer, quotesReducer, partnerreducer, deviceReducer, quoteidreducer } from './reduxstore'
export default configureStore({
  reducer: {
    model : modelReducer,
    address : addressReducer,
    issues : issueReducer,
    date : DateReducer,
    mobile : MobileReducer,
    image : ImageReducer,
    userid : UserReducer,
    quotes : quotesReducer,
    partner : partnerreducer,
    device : deviceReducer,
    quoteid : quoteidreducer
  },
})
