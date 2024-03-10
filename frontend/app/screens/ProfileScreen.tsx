import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { AutoImage, Text } from "app/components"
import { colors } from "app/theme"
import { Divider, Icon } from "@rneui/themed"
import { useStores } from "app/models"
import { Directions, FlatList, FlingGestureHandler, State } from "react-native-gesture-handler"
import AntDesign from "react-native-vector-icons/AntDesign"

export const ProfileScreen: FC<any> = observer(function ProfileScreen() {
  const { authenticationStore: { authEmail, nome, user, cashBack }, ordersStoreModel } = useStores()
  const { width } = Dimensions.get("window")
  const [i, setIndex] = useState(0)

  const scrollXIndex = useRef(new Animated.Value(0)).current

  const scrollXAnimated = useRef(new Animated.Value(0)).current
  const setActiveIndex = useCallback((activeIndex: number) => {
    setIndex(activeIndex)
    scrollXIndex.setValue(activeIndex)
  }, [])
  const data = [0, 0, 0, 0]
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true
    }).start()
  }, [])
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root} >
      <View style={{ height: "70%", backgroundColor: colors.palette.green100, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Icon type="font-awesome-5" name="user-circle" size={128} />
          <Text style={{ fontSize: 24, color: "#000", marginTop: 10 }} weight="bold" text={user.nome} />
          <Text style={{ fontSize: 12, color: "#000" }} weight="light" text={user.email} />
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4
          }}>
            <Text>
              Cashback
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2
              }}
            >

              <Text>
                {Number(cashBack ?? 0).toLocaleString("pt-br", { currency: "BRL", style: "currency" })}
              </Text>
              <AntDesign
                size={10}
                name="clockcircleo"
              />
            </View>
          </View>
        </View>

      </View>

      <FlatList
        data={ordersStoreModel?.list ?? []}
        keyExtractor={(_, index) => String(index)}
        horizontal
        inverted
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        style={{ zIndex: 9999999, position: "absolute", top: "50%" }}
        contentContainerStyle={{

          width: width,
          height: 350,
          justifyContent: "center",
          padding: 20
        }}
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle = [
            style,
            { zIndex: ordersStoreModel?.list?.length - index }
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
            outputRange: [.9, 1, 1.3]
          })

          const opacity = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [1 - 1 / 8, 1, 0]
          })
          return (
            <FlingGestureHandler
              key="left"
              direction={Directions.LEFT}
              onHandlerStateChange={ev => {
                if (ev.nativeEvent.state === State.END) {
                  if (i === ordersStoreModel?.list.length - 1) {
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
                  zIndex: 999999,
                  position: "absolute",
                  left: -(320 / 2),
                  opacity,
                  transform: [
                    {
                      translateX
                    },
                    { scale }
                  ]
                }}>
                  <View style={{ backgroundColor: "#fff", width: 320, height: 300, borderRadius: 24, padding: 24 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                      <Text numberOfLines={1} style={{ width: 120 }} text={`Pedido ${item.id}`} />
                      <Text text="Em progresso" />
                    </View>
                    <Divider style={{ margin: 5 }} />
                    <FlatList
                      data={item.items}
                      keyExtractor={(item, index) => String(item.id)}
                      contentContainerStyle={{ justifyContent: "center", gap: 10, alignItems: "center", marginTop: 10 }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          <View key={index}>
                            <View style={{ backgroundColor: "#F3F6F8", width: 80, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 16 }}>
                              <AutoImage
                                style={{ width: width / 6, resizeMode: "contain", height: 65 }}
                                source={{ uri: item.uri }}
                              />
                            </View>
                            <Text style={{ fontSize: 12, textAlign: "center" }} weight="bold" text={item.desc} />
                          </View>
                        )
                      }}
                    />
                    <Divider style={{ margin: 25 }} />


                    <View>
                      <Text style={{ fontSize: 18, textAlign: "center" }} weight="bold" text="Seu pedido está a caminho" />
                      <Text style={{ fontSize: 12, textAlign: "center" }} weight="light" text="Os pedidos chegarão em até 30 min" />
                    </View>

                  </View>

                </Animated.View>
              </FlingGestureHandler>
            </FlingGestureHandler>

          )
        }}
      />
      <View style={{ height: "20%", backgroundColor: "#fff" }}>

      </View>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  position: "relative",
  backgroundColor: "#fff"
}
