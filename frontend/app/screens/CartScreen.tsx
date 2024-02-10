import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { Button, Card, Divider, Icon, Input } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { CardProdHorizontal } from "app/components/CardProdHorizontal"
import { useStores } from "app/models"
import { values } from "mobx"
import { TouchableWithoutFeedback } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
const Cupons = [
  {
    code: "LIFE#1010",
    descont: 0.10
  },
  {
    code: "LIFE#1212",
    descont: 0.12
  }
]

export const CartScreen: FC<any> = observer(function CartScreen() {

  const [cupomCode, setCupomCode] = useState("")
  const { height } = Dimensions.get("window")
  const { cartStore } = useStores()

  const discontApplyed = useMemo(() => {
    if (!cupomCode.length) return null

    return Cupons.find(i => i.code === cupomCode)
  }, [cupomCode])

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Carrinho"} LeftActionComponent={<Icon onPress={() => navigation.goBack()} color={"#fff"} size={28} type="feather" name="arrow-left" />} />
      <Screen contentContainerStyle={{ paddingBottom: 80 }} style={$root} preset="scroll">
        {cartStore.products.length ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              style={{ height: height / 2 }}>
              {values(cartStore.products).map((item) => {
                return (
                  <CardProdHorizontal
                    key={item.id}
                    //@ts-ignore
                    product={item}
                  />
                )
              })

              }
            </ScrollView>

            <View >
              <TouchableWithoutFeedback 
              onPress={() => navigation.navigate("Shipping")}
              style={{ paddingVertical: 25 }}>
                <Card wrapperStyle={{ flexDirection: "row", alignItems: "center" }} containerStyle={{ borderRadius: 25, paddingVertical: 20 }}>
                  <Icon type="feather" name="shopping-cart" />
                  <View style={{ marginLeft: 25 }}>
                    <Text text="Envio" style={{ fontWeight: "bold" }} />
                    <Text text="30 min" style={{ fontSize: 12 }} />
                  </View>
                  <View style={{ flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Icon type="feather" name="arrow-down" />
                  </View>
                </Card>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback style={{ paddingVertical: 25 }}>
                <Card wrapperStyle={{ flexDirection: "row", alignItems: "center" }} containerStyle={{ borderRadius: 25, paddingVertical: 20 }}>
                  <Icon type="material-community" name="percent" />
                  <View style={{ marginLeft: 25 }}>
                    <Text text="Cupom" style={{ fontWeight: "bold" }} />
                    {discontApplyed && <Text text={"- " + Number(cartStore.total * discontApplyed.descont).toLocaleString("pt-br", { currency: "BRL", style: "currency" })} style={{ fontSize: 12 }} />}
                  </View>
                  <View style={{ flexDirection: "row", flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                    <Input
                      placeholder="LIFE#1212"
                      value={cupomCode}
                      onChangeText={v => setCupomCode(v.trim().toUpperCase())}
                      style={{ fontFamily: typography.primary.bold, fontSize: 14, textAlign: "center" }}
                      containerStyle={{ width: "60%", height: 30 }}
                      cursorColor={"transparent"}
                      inputContainerStyle={{ backgroundColor: colors.palette.green100, borderRadius: 25 }} />
                    {discontApplyed ? (
                      <Icon type="feather" color={colors.palette.green100} name="check" />
                    ) : null

                    }
                  </View>
                </Card>
              </TouchableWithoutFeedback>

              <Divider style={{ marginTop: 15 }} />
              <View style={{ marginTop: 15 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text text="Total" />
                  <Text style={{ fontWeight: "bold" }} text={Number(cartStore.total - (cartStore.total * (discontApplyed?.descont ?? 0))).toLocaleString("pt-br", { currency: "BRL", style: "currency" })} />
                </View>

                <View style={{ flexBasis: height / 7, marginTop: 30, justifyContent: "flex-end" }}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate("Payment")}>
                    <View style={$tapButton}>
                      <View style={{ width: "60%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Text style={{ color: "#fff" }} text="Checkout" />
                      </View>
                      <View style={{ width: "40%", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10 }}>
                        <Icon type="feather" name="arrow-right" color={"#fff"} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

              </View>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, height, justifyContent: "center", alignItems: "center" }}>
            <Text text="Carrinho vazio" />
          </View>
        )

        }

      </Screen >
    </>

  )
})

const $tapButton: ViewStyle = {
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: colors.palette.green100,
  paddingVertical: 10,
  marginTop: spacing.xs,
}

const $root: ViewStyle = {
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}
