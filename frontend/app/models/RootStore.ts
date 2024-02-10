import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { UserStoreModel } from "./users"
import { CartStoreModel } from "./CartStore"
import { ListAddressStoreModel } from "./Address"
import { ListCardStoreModel } from "./CardModel"
import { OrdersStoreModel } from "./OrdersModel"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  users: types.optional(types.array(UserStoreModel), []),
  cartStore: types.optional(CartStoreModel, {}),
  listAddressStoreModel: types.optional(ListAddressStoreModel, {}),
  listCardStoreModel: types.optional(ListCardStoreModel, {}),
  ordersStoreModel: types.optional(OrdersStoreModel, {}),
})
  .actions(self => ({
    setUser(user: any) {
      self.users.push(user)
    }
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
