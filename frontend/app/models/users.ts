import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("AuthenticationStore")
  .props({
    email: types.maybeNull(types.string),
    senha: types.maybeNull(types.string),
    nome: types.maybeNull(types.string),
    cpf: types.maybeNull(types.string),
  })
  .actions((store) => ({
    setData(key: "email" | "senha" | "nome" | "cpf", value?: string) {
      store[key] = value
    }
  }))

// @demo remove-file
