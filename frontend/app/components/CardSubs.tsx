import { ReactNode } from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "@rneui/themed";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { colors } from "app/theme";
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native";

export function CardSubs() {
    const { width } = Dimensions.get("screen")
    const navigation = useNavigation<any>()
    return (
        <TouchableWithoutFeedback onPress={() => { navigation.navigate("Subs") }}>
            <Card wrapperStyle={{ flexDirection: "row", justifyContent: "space-between", }} containerStyle={{ borderRadius: 25, backgroundColor: "#F3F6F8" }}>
                <View
                    style={{

                    }}
                >
                    <View>
                        <Text
                            weight="normal"
                        >
                            Assinatura
                        </Text>

                        <Text
                            weight="semiBold"
                        >
                            R$ 54,99
                        </Text>
                        <View
                            style={{
                                borderRadius: 6,
                                paddingVertical: 3,
                                paddingHorizontal: 5,
                                width: "75%",
                                marginTop: 5,
                                backgroundColor: "rgba(124, 205, 124, .3)"
                            }}
                        >
                            <Text
                                weight="bold"
                                style={{
                                    fontSize: 10,
                                    color: colors.palette.green100
                                }}>
                                Renovação automática
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <Entypo
                                name="calendar"
                            />
                            <Text
                                style={{
                                    fontSize: 10
                                }}
                            >
                                Receba sua cesta a cada 15 dias
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <FontAwesome5
                                size={10}
                                name="money-check"
                            />
                            <Text
                                style={{
                                    fontSize: 10
                                }}
                            >
                                Faturas mensais
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <MaterialIcons
                                name="cancel"
                            />
                            <Text
                                style={{
                                    fontSize: 10
                                }}
                            >
                                Cancele quando quiser
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: "flex-start"
                    }}
                >
                    <AutoImage
                        style={{ width: width / 4, resizeMode: "contain", height: 90, alignSelf: "center" }}
                        source={require("../../assets/images/subs.png")}
                    />
                </View>
            </Card>
        </TouchableWithoutFeedback>
    )
}