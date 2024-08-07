'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { useRef, useEffect, useState } from 'react'
import { persistStore } from 'redux-persist'
import AuthorizedLayout from '@/app/Authorized'

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // const [isClient, setIsClient] = useState(false)
  // const persistor = useRef(/persistStore(store)).current

  // useEffect(() => {
  // setIsClient(true)
  // }, [])

  // if (!isClient) {
  // return null // Or a loading spinner
  // }

  return (
    // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <AuthorizedLayout>{children}</AuthorizedLayout>
    // </PersistGate>/
    // </Provider>
  )
}
