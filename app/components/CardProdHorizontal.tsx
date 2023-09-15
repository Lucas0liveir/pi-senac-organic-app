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

export function CardProdHorizontal({ product: { desc, price, uri, decrement, increment, qtde, id } }: ProductProps) {
    const { width } = Dimensions.get("screen")

    return (
        <Card wrapperStyle={{ flexDirection: "row", alignItems: "center" }} containerStyle={{ flexDirection: "row", borderRadius: 25, minWidth: width / 2, justifyContent: "space-between", alignItems: "center", backgroundColor: "#F3F6F8" }}>
            <AutoImage
                style={{ width: width / 4, resizeMode: "contain", height: 120 }}
                source={{ uri }}
            />

            <View style={{ marginLeft: 5 }}>
                <Text style={{ fontWeight: "bold", textAlign: "left" }} text={desc} />

                <Text style={{ textAlign: "left" }} text={Number(price).toLocaleString("pt-br", { currency: "BRL", style: "currency" })} />

                <IncDecProduct id={id} decrement={decrement} increment={increment} qtde={qtde} />
            </View>
        </Card>
    )
}