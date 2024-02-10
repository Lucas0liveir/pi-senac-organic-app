import { Icon } from "@rneui/themed";
import { ProductModel } from "app/models/CartStore";
import { View } from "react-native";
import { Text } from "./Text";
import { useStores } from "app/models";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

interface Props {
    increment: () => void;
    decrement: () => void;
    qtde: number;
    id: number;
}

export const IncDecProduct = observer(function IncDecProduct({ decrement, increment, qtde, id }: Props) {
    const { cartStore } = useStores()

    const product = useMemo(() => {
        return cartStore.products.find(i => i.id === id)
    }, [cartStore])

    function handleIncrement() {
        product?.increment()
    }

    function handleDecrement() {
        if (product?.qtde > 1) {
            product?.decrement()
        } else {
            cartStore.removeToCart(id)
        }

    }
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Icon onPress={handleDecrement} type="ant-design" name="minus" size={18} />
            <View
                style={{
                    marginHorizontal: 5,
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff"
                }}
            >
                <Text text={String(product?.qtde)} />

            </View>
            <Icon onPress={handleIncrement} type="ant-design" name="plus" size={18} />
        </View>
    )
})