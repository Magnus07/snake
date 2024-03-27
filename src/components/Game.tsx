import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Direction, GestureEventType } from "../types/types";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = [{ x: 5, y: 20 }];
const GAME_BOUNDS = [{ xMin: 0, xMax: 35, yMin: 0, yMax: 63 }];
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);

  const handleGestureEvent = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Left);
      } else {
        setDirection(Direction.Right);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <SafeAreaView style={styles.container}></SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Game;
