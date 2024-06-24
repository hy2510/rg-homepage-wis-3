import { Customer, makeCustomer } from '@/repository/client/object/customer'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: Customer
}

type Action = {
  setCustomerInfo: (payload?: Customer) => void
}

export type CustomerInfoState = {
  info: State & {
    action: Action
  }
}

export const createSliceCustomerInfoState: SliceStoreCreator<
  CustomerInfoState
> = (set) => ({
  info: {
    payload: makeCustomer(),
    action: {
      setCustomerInfo: (payload) =>
        set((state) => {
          if (payload) {
            state.customer.info.payload = payload
          }
        }),
    },
  },
})
