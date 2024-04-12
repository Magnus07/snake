import { View, Text, StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";

interface Props {
  snake: Coordinate[];
}

const Snake = ({ snake }: Props): JSX.Element => {
  return (
    <Fragment>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[segmentStyle, styles.snake]} />;
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
});

export default Snake;
