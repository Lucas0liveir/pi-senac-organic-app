import { observer } from "mobx-react-lite"
import React, { FC, useRef, useState } from "react"
import { Input, Icon as ThemedIcon } from '@rneui/themed';
import { View, ViewStyle, Alert } from "react-native"
import { AutoImage, Button, Icon, Screen, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, Profile } from 'react-native-fbsdk-next'
import { UserStoreModel } from "app/models/users";
import { api } from "app/services/api";

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<any>()

  const navigation = useNavigation<any>()
  const [authPassword, setAuthPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    users,
    setUser,
    authenticationStore: { setAuthEmail, setNome, setAuthToken, setProp },
  } = useStores()

  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        console.log('User cancelled the login process')
      }

      const currentProfile = await Profile.getCurrentProfile().then(
        function (currentProfile) {
          if (currentProfile) {
            console.log("The current logged user is: " +
              currentProfile.name
              + ". His profile id is: " +
              currentProfile.userID
            );
            return currentProfile
          }
          return null
        }
      );

      if (currentProfile) {
        const userstored = users.find(u => u.email === "facebooklogin@email.com")
        if (userstored) {
          setAuthEmail("facebooklogin@email.com")
          setNome(currentProfile.name)
          setAuthToken(String(Date.now()))
        } else {
          const newuser = UserStoreModel.create({ cpf: null, email: "facebooklogin@email.com", nome: currentProfile.name, senha: null })
          setUser(newuser)

          setAuthEmail("facebooklogin@email.com")
          setNome(currentProfile.name)
          setAuthToken(String(Date.now()))
        }
      }

    } catch (err) {
      console.log(err)
    }
  }

  const googleLogin = async () => {
    try {
      const { user } = await GoogleSignin.signIn()

      const userstored = users.find(u => u.email === user.email)
      if (userstored) {
        setAuthEmail(user.email)
        setNome(user.name)
        setAuthToken(String(Date.now()))
      } else {
        const newuser = UserStoreModel.create({ cpf: null, email: user.email, nome: user.name, senha: null })
        setUser(newuser)

        setAuthEmail(user.email)
        setNome(user.name)
        setAuthToken(String(Date.now()))
      }

    } catch (err) {
      console.log(err)

    }
  }

  async function login() {

    const res = await api.login(email, authPassword)
    if (res.kind === "ok") {
      const { token, user } = res
      setProp("authToken", token)
      setProp("user", user)
    }
  }

  return (
    <Screen
      preset="auto"
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <AutoImage
        style={{ width: 250, height: 250, alignSelf: "center" }}
        source={require("../../ignite/templates/app-icon/android-legacy.png")}
      />
      <Input
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
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
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
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

      <Button
        text="Login"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />

      <Button
        text="Registrar"
        style={$tapButton}
        preset="reversed"
        onPress={() => navigation.navigate("Register")}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <View style={$separator} />
        <Text style={{ color: colors.separator }} text="OU" />
        <View style={$separator} />
      </View>

      <Button
        LeftAccessory={() => <Icon icon="google" style={{ marginRight: 20 }} size={32} />}
        textStyle={{ textAlign: "justify" }}
        text="Entrar com Google"
        style={$tapButton}
        preset="reversed"
        onPress={googleLogin}
      />

      <Button
        LeftAccessory={() => <Icon icon="facebook" style={{ marginRight: 15 }} size={32} />}
        textStyle={{ textAlign: "justify" }}
        text="Entrar com Facebook"
        style={$tapButton}
        preset="reversed"
        onPress={facebookLogin}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $separator: ViewStyle = {
  height: 1,
  width: "44%",
  backgroundColor: colors.separator,
}


const $tapButton: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.green100,
  marginTop: spacing.xs,
}

// @demo remove-file
