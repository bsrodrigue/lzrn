import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "../../types";
import { useArticles } from "../../hooks/api/articles";
import { Article } from "../../types/models";
import pmubLogo from "../../assets/logo/pmub-logo.png";
import { mom } from "../../lib/moment";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface BlogArticleProps {
  article: Article;
}

function VerticalBlogArticle({ article }: BlogArticleProps) {
  return (
    <TouchableOpacity style={{
      flexGrow: 1,
      backgroundColor: "white",
      padding: 3
    }}>
      <Text style={{
        fontWeight: "bold",
        fontSize: 10,
        opacity: 0.5
      }}>{mom(article.attributes.updatedAt).fromNow()}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 12 }}>{article.attributes.title}</Text>
    </TouchableOpacity>
  );
}

function HorizontalBlogArticle({ article }: BlogArticleProps) {
  return (
    <TouchableOpacity style={{
      flexGrow: 1,
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 5,
      height: 100,
      marginBottom: 5
    }}>
      <View style={{ flexGrow: 1 }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 10,
          opacity: 0.5
        }}>{mom(article.attributes.updatedAt).fromNow()}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{article.attributes.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { green, primary } } } = useTheme();

  const { articles } = useArticles();

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: green,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center"
      }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textTransform: "uppercase" }}>Prognostics</Text>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView style={{ flex: 0.7, gap: 10 }}>
          {
            articles.map((article) => (
              <HorizontalBlogArticle key={article.id} article={article} />
            ))
          }
        </ScrollView>
      </View>
    </View >
  )
}
