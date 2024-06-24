import { SliceStoreCreator } from '../store'
import { CustomerInfoState, createSliceCustomerInfoState } from './info/store'

export type CustomerState = {
  customer: CustomerInfoState
}

export const createCustomerStore: SliceStoreCreator<CustomerState> = (...a) => {
  return {
    customer: {
      ...createSliceCustomerInfoState(...a),
    },
  }
}
