import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Card, Divider, Icon } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { TouchableWithoutFeedback } from "react-native"
import { products } from "app/utils/products"
import { CardProdSubs } from "app/components/CardProdSubs"
import { useStripe } from "@stripe/stripe-react-native"
import { api } from "app/services/api"
import { Alert } from "react-native"

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

export const SubsScreen: FC<any> = observer(function SubsScreen() {

  const [cupomCode, setCupomCode] = useState("")
  const { height } = Dimensions.get("window")
  const { listCardStoreModel, cartStore, ordersStoreModel, authenticationStore: { user, authToken, setProp, cashBack } } = useStores()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const productsToSubs = useMemo(() => {
    return products.map((p, index) => ({ id: p.id, desc: p.desc, qtde: index % 2 === 0 ? 1 : 2, uri: p.uri }))
  }, [])

  const fetchPaymentParams = async () => {

    const res = await api.createSubs(user.customerId, authToken)

    if (res.kind === "ok") {
      const { payment: { ephemeralkey, paymentIntent } } = res

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Organic App",
        customerId: user?.customerId,
        customerEphemeralKeySecret: ephemeralkey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: user.nome
        }
      });
      openPaymentSheet()
    }


  }

  const openPaymentSheet = async () => {

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {

      navigation.navigate("ConfirmSubsScreen")
    }
  };

  const navigation = useNavigation<any>()

  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Assinatura"} LeftActionComponent={<Icon onPress={() => navigation.goBack()} color={"#fff"} size={28} type="feather" name="arrow-left" />} />
      <Screen contentContainerStyle={{ paddingBottom: 80 }} style={$root} preset="scroll">
        <>
          <View style={{ padding: 10 }}>
            <Text weight="bold">Produtos</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            horizontal
            style={{ height: height / 2 }}
          >
            {productsToSubs.map((item) => {
              return (
                <CardProdSubs
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
                  <Text text="Quinzenal" style={{ fontWeight: "bold" }} />
                  <Text text="01 e 15 de cada mês" style={{ fontSize: 12 }} />
                </View>
                <View style={{ flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                  <Icon type="feather" name="arrow-down" />
                </View>
              </Card>
            </TouchableWithoutFeedback>

            <Divider style={{ marginTop: 15 }} />
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  gap: 4
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text text="Envio" />
                  <Text style={{ fontWeight: "normal" }} text="Grátis" />

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text text="Total" />
                  <Text style={{ fontWeight: "bold" }} text={Number(54.99).toLocaleString("pt-br", { currency: "BRL", style: "currency" })} />
                </View>
              </View>

              <View style={{ flexBasis: height / 7, marginTop: 30, justifyContent: "flex-end" }}>
                <TouchableWithoutFeedback onPress={fetchPaymentParams}>
                  <View style={$tapButton}>
                    <View style={{ width: "60%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                      <Text style={{ color: "#fff" }} text="Assinar" />
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
