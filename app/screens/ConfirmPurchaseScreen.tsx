import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Header, Screen, Text, Icon as IgniteIcon } from "app/components"
import { colors, spacing } from "app/theme"
import { Icon } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"


export const ConfirmPurchaseScreen: FC<AnimationPlaybackEventInit> = observer(function ConfirmPurchaseScreen() {
  const { height } = Dimensions.get("window")

  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Pagamento Aprovado"} />
      <Screen style={[$root]} preset="fixed">
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 100, }}>
          <View style={{ width: 100, height: 100, marginBottom: 50, borderRadius: 24, justifyContent: "center", alignItems: "center", backgroundColor: colors.palette.green100 }}>
            <IgniteIcon icon="confirm_card" />
          </View>
          <Text style={{ fontSize: 24 }} weight="bold" text="Pedido realizado" />

          <Text style={{ fontSize: 12 }} weight="light" text="Os pedidos chegarão em até 30min!" />
        </View>
        <View style={{justifyContent: "flex-end", height: height / 2}}>
          <TouchableWithoutFeedback onPress={() => { navigation.navigate("Home") }}>
            <View style={$tapButton}>
              <View style={{ width: "50%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Text style={{ color: "#fff" }} text="Fechar" />
              </View>
              <View style={{ width: "35%", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10 }}>
                <Icon type="feather" name="arrow-right" color={"#fff"} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Screen>
    </>

  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}

const $tapButton: ViewStyle = {
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: colors.palette.green100,
  paddingVertical: 10,
  marginTop: spacing.xs,
}
