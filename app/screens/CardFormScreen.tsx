import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, Icon as IgniteIcon } from "app/components"
import { colors, spacing } from "app/theme"
import { CheckBox, Icon, Input } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native"
import { useStores } from "app/models"
import { CardModel } from "app/models/CardModel"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"


export const CardFormScreen: FC<any> = observer(function CardFormScreen() {
  // Pull in one of our MST stores
  const { listCardStoreModel } = useStores()

  const [creditCard, setCreditCard] = useState({
    number: "",
    cvv: "",
    val: "",
    titular: ""
  })

  const { width, height } = Dimensions.get("window")
  const [saveCard, setSaveCard] = useState(false)
  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const submit = () => {

    if (Object.values(creditCard).some(i => !i.length)) return

    if (saveCard) {
      const card = CardModel.create({
        ...creditCard
      })
      listCardStoreModel.add(card)
    }

    navigation.navigate("Payment")
  }

  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Novo cartão"} LeftActionComponent={<Icon onPress={() => navigation.goBack()} color={"#fff"} size={28} type="feather" name="arrow-left" />} />
      <Screen style={[$root,]} preset="scroll">
        <View style={{ backgroundColor: "#0002FC", width: 305, height: 172, borderRadius: 24, paddingHorizontal: 24, paddingVertical: 18, alignSelf: "center", marginTop: 50 }}>
          <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <IgniteIcon icon="chip" />
              <IgniteIcon icon="master" />
            </View>
            <Text weight="bold" style={{ color: "#fff", fontSize: 16 }} text={`${creditCard.number.substring(0, 4)}   ${creditCard.number.substring(4, 8)}   ${creditCard.number.substring(8, 12)}    ${creditCard.number.substring(12, 16)}`} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <Text numberOfLines={1} style={{ color: "#fff", fontSize: 14, width: 185 }} weight="bold" text={creditCard.titular} />
              <Text numberOfLines={1} style={{ color: "#fff", fontSize: 14 }} weight="bold" text={creditCard.val} />
            </View>
          </View>
        </View>

        <ScrollView style={{ marginTop: 50 }}>
          <Input
            value={creditCard.titular}
            maxLength={50}
            onChangeText={(v) => setCreditCard(prev => ({ ...prev, titular: v }))}
            placeholder="Nome do titular"
            leftIcon={
              <Icon
                name='person-outline'
                type="material"
                size={24}
              />
            }
          />

          <Input
            value={creditCard.number}
            maxLength={16}
            onChangeText={(v) => setCreditCard(prev => ({ ...prev, number: v }))}
            placeholder="Número do cartão"
            leftIcon={
              <Icon
                type="octicon"
                name="credit-card"
                size={22}
              />
            }
          />

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Input
              value={creditCard.val}
              containerStyle={{ width: "50%" }}
              maxLength={7}
              onChangeText={(v) => setCreditCard(prev => ({ ...prev, val: v }))}
              placeholder="Validade"
              leftIcon={
                <Icon
                  type="material-community"
                  name="calendar-blank"
                  size={22}
                />
              }
            />

            <Input
              value={creditCard.cvv}
              maxLength={3}
              onChangeText={(v) => setCreditCard(prev => ({ ...prev, cvv: v }))}
              placeholder="CVV"
              leftIcon={
                <Icon
                  name='lock-outline'
                  type="material"
                  size={22}
                />
              }
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox containerStyle={{ padding: 0, margin: 0 }} onPress={() => setSaveCard(!saveCard)} checked={saveCard} />
            <Text weight="bold" text="Salvar cartão" />
          </View>
        </ScrollView>
        <View style={{ height: height / 4, justifyContent: "flex-end" }}>
          <TouchableWithoutFeedback onPress={() => submit()}>
            <View style={$tapButton}>
              <View style={{ width: "65%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Text style={{ color: "#fff" }} text="Fazer Pedido" />
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


const $tapButton: ViewStyle = {
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: colors.palette.green100,
  paddingVertical: 10,
  marginTop: spacing.xs,
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}
