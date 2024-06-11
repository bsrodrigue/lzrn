import { ReactNode } from 'react';
import { View } from 'react-native'

interface WrapViewProps {
  children?: ReactNode;
}

export default function WrapView({ children }: WrapViewProps) {

  return (
    <View style={{ paddingHorizontal: 30 }}>{children}</View>
  );
}
