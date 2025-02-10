import { DEFAULT_BOTTOM_OFFSET } from "@/components";
import { forwardRef, ReactElement, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  SectionList,
  SectionListProps,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

type SectionType<ItemType> = {
  name: string;
  description: string;
  data: ItemType[];
};

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
  /* Optional function to pass a custom scroll component */
  renderScrollComponent?: (props: ScrollViewProps) => ReactNode;
  /* Optional additional offset between TextInput bottom edge and keyboard top edge */
  bottomOffset?: number;
  /* The sections to be rendered in the list */
  sections: SectionType<ItemType>[];
  /* Function to render the header for each section */
  renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode;
  /* Optional style for the content container */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /* Optional props for KeyboardAvoidingView */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
};

function SectionListWithKeyboardAwareScrollView<ItemType = any>(
  {
    renderScrollComponent,
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    KeyboardAvoidingViewProps,
    ...props
  }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
  ref: React.Ref<SectionList<ItemType>>,
): ReactElement {
  const isIos = Platform.OS === "ios";

  return (
    <KeyboardAvoidingView
      behavior={isIos ? "padding" : "height"}
      keyboardVerticalOffset={bottomOffset}
      {...KeyboardAvoidingViewProps}
      style={[{ flex: 1 }, KeyboardAvoidingViewProps?.style]}
    >
      <SectionList
        {...props}
        ref={ref}
        contentContainerStyle={contentContainerStyle}
        renderScrollComponent={renderScrollComponent}
      />
    </KeyboardAvoidingView>
  );
}

export default forwardRef(SectionListWithKeyboardAwareScrollView) as <ItemType = any>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>;
  },
) => ReactElement;