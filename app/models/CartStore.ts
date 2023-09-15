import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ProductModel = types.model("products")
    .props({
        id: types.number,
        desc: types.string,
        price: types.number,
        uri: types.string,
        qtde: types.number
    })
    .actions((store) => ({
        increment() {
            console.log("AQ");

            store.qtde += 1
        },
        decrement() {
            store.qtde -= 1
        }
    }))

export const CartStoreModel = types
    .model("CartStore")
    .props({
        products: types.array(ProductModel)
    })
    .views((self) => ({
        get total() {
            return self.products.reduce((acc, current) => {
                return acc += (current.qtde * current.price)
            }, 0)
        }
    }))
    .actions((store) => ({
        addToCart(item: any) {
            const index = store.products.findIndex(i => i.id === item.id)
            if (index === -1) {
                store.products.push(item)
            }
        },
        removeToCart(id: number) {
            const index = store.products.findIndex(i => i.id === id)
            store.products.splice(index, 1)
        },
        purchaseClose() {
            while (store.products.length) {
                store.products.pop()
            }
        }
    }))

export interface ProductStoreModel extends Instance<typeof ProductModel> { }

export interface CartStore extends Instance<typeof CartStoreModel> { }
export interface CartStoreSnapshot extends SnapshotOut<typeof CartStoreModel> { }

