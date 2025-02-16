import { FC } from "react";
import { View, TextInput, TouchableOpacity, TextStyle, ViewStyle, Image, ImageStyle, TextComponent } from "react-native";
import { Screen, Text } from "../components";
import { AppStackScreenProps } from "../navigators";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
const BackIcon = require("../../assets/icons/aarambha/back-icon.png");
const AarambhaLogo = require("../../assets/icons/aarambha/aarambha-logo.png");
import { LinearGradient } from "expo-linear-gradient";

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const NewLoginScreen: FC<LoginScreenProps> = function LoginScreen() {
  const { themed } = useAppTheme();

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)} safeAreaEdges={["top", "bottom"]}>
      {/* Top Section: Back Button & Logo */}
      <View style={themed($headerContainer)}>
        <TouchableOpacity>
          <Image source={BackIcon} style={themed($backIcon)} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={AarambhaLogo} style={themed($logo)} resizeMode="contain" />
      </View>

      <View style={themed($logintextContainer)}>
        <Text preset="heading" style={themed($heading)}>Login</Text>
        <Text style={themed($subText)}>
          Please enter your phone number and four digit pin to login
        </Text>
      </View>

      <View style={themed($inputContainer)}>
        <Text style={themed($inputLabel)}>Phone Number</Text>
        <View style={themed($inputFieldContainer)}>
          <Text style={themed($flagText)}>🇮🇳</Text>
          <Text style={themed($flagText)}>(+91)</Text>
          <TextInput
            style={themed($inputField)}
            placeholder="91234-24566"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="phone-pad"
          />
        </View>
      </View>


      <View style={themed($inputContainer)}>
        <Text style={themed($inputLabel)}>Login PIN (Four Digit)</Text>
        <TextInput
          style={themed($inputField)}
          placeholder="X-X-X-X"
          placeholderTextColor="rgba(255,255,255,0.6)"
          secureTextEntry
          keyboardType="number-pad"
        />
      </View>



      {/* Alternative Login */}
      <TouchableOpacity>
        <Text style={themed($linkText)}>Login with email instead</Text>
      </TouchableOpacity>

      <View style={themed($bottomContainer)}>
        {/* Continue Button with Linear Gradient */}
        <LinearGradient
          colors={["#FFEE59", "#FFFFFF"]}
          style={themed($button)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={themed($buttonTouchable)}>
            <Text style={themed($buttonText)}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Forgot PIN */}
        <TouchableOpacity>
          <Text style={themed($forgotText)}>Forgot Pin</Text>
        </TouchableOpacity>
      </View>

    </Screen>
  );
};

/* Styles */
const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
  alignItems: "center",
});

/* Header: Back Icon & Logo */
const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginBottom: spacing.lg,
  paddingHorizontal: spacing.lg,
});

const $backIcon: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 24,
  height: 24,
  marginRight: "auto", // Pushes the logo to center
});

const $logo: ThemedStyle<ImageStyle> = () => ({
  width: 50,
  height: 50,
  alignSelf: "center",
  marginLeft: 120
});

/* Heading & Text */
const $logintextContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",  // Center text horizontally
  justifyContent: "center",
  width: 297,  // Match the width from your reference  // Moves the section down
  marginBottom: 15,
  marginHorizontal: "auto", // Centers it properly
});

const $heading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: "white",
  fontSize: 42,
  fontWeight: "bold",
  fontFamily: "spaceGroteskRegular",
  textAlign: "center", // Ensures it's centered
});

const $subText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "white",
  fontSize: 16,
  textAlign: "center",
  fontFamily: "spaceGroteskRegular",
  marginTop: spacing.xs, // Adds small gap
  width: 297, // Keeps text within bounds
});

/* Inputs */
const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  marginBottom: spacing.md,
  backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
  borderRadius: spacing.md, // Rounded corners
  padding: spacing.xs,
});

/* Label inside the container */
const $inputLabel: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "white",
  fontSize: 14,
  marginBottom: spacing.xs, // Space between label and input
});

/* Input wrapper inside the container */
const $inputFieldContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1, // Optional, for better separation
  borderBottomColor: "rgba(255, 255, 255, 0.5)",
  paddingBottom: 5, // Space below input field
});

/* Input Field */
const $inputField: ThemedStyle<TextStyle> = () => ({
  flex: 1,
  color: "white",
  fontSize: 16,
  marginLeft: 10, // Space after flag
});

/* Country Code & Flag */
const $flagText: ThemedStyle<TextStyle> = () => ({
  fontSize: 16,
  marginRight: 5,

});


/* Buttons */
const $linkText: ThemedStyle<TextStyle> = () => ({
  color: "#FFEE59",
  fontSize: 16,
  fontWeight: "bold",
  marginVertical: 10,
});
const $bottomContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: 30, // Adjust as needed for spacing
  marginTop: 220
});

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.xl,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.xl,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const $buttonTouchable: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  alignItems: "center",
  paddingVertical: 10,
});



const $buttonText: ThemedStyle<TextStyle> = () => ({
  color: "#000",
  fontSize: 18,
  fontWeight: "bold",
});

const $forgotText: ThemedStyle<TextStyle> = () => ({
  color: "#FFEE59",
  fontSize: 14,
  fontWeight: "bold",
  marginTop: 10,
});
