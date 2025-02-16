import { useScrollToTop } from "@react-navigation/native";
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar";
import { ReactNode, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { $styles } from "../theme";
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";
import { useAppTheme } from "@/utils/useAppTheme";

export const DEFAULT_BOTTOM_OFFSET = 50;

interface BaseScreenProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  safeAreaEdges?: ExtendedEdge[];
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  keyboardOffset?: number;
  keyboardBottomOffset?: number;
  StatusBarProps?: StatusBarProps;
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed";
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll";
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
  ScrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto";
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps;

const isIos = Platform.OS === "ios";

type ScreenPreset = "fixed" | "scroll" | "auto";

function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === "fixed";
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerStyle, children, preset } = props;
  return (
    <LinearGradient colors={["#6E38BF", "#9239AE", "#863FAF"]} style={[$outerStyle, style]}>
      <View style={[$innerStyle, preset === "fixed" && $justifyFlexEnd, contentContainerStyle]}>
        {children}
      </View>
    </LinearGradient>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  useScrollToTop(ref);

  return (
    <LinearGradient colors={["#6E38BF", "#9239AE", "#863FAF"]} style={[$outerStyle, style]}>
      <ScrollView
        ref={ref}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        style={[$outerStyle, ScrollViewProps?.style]}
        contentContainerStyle={[$innerStyle, ScrollViewProps?.contentContainerStyle, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
}

export function Screen(props: ScreenProps) {
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme();
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <LinearGradient colors={["#6E38BF", "#9239AE", "#863FAF"]} style={[$containerStyle, $containerInsets]}>
      <StatusBar
        style={statusBarStyle || (themeContext === "dark" ? "light" : "dark")}
        {...StatusBarProps}
      />

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$styles.flex1, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
};

const $justifyFlexEnd: ViewStyle = {
  justifyContent: "flex-end",
};

const $innerStyle: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "stretch",
};
