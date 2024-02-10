import { useStores } from 'app/models';
import { AddressModel, CoordModel } from 'app/models/Address';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = () => {
  const { listAddressStoreModel } = useStores()
  return (
    <GooglePlacesAutocomplete
      placeholder='Digite seu endereço'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const exists = listAddressStoreModel.list.find(i => i.description === data.description)
        if (!exists) {
          const location = CoordModel.create({
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng
          })
          const address = AddressModel.create({
            description: data.description,
            location
          })
          listAddressStoreModel.add(address)
        }

        console.log(data, details.geometry.location);
      }}
      styles={{
        
        textInputContainer: {
          backgroundColor: '#fff',
       
          marginTop: 25
        },
        textInput: {
          height: 38,
          backgroundColor: '#F3F6F8',
          borderRadius: 10,
          color: '#5d5d5d',
          fontSize: 16,
        },
        container: {
          paddingHorizontal: 30,
          flex: 0.5
        }
      }}
      fetchDetails={true}
      query={{
        key: 'AIzaSyA-TjLb0S4VDOXFQtAcEXl08ipVAihUq7s',
        language: 'pt',
      }}
    />
  );
};

export default GooglePlacesInput;