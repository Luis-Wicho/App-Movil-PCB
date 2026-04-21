import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { Establishment } from "./Establishment";
import EstablishmentCard from "./EstablishmentCard";


export default function EstablishmentListScreen() {
  const [search, setSearch] = useState("");

  // 🔹 Datos simulados 
  const [data] = useState<Establishment[]>([
    {
      id: 1,
      expediente: "EXP001",
      name: "Tienda López",
      owner: "Juan López",
      status: "liberado",
      giro: "Comercio",
      size: "chico",
    },
    {
      id: 2,
      expediente: "EXP002",
      name: "Farmacia Vida",
      owner: "Ana Pérez",
      status: "pendiente",
      giro: "Salud",
      size: "mediano",
    },
  ]);

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.expediente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* 🔍 Buscador */}
      <TextInput
        placeholder="Buscar por expediente o nombre"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      {/* 📋 Lista */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EstablishmentCard item={item} />}
        ListEmptyComponent={<Text>No se encontraron resultados</Text>}
      />
    </View>
  );
}