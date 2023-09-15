import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductModel } from "./CartStore"


export const OrderModel = types.model("OrderModelStore")
    .props({
        id: types.string,
        items: types.array(ProductModel)
    })
    .actions((store) => ({

    }))

export const OrdersStoreModel = types
    .model("ListAddressStore")
    .props({
        list: types.array(OrderModel)
    })
    .actions((store) => ({
        add(item: any) {
            store.list.unshift(item)
        },
    }))

export interface OrderModelStoreModel extends Instance<typeof OrderModel> { }

export interface OrdersStore extends Instance<typeof OrdersStoreModel> { }
export interface OrdersStoreSnapshot extends SnapshotOut<typeof OrdersStoreModel> { }

