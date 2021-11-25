import React from 'react'
import { View, Text } from 'react-native'

interface Props {
    title: string;
    info: string;
}
export default function TextRich({ title, info }: Props) {
    return (
        <Text style={{ fontSize: 16, marginTop: 12, fontWeight: "bold" }}>
        {title}:{" "}
          <Text style={{ fontWeight: "300" }}>{info}</Text>
        </Text>
    )
}
