import React from "react";
import { View, Text } from "react-native";
import { User } from "./User";

interface Props {
  item: User;
}

export default function UserCard({ item }: Props) {
  return (
    <View style={{ padding: 12, borderWidth: 1, marginBottom: 10, borderRadius: 8 }}>
      <Text>👤 Usuario: {item.username}</Text>
      <Text>📛 Nombre: {item.fullName}</Text>
      <Text>📱 Teléfono: {item.phone}</Text>
    </View>
  );
}