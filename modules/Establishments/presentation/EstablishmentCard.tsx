import React from "react";
import { View, Text } from "react-native";
import { Establishment } from "./Establishment";

interface Props {
  item: Establishment;
}

export default function EstablishmentCard({ item }: Props) {
  const getStatusColor = () => {
    switch (item.status) {
      case "liberado":
        return "green";
      case "pendiente":
        return "orange";
      case "inactivo":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <View style={{ padding: 12, borderWidth: 1, marginBottom: 10, borderRadius: 8 }}>
      <Text>📄 Expediente: {item.expediente}</Text>
      <Text>🏢 Nombre: {item.name}</Text>
      <Text>👤 Propietario: {item.owner}</Text>
      <Text style={{ color: getStatusColor() }}>
        ● Estatus: {item.status}
      </Text>
      <Text>🏷️ Giro: {item.giro}</Text>
      <Text>📏 Tamaño: {item.size}</Text>
    </View>
  );
}