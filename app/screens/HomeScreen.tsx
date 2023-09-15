import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions } from "react-native"
import { Header, Screen } from "app/components"
import { useStores } from "app/models"
import { Icon } from "@rneui/themed"
import { colors, spacing } from "app/theme"
import { CardProd } from "app/components/CardProd"
import { products } from "app/utils/products"
import { ProductModel } from "app/models/CartStore"
import { useNavigation } from "@react-navigation/native"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"



export const HomeScreen: FC<any> = observer(function HomeScreen() {

  const { authenticationStore: { logout, nome }, cartStore } = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  const productsToGrid = useMemo(() => {

    const helper: typeof products[] = []

    for (let i = 0; i < products.length; i += 2) {
      helper.push([...products.slice(i, (2 + i))])
    }

    return helper
  }, [])

  function handleAddToCart(item: any) {

    const productExists = cartStore.products.find(i => i.id === item.id)
    if (!productExists) {
      const productModel = ProductModel.create({
        desc: item.desc,
        id: item.id,
        price: item.price,
        qtde: 1,
        uri: item.uri
      })

      cartStore.addToCart(productModel)
    } 
    navigation.navigate("Carrinho")
  }
  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold" }}
        style={{ paddingHorizontal: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Olá, " + nome} RightActionComponent={<Icon onPress={() => {
          GoogleSignin.signOut().then(logout)
        }} color={"#fff"} size={26} type="ant-design" name="logout" />} />
      <Screen contentContainerStyle={{ paddingBottom: spacing.xxl }} style={$root} preset="scroll">

        {productsToGrid.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: "row" }}>
              {item.map((p, index) => (
                <CardProd
                  key={index}
                  onPress={() => handleAddToCart(p)}
                  desc={p.desc}
                  price={Number(p.price).toLocaleString("pt-br", { currency: "BRL", style: "currency" })}
                  uri={p.uri}
                />
              ))

              }
            </View>
          )
        })}
      </Screen>
    </>

  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}
