import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import { User } from "./User";
import { fetchUsers } from "../appication/getUsers";
import UserCard from "./UserCard";

export default function UserListScreen() {
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setData(res);
  };

  const filtered = data.filter(
    (item) =>
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Buscar usuario..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard item={item} />}
        ListEmptyComponent={<Text>No hay usuarios</Text>}
      />
    </View>
  );
}