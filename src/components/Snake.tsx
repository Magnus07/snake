import { View, Text } from "react-native";
import React from "react";
import { Coordinate } from "../types/types";

interface Props {
  snake: Coordinate[];
}

const Snake = ({ snake }: Props): JSX.Element => {
  return (
    <View>
      <Text>Snake</Text>
    </View>
  );
};

export default Snake;
