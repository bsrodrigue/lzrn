import { Card } from '@rneui/base';
import { View, Text } from 'react-native'
import { CardBottomSheet } from '../CardBottomSheet';
import { ExpandingView } from '../ExpandingView';
import { RadioInputGroup } from '../RadioInputGroup';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import SpecialButton from './SpecialButton';
import Input from '../Input/Input';
import { WrapView } from '../WrapView';
import useCall from '../../api/useCall';
import { useSession } from '../../providers';
import { getCurrentUserProfile } from '../../api/profile';
import { ActivityIndicator } from 'react-native-paper';
import { CenteringView } from '../CenteringView';

export default function ProfileBalanceTab() {
  const [depositSheetIsVisible, setDepositSheetIsVisible] = useState(false);
  const [value, setValue] = useState("0");
  const { session: { token } } = useSession();
  const { data: profile, call, isLoading } = useCall(getCurrentUserProfile);


  useEffect(() => {
    call({ token });
  }, [token]);

  if (isLoading) return (
    <CenteringView>
      <ActivityIndicator />
    </CenteringView>
  );

  return (
    <>
      <View style={{
        paddingHorizontal: 10,
      }}>
        <Card containerStyle={{ borderRadius: 15, alignItems: "center" }}>
          <Text style={{ fontSize: 45 }}>
            <Text style={{ fontWeight: "bold" }}>{profile?.balance ?? "INDISPONIBLE"}</Text>
            .FCFA
          </Text>
        </Card>

        <View style={{ flexDirection: "row", gap: 10, paddingVertical: 20, paddingHorizontal: 70 }}>
          <View style={{ flexGrow: 1, alignItems: "center" }}>
            <SpecialButton onPress={() => setDepositSheetIsVisible(true)}>
              +
            </SpecialButton>
            <Text>DEPOT</Text>
          </View>
        </View>
      </View>
      <WrapView>
        <Button onPress={() => call({ token })}>Rafraichir</Button>
      </WrapView>
      <CardBottomSheet
        isVisible={depositSheetIsVisible} onBackdropPress={() => setDepositSheetIsVisible(false)}>
        <ExpandingView style={{
          paddingHorizontal: 10,
          paddingVertical: 5
        }}>
          <Input value={value} onChangeText={(text) => setValue(text)} label="Montant" inputMode="numeric" />
          <RadioInputGroup
            label="Option de paiement" name="payment-method" options={[
              { label: "Orange Money", value: "om", },
              { label: "Moov Money", value: "mm", },
              { label: "Coris Money", value: "cm", },
            ]}>
          </RadioInputGroup>
          <Button disabled={(value === "0" || value === "")} onPress={() => { }}>Confirmer</Button>
        </ExpandingView>
      </CardBottomSheet>
    </>


  );
}
