import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

interface ExpandingViewProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export default function ExpandingView({ children, style }: ExpandingViewProps) {
  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
    </View>
  );
}
