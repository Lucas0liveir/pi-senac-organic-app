import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Dimensions, Pressable, ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Input, Icon as ThemedIcon } from "@rneui/themed"
import { UserStoreModel } from "app/models/users"
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> { }

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const { users, setUser, authenticationStore: { setAuthEmail, setNome } } = useStores()
  const { width } = Dimensions.get("screen")
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<any>();
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [person, setPerson] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confSenha: ""
  })
  const [address, setAddres] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: ""
  })
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const handlePress = (targetIndex: number) => {
    setActiveIndex(targetIndex)
    scrollRef.current?.scrollTo({ x: ((100 / 100) * width) * targetIndex })
  }

  const onMomentumScrollEnd = (e: any) => {
    const { nativeEvent } = e;
    const index = Math.round(nativeEvent.contentOffset.x / ((100 / 100) * width));

    console.log(index);

    if (index !== activeIndex) setActiveIndex(index)
  }

  const goToNext = () => {

    if (!Object.values(person).every(v => v.length)) {
      Alert.alert("Atenção", "Preencha todos os campos")
      return
    }

    handlePress(1)
  }

  const concluir = () => {

    const { cpf, email, senha, nome, confSenha } = person
    const userExists = users.find(u => u.email === email)
    if (!Object.values(address).every(v => v.length)) {
      Alert.alert("Atenção", "Preencha todos os campos")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Atenção", "Preencha um email válido")
      return
    }

    if (senha !== confSenha) {
      Alert.alert("Atenção", "Senhas precisam ser iguais")
      return
    }

    if (userExists) {
      Alert.alert("Atenção", "Endereço de email já cadastrado")
      return
    }

    const user = UserStoreModel.create({ cpf, email, nome, senha })
    setUser(user)

    setNome(nome)
    setAuthEmail(email)
  }

  return (
    <Screen
      style={{ backgroundColor: "#fff" }}
      safeAreaEdges={["top", "bottom"]}
      preset="auto">
      <AutoImage
        style={{ width: 150, height: 150, alignSelf: "center" }}
        source={require("../../ignite/templates/app-icon/android-legacy.png")}
      />

      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 15 }}>
          <Pressable onPress={() => handlePress(0)} style={{ width: "40%" }}>
            <Text style={{ color: activeIndex === 0 ? colors.palette.green100 : colors.separator, fontWeight: "bold", textAlign: "center" }} text="Dados Pessoais" />
            <View style={{ height: 6, width: "100%", backgroundColor: activeIndex === 0 ? colors.palette.green100 : colors.separator, borderRadius: 8 }} />
          </Pressable>

          <Pressable style={{ width: "40%" }}>
            <Text style={{ color: activeIndex === 1 ? colors.palette.green100 : colors.separator, fontWeight: "bold", textAlign: "center" }} text="Endereço" />
            <View style={{ height: 6, width: "100%", backgroundColor: activeIndex === 1 ? colors.palette.green100 : colors.separator, borderRadius: 8 }} />
          </Pressable>
        </View>
        <ScrollView
          ref={scrollRef}
          pagingEnabled
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          <View style={{ width: (100 / 100) * width, flex: 1, paddingHorizontal: spacing.lg }}>
            <Input
              value={person.nome}
              maxLength={50}
              onChangeText={(v) => setPerson(prev => ({ ...prev, nome: v }))}
              placeholder="Nome"
              leftIcon={
                <ThemedIcon
                  name='person-outline'
                  type="material"
                  size={24}
                />
              }
            />
            <Input
              value={person.cpf}
              maxLength={50}
              onChangeText={(v) => setPerson(prev => ({ ...prev, cpf: v }))}
              placeholder="CPF"
              leftIcon={
                <ThemedIcon
                  name='idcard'
                  type="ant-design"
                  size={22}
                />
              }
            />
            <Input
              value={person.email}
              maxLength={99}
              onChangeText={(v) => setPerson(prev => ({ ...prev, email: v }))}
              placeholder="E-mail"
              leftIcon={
                <ThemedIcon
                  name='mail-outline'
                  type="material"
                  size={24}
                />
              }
            />
            <Input
              value={person.senha}
              onChangeText={(v) => setPerson(prev => ({ ...prev, senha: v }))}
              secureTextEntry={isAuthPasswordHidden}
              autoCorrect={false}
              placeholder="Senha"
              leftIcon={
                <ThemedIcon
                  name='lock-outline'
                  type="material"
                  size={24}
                />
              }
              rightIcon={<ThemedIcon
                name={isAuthPasswordHidden ? "visibility" : "visibility-off"}
                color={colors.palette.neutral800}
                size={20}
                onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
              />}
            />
            <Input
              value={person.confSenha}
              onChangeText={(v) => setPerson(prev => ({ ...prev, confSenha: v }))}
              secureTextEntry={isAuthPasswordHidden}
              autoCorrect={false}
              placeholder="Confirme sua senha"
              leftIcon={
                <ThemedIcon
                  name='lock-outline'
                  type="material"
                  size={24}
                />
              }
              rightIcon={<ThemedIcon
                name={isAuthPasswordHidden ? "visibility" : "visibility-off"}
                color={colors.palette.neutral800}
                size={20}
                onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
              />}
            />

            <Button
              text="Próximo"
              style={$tapButton}
              preset="reversed"
              onPress={() => {
                goToNext()
              }}
            />
          </View>

          <View style={{ width: (100 / 100) * width, flex: 1, paddingHorizontal: spacing.lg }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Input
                value={address.rua}
                onChangeText={(v) => setAddres(prev => ({ ...prev, rua: v }))}
                containerStyle={{ width: "65%" }}
                placeholder="Rua"
                leftIcon={
                  <ThemedIcon
                    name='home'
                    type="ant-design"
                    size={24}
                  />
                }
              />
              <Input
                value={address.numero}
                onChangeText={(v) => setAddres(prev => ({ ...prev, numero: v }))}
                containerStyle={{ width: "35%" }}
                placeholder="Nº"
              />
            </View>
            <Input
              value={address.bairro}
              onChangeText={(v) => setAddres(prev => ({ ...prev, bairro: v }))}
              placeholder="Bairro"
              leftIcon={
                <ThemedIcon
                  name='home-city-outline'
                  type="material-community"
                  size={22}
                />
              }
            />
            <Input
              value={address.cidade}
              onChangeText={(v) => setAddres(prev => ({ ...prev, cidade: v }))}
              placeholder="Cidade"
              leftIcon={
                <ThemedIcon
                  name='earth-outline'
                  type="ionicon"
                  size={22}
                />
              }
            />
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Input
                value={address.cep}
                onChangeText={(v) => setAddres(prev => ({ ...prev, cep: v }))}
                containerStyle={{ width: "65%" }}
                placeholder="CEP"
                leftIcon={
                  <ThemedIcon
                    name='earth-outline'
                    type="ionicon"
                    size={22}
                  />
                }
              />
              <Input
                value={address.estado}
                onChangeText={(v) => setAddres(prev => ({ ...prev, estado: v }))}
                containerStyle={{ width: "35%" }}
                placeholder="Estado"
              />
            </View>
            <Button
              text="Confirmar"
              style={$tapButton}
              preset="reversed"
              onPress={concluir}
            />

          </View>

        </ScrollView>

      </View>

    </Screen>
  )
})

const $tapButton: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.green100,
  marginTop: spacing.xs,
}