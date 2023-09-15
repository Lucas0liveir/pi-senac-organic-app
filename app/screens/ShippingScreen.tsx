import React, { FC, Fragment, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, StyleSheet, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { Header, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Divider, Icon, Input } from "@rneui/themed"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import GooglePlacesInput from "app/components/GooglePlacesInput"
import { useStores } from "app/models"
import { MyInputAutoComplete } from "app/components/InputAutoComplete"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"


export const ShippingScreen: FC<any> = observer(function ShippingScreen() {
  const { listAddressStoreModel } = useStores()
  const [selectedLocation, setSelectedLocation] = useState(listAddressStoreModel?.list[0]?.location)
  // Pull in one of our MST stores

  useEffect(() => {
    setSelectedLocation(listAddressStoreModel?.list[0]?.location)
  }, [listAddressStoreModel.list])

  const { height, width } = Dimensions.get("window")
  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  return (
    <>
      <Header
        titleStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        style={{ paddingLeft: spacing.md, backgroundColor: colors.palette.green100 }}
        title={"Entrega"} LeftActionComponent={<Icon onPress={() => navigation.goBack()} color={"#fff"} size={28} type="feather" name="arrow-left" />} />

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{

            ...StyleSheet.absoluteFillObject,
            height: height / 1.8,
            width: "100%"
          }}
          region={
            {
              latitude: selectedLocation?.lat ?? 37.78825,
              longitude: selectedLocation?.lng ?? -122.4324,
              latitudeDelta: 0.0212,
              longitudeDelta: 0.0010,
            }
          }
          initialRegion={{
            latitude: selectedLocation?.lat ?? 37.78825,
            longitude: selectedLocation?.lng ?? -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: selectedLocation?.lat ?? 37.78825,
              longitude: selectedLocation?.lng ?? -122.4324,
            }}
          />
        </MapView>
      </View>
      <View style={{
        position: "relative",
        top: height / 3,
        backgroundColor: "#fff",
        height: height / 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>

        <View style={{ height: 4, width: 50, borderRadius: 15, backgroundColor: "#F3F6F8", alignSelf: "center", marginVertical: 10 }} />

        <MyInputAutoComplete />


        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <Divider />
          <View style={{ marginVertical: 15 }}>
            <Text weight="bold" text="Meus endereços" />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: height / 3.5, width: width / 1.1 }}>
            {listAddressStoreModel.list.map((item, index) => {
              return (
                <Fragment key={index} >
                  <TouchableWithoutFeedback onPress={() => setSelectedLocation(item?.location)} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: width / 1.3, alignItems: "center" }}>
                      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                        <Icon type="font-awesome" color={"#000"} name="map-pin" />
                        <View style={{ width: "100%" }}>
                          <Text numberOfLines={1} style={{ overflow: "hidden", width: "80%", fontSize: 12 }}>{item?.country ?? "Luís Eduardo Magalhães"}</Text>
                          <Text numberOfLines={1} weight="bold" style={{ overflow: "hidden", width: "80%" }}>{item?.description}</Text>
                        </View>
                      </View>
                      <Icon type="ant-design" style={{ opacity: selectedLocation === item.location ? 1 : 0.5 }} color={selectedLocation === item.location ? colors.palette.green100 : "grey"} name="checkcircleo" />
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{ paddingVertical: 10, }}>
                    <Divider />
                  </View>
                </Fragment>
              )
            })}
          </ScrollView>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Payment")}>
            <View style={$tapButton}>
              <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                <Text style={{ color: "#fff" }} text="Ir para o pagamento" />
              </View>


              <View style={{ alignSelf: "flex-end", paddingRight: 10 }}>
                <Icon type="feather" name="arrow-right" color={"#fff"} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

    </>

  )
})


const $tapButton: ViewStyle = {
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: colors.palette.green100,
  paddingVertical: 10,
  marginTop: spacing.xs,
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent"
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {

  },
});