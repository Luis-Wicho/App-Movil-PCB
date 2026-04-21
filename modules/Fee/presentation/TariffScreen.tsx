import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getTariffs } from "../application/getTariffs";
import { TariffApi } from "../intraestructure/TariffApi";

export default function TariffScreen() {
  const [tariffs, setTariffs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const repo = new TariffApi();
      const data = await getTariffs(repo);
      setTariffs(data);
    };

    load();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Lista de Tarifas
      </Text>

      <FlatList
        data={tariffs}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}