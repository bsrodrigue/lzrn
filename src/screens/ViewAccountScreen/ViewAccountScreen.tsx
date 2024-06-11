import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import useCall from "../../api/useCall";
import { getCurrentUserProfile } from "../../api/profile";
import { useSession } from "../../providers";
import { BetListView, CardBottomSheet, ExpandingView, ProfileBalanceTab } from "../../components";
import { Avatar } from "@rneui/base";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { UserAttributes } from "../../types/models";
import { GetAllBetsResult, GetAllBetsResultItem, getAllBets } from "../../api/bets";
import { BetItemDetails } from "../BetListScreen/BetListScreen";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewAccount'>;

interface Tab {
  label: string;
  id: string;
}

const tabs: Tab[] = [
  {
    label: "Mes tickets",
    id: "tickets",
  },
  {
    label: "Solde",
    id: "balance",
  },
];

export default function ViewAccountScreen({ navigation }: AccountScreenProps) {
  const [currentTab, setCurrentTab] = useState('balance');
  const [currentBet, setCurrentBet] = useState<GetAllBetsResultItem>(null);
  const { session: { token } } = useSession();
  const [profile, setProfile] = useState<UserAttributes>(null);

  const checkIsCurrentTab = (tab: Tab) => tab.id === currentTab;

  const { call, isLoading } = useCall(getCurrentUserProfile, {
    onSuccess(result) {
      setProfile(result);
    },
  });

  const [bets, setBets] = useState<GetAllBetsResult>(null);

  const { call: callGetAllBets, isLoading: getAllBetsIsLoading } = useCall(getAllBets, {
    onSuccess(result) {
      setBets(result);
    },
  });

  useEffect(() => {
    if (token) {
      call({ token });
      callGetAllBets({ token });
    }
  }, [token]);

  if (isLoading) return (
    <ExpandingView style={{ backgroundColor: "white", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="green" />
    </ExpandingView>
  );

  if (profile === null) return (
    <ExpandingView style={{ backgroundColor: "white", justifyContent: "center" }}>
      <Text style={{ color: "red" }}>
        Une erreur s'est produite en chargeant vos données...
      </Text>
    </ExpandingView>
  );

  if (profile.agentCode) return (
    <ExpandingView style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <Text>
        `Code Agent: ${profile.agentCode}`
      </Text>
    </ExpandingView>
  )

  return (
    <ExpandingView style={{
      backgroundColor: "white",
      paddingVertical: 30
    }}>
      <View style={{
        alignItems: "center",
        gap: 10
      }}>
        <Avatar size={60} rounded icon={{ name: "user", type: "font-awesome" }} containerStyle={{ backgroundColor: "green" }} />
        <Text style={{
          fontWeight: "bold",
          fontSize: 20
        }}>{profile.username ?? "no_username"}</Text>
      </View>

      <View style={{
        flexDirection: "row",
        gap: 1,
        marginVertical: 20
      }}>
        {
          tabs.map((tab, index) => (
            <TouchableOpacity
              onPress={() => setCurrentTab(tab.id)}
              key={index} style={{
                backgroundColor: checkIsCurrentTab(tab) ? "orange" : "green",
                padding: 10,
                flexGrow: 1,
                alignItems: "center",
              }}>
              <Text style={{ color: "white" }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>

      {
        currentTab === 'tickets' && (
          <BetListView bets={bets} isLoading={getAllBetsIsLoading} onBetPress={setCurrentBet} />
        )
      }

      {
        currentTab === 'balance' && (
          <ProfileBalanceTab />
        )
      }

      <CardBottomSheet isVisible={(currentBet !== null)} onBackdropPress={() => setCurrentBet(null)}>
        {
          (currentBet !== null) && (
            <BetItemDetails {...currentBet} />
          )
        }
      </CardBottomSheet>

    </ExpandingView>
  )
}

