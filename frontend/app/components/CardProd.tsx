import { ReactNode } from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import { Card } from "@rneui/themed";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";

interface ProductProps {
    price: string;
    desc: string;
    uri: string;
    onPress: () => void;
}

export function CardProd({ desc, price, uri, onPress }: ProductProps) {
    const { width } = Dimensions.get("screen")

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Card containerStyle={{ borderRadius: 25, minWidth: width / 2.7, justifyContent: "center", alignItems: "center", backgroundColor: "#F3F6F8" }}>
                <AutoImage
                    style={{ width: width / 4, resizeMode: "contain", height: 120 }}
                    source={{ uri }}
                />

                <Text style={{ fontWeight: "bold", textAlign: "center" }} text={desc} />

                <Text style={{ textAlign: "center" }} text={price} />
            </Card>
        </TouchableWithoutFeedback>
    )
}