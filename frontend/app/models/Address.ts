import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CoordModel = types.model("coordModelStore")
    .props({
        lat: types.maybeNull(types.number),
        lng: types.maybeNull(types.number)
    })

export const AddressModel = types.model("address")
    .props({
        description: types.string,
        country: types.maybeNull(types.string),
        location: types.optional(CoordModel, {})
    })
    .actions((store) => ({

    }))

export const ListAddressStoreModel = types
    .model("ListAddressStore")
    .props({
        list: types.array(AddressModel)
    })
    .actions((store) => ({
        add(item: any) {
            store.list.unshift(item)
        },
    }))

export interface AddressStoreModel extends Instance<typeof AddressModel> { }

export interface ListAddressStore extends Instance<typeof ListAddressStoreModel> { }
export interface ListAddressStoreSnapshot extends SnapshotOut<typeof ListAddressStoreModel> { }

