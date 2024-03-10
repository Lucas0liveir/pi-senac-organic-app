import { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import { Card } from "@rneui/themed";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { IncDecProduct } from "./IncDecProduct";
import { ProductStoreModel } from "app/models/CartStore";

interface ProductProps {
    product: ProductStoreModel
}

export function CardProdSubs({ product: { desc, price, uri, decrement, increment, qtde, id } }: ProductProps) {
    const { width } = Dimensions.get("screen")

    return (
        <View style={{ flex: 1 }}>
            <Card wrapperStyle={{ alignItems: "center" }} containerStyle={{ flexDirection: "row", borderRadius: 25, justifyContent: "center", alignItems: "center", backgroundColor: "#F3F6F8", width: width * 0.25 }}>
                <AutoImage
                    style={{ resizeMode: "contain", height: 80 }}
                    source={{ uri }}
                />
            </Card>
            <View style={{ marginLeft: 5, alignSelf: "center" }}>
                <Text style={{ fontWeight: "bold", textAlign: "left" }} text={`${desc} ${qtde}x`} />
            </View>
        </View>
    )
}