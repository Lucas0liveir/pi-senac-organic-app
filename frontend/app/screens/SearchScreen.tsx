import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, StatusBar, StyleSheet, ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { View } from "react-native"
import { products } from "app/utils/products"
import { CardProd } from "app/components/CardProd"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"
import { ProductModel } from "app/models/CartStore"
import { spacing } from "app/theme"
import { Icon, Input } from "@rneui/themed"



export const SearchScreen: FC<any> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  const { height } = Dimensions.get("window")
  const { cartStore } = useStores()
  const [query, setQuery] = useState("")
  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  const productsToGrid = useMemo(() => {

    if (!query.length) return []

    const filter = products.filter(item => item.desc.toLowerCase().includes(query.toLowerCase()))
    const helper: typeof filter[] = []

    for (let i = 0; i < filter.length; i += 2) {
      helper.push([...filter.slice(i, (2 + i))])
    }

    return helper
  }, [query])

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
    <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl, marginTop: StatusBar.currentHeight + 20 }} style={$root}>
      <Input
        placeholder='Buscar na loja'
        value={query}
        rightIcon={<Icon name="search1" type="ant-design" />}
        onChangeText={texto => setQuery(texto)}
        containerStyle={styles.searchBox}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        style={styles.searchBox}
      />
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

      {!productsToGrid.length && (

        <View style={{ justifyContent: "center", alignItems: "center", height }}>
          <Text text="Nenhum Resultado" />
        </View>
      )
      }
    </ScrollView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}

const styles = StyleSheet.create({
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderBottomWidth: 0,
    borderRadius: 8,
    borderColor: '#F3F6F8',
    color: '#000',
    backgroundColor: '#F3F6F8',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
  },
});