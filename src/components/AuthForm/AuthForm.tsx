import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },

  body: {
    flex: 1,
    marginVertical: 10,
  },
});

type AuthFormProps = {
  children?: ReactNode;
};

export default function AuthForm({ children }: AuthFormProps) {

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  )
}
