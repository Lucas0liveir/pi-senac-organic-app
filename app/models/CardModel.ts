import { Instance, SnapshotOut, types } from "mobx-state-tree"


export const CardModel = types.model("card")
    .props({
        number: types.string,
        cvv: types.string,
        val: types.string,
        titular: types.string
    })
    .actions((store) => ({

    }))

export const ListCardStoreModel = types
    .model("ListAddressStore")
    .props({
        list: types.array(CardModel)
    })
    .actions((store) => ({
        add(item: any) {
            store.list.unshift(item)
        },
    }))

export interface AddressStoreModel extends Instance<typeof CardModel> { }

export interface LisCardStore extends Instance<typeof ListCardStoreModel> { }
export interface ListCardStoreSnapshot extends SnapshotOut<typeof ListCardStoreModel> { }

