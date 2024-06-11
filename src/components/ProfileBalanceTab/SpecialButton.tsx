import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

interface SpecialButtonProps {
  children?: ReactNode;
  onPress?: () => void;
}

export default function SpecialButton({ onPress, children }: SpecialButtonProps) {
  const { theme: { colors: { blue } } } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: blue,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        width: "100%"
      }}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 40
        }}>
        {children}
      </Text>
    </TouchableOpacity>

  );
}

