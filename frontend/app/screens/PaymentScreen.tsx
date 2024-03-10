import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, Dimensions, FlatList, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Header, Screen, Text, Icon as IgniteIcon } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "@rneui/themed"
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler"
import { useStores } from "app/models"
import { OrderModel } from "app/models/OrdersModel"
import { gerarIdPedido } from "app/utils/gerarId"
import { ProductModel } from "app/models/CartStore"
import { useStripe } from "@stripe/stripe-react-native"
import { api } from "app/services/api"
import { Alert } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"


export const PaymentScreen: FC<any> = observer(function PaymentScreen() {
  const { listCardStoreModel, cartStore, ordersStoreModel, authenticationStore: { user, authToken, setProp, cashBack } } = useStores()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { width, height } = Dimensions.get("window")
  const [i, setIndex] = useState(0)

  const scrollXIndex = useRef(new Animated.Value(0)).current

  const scrollXAnimated = useRef(new Animated.Value(0)).current

  const navigation = useNavigation<any>()
  const data = [0, 0, 0, 0]

  const setActiveIndex = useCallback((activeIndex: number) => {
    setIndex(activeIndex)
    scrollXIndex.setValue(activeIndex)
  }, [])

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true
    }).start()
  }, [])

  const fetchPaymentParams = async () => {
    const products = JSON.parse(JSON.stringify(cartStore.products)).map(item => ProductModel.create({
      ...item
    }))

    const order = OrderModel.create({
      id: gerarIdPedido(),
      items: products
    })

    const total = products.reduce((acc: number, item: any) => {
      return acc += item.price + item.qtde
    }, 0)

    console.log("total", total);

    const res = await api.createPayment(user.customerId, total, authToken)

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
    const products = JSON.parse(JSON.stringify(cartStore.products)).map(item => ProductModel.create({
      ...item
    }))

    const total = (products.reduce((acc: number, item: any) => {
      return acc += item.price + item.qtde
    }, 0) * 0.05) + (cashBack ?? 0)

    const order = OrderModel.create({
      id: gerarIdPedido(),
      items: products
    })
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setProp("cashBack", total)
      ordersStoreModel.add(order)

      cartStore.purchaseClose()
      navigation.navigate("ConfirmPurchase", { cashBack: total })
    }
  };

  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Método de pagamento"} LeftActionComponent={<Icon onPress={() => navigation.goBack()} color={"#fff"} size={28} type="feather" name="arrow-left" />} />
      <Screen style={$root} preset="fixed">
        <View style={{ flexDirection: "row", gap: 10, marginTop: 25 }}>
          <Icon type="octicon" name="credit-card" />
          <Text weight="bold" text="Cartão de crédito" />
        </View>
        <View style={{ flexDirection: "row", width, position: "relative", gap: 6, height: 200, marginTop: 20, alignItems: "center" }}>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("AddCard")
          }}>
            <View style={{ height: 90, width: 40, borderRadius: 16, backgroundColor: "#F3F6F8", alignItems: "center", justifyContent: "center" }}>
              <Icon type="ant-design" name="plus" size={24} color={"black"} />
            </View>
          </TouchableWithoutFeedback>

          {listCardStoreModel.list.length ? (
            <FlatList
              data={listCardStoreModel?.list ?? []}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={false}
              contentContainerStyle={{
                width: width / .9,
                height: 200,
                justifyContent: "center",
                padding: 20
              }}
              CellRendererComponent={({ item, index, children, style, ...props }) => {
                const newStyle = [
                  style,
                  { zIndex: data.length - index }
                ]
                return (
                  <View style={newStyle} key={index} {...props}>
                    {children}
                  </View>
                )
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1]
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [35, 0, -100]
                })

                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [.788, 1, 1.3]
                })

                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / 3, 1, 0]
                })
                return (
                  <FlingGestureHandler
                    key="left"
                    direction={Directions.LEFT}
                    onHandlerStateChange={ev => {
                      if (ev.nativeEvent.state === State.END) {
                        if (i === data.length - 1) {
                          return
                        }
                        setActiveIndex(i + 1)
                      }
                    }}
                  >
                    <FlingGestureHandler
                      key="right"
                      direction={Directions.RIGHT}
                      onHandlerStateChange={ev => {
                        if (ev.nativeEvent.state === State.END) {
                          if (i === 0) {
                            return
                          }
                          setActiveIndex(i - 1)
                        }
                      }}
                    >
                      <Animated.View style={{
                        position: "absolute", left: -(240 / 2), opacity, transform: [
                          {
                            translateX
                          },
                          { scale }
                        ]
                      }}>

                        <View style={{ backgroundColor: "black", width: 240, height: 135, borderRadius: 24, padding: 24 }}>
                          <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                              <Text style={{ color: "#fff", fontSize: 14 }} weight="bold" text={`**** ${item.number.substring(12, 16)}`} />
                              <Text style={{ color: "#fff", fontSize: 14 }} weight="bold" text={item.val} />
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                              <Text style={{ color: "#fff", fontSize: 14 }} text={item.titular} />
                              <IgniteIcon icon="master" />
                            </View>
                          </View>
                        </View>
                      </Animated.View>
                    </FlingGestureHandler>
                  </FlingGestureHandler>
                )
              }}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center" }} text="Adicione um novo método" />
            </View>
          )

          }

        </View>
        <View style={{ height: height / 2, justifyContent: "flex-end" }}>
          <TouchableWithoutFeedback onPress={fetchPaymentParams}>
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
  flex: 1,
  paddingHorizontal: spacing.lg,
  backgroundColor: "#fff"
}
