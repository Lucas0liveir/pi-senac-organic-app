import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { Divider, Input } from '@rneui/themed';
import { Text } from './Text';
import { useStores } from 'app/models';
import { AddressModel, CoordModel } from 'app/models/Address';

export function MyInputAutoComplete() {
    const { listAddressStoreModel } = useStores()
    const [query, setQuery] = useState("")
    const [places, setPlaces] = useState([])

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            searchLocation(query)
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [query]);

    const searchGeolocationAndSetLocationOnMobx = async (item: any) => {

        try {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-TjLb0S4VDOXFQtAcEXl08ipVAihUq7s&place_id=${item.place_id}`)
            if (data?.result?.geometry?.location) {
                const dLocation = data?.result?.geometry?.location
                const exists = listAddressStoreModel.list.find(i => i.description === item.description)
                if (!exists) {
                    const location = CoordModel.create({
                        lat: dLocation.lat,
                        lng: dLocation.lng
                    })
                    const address = AddressModel.create({
                        description: item.description,
                        country: String(item?.structured_formatting?.secondary_text),
                        location
                    })
                    listAddressStoreModel.add(address)
                }
                setQuery("")
            }
            console.log(data?.result?.geometry?.location);

        } catch (e) {
            console.error(e);

        }
    }

    const searchLocation = async (text: string) => {

        axios
            .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyA-TjLb0S4VDOXFQtAcEXl08ipVAihUq7s&language=pt-BR&input=${text}`)
            .then((response) => {
                console.log(response.data);
                setPlaces(response.data?.predictions)

            })
            .catch((e) => {
                console.log(e.response);
            });
    };


    return (
        <SafeAreaView style={[styles.container, { position: "relative", zIndex: 99999 }]}>
            <Input
                placeholder='Buscar endereço'
                value={query}
                onChangeText={texto => setQuery(texto)}
                containerStyle={{ padding: 0, margin: 0, height: 55 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={styles.searchBox}
            />
            <FlatList
                data={places}
                style={{ zIndex: 9999999, position: "absolute", backgroundColor: "#fff", top: 50, width: "100%", paddingHorizontal: 12 }}
                contentContainerStyle={{ zIndex: 99999, backgroundColor: "#fff", width: "100%" }}
                keyExtractor={(_, index) => String(index)}
                //@ts-ignore
                ItemSeparatorComponent={<Divider />}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback style={{ zIndex: 99999 }} onPress={() => searchGeolocationAndSetLocationOnMobx(item)}>
                            <Text style={{ color: "#000", paddingVertical: 10 }} text={item?.description} />
                        </TouchableWithoutFeedback>
                    )
                }
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        width: 340,
        height: 50,
        fontSize: 18,
        borderBottomWidth: 0,
        borderRadius: 8,
        borderColor: '#F3F6F8',
        color: '#000',
        backgroundColor: '#F3F6F8',
        borderWidth: 1.5,
        paddingLeft: 15,
    },
    container: {
        backgroundColor: "#fff",
        alignItems: 'center',
    },
});