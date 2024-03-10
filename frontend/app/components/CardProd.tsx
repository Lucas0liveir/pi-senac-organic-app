import { ReactNode } from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "@rneui/themed";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { colors } from "app/theme";

interface ProductProps {
    price: string;
    desc: string;
    uri: string;
    rawPrice?: number;
    onPress: () => void;
}

export function CardProd({ desc, price, rawPrice, uri, onPress }: ProductProps) {
    const { width } = Dimensions.get("screen")

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Card containerStyle={{ borderRadius: 25, minWidth: width / 2.7, justifyContent: "center", alignItems: "center", backgroundColor: "#F3F6F8" }}>
                <View
                    style={{
                        borderRadius: 15,
                        padding: 3,
                        backgroundColor: "rgba(124, 205, 124, .3)"
                    }}
                >
                    <Text
                        weight="bold"
                        style={{
                            fontSize: 10,
                            color: colors.palette.green100
                        }}>
                        R$ {(rawPrice * 0.05).toFixed(2)} de Cashback
                    </Text>
                </View>
                <AutoImage
                    style={{ width: width / 4, resizeMode: "contain", height: 120, alignSelf: "center" }}
                    source={{ uri }}
                />

                <Text style={{ fontWeight: "bold", textAlign: "center" }} text={desc} />

                <Text style={{ textAlign: "center" }} text={price} />
            </Card>
        </TouchableWithoutFeedback>
    )
}