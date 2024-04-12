import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 39, yMin: 0, yMax: 80 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [score, setScore] = useState(0);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // creating a copy

    // game over
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
    }

    if (checkEatsFood(snakeHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore((prev) => prev + 1);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isGamePaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [isGameOver, isGamePaused, snake]);

  const handleGestureEvent = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX < 0) {
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

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsGamePaused(false);
  };

  const pauseGame = () => {
    setIsGamePaused((prev) => !prev);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isGamePaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text style={styles.scoreText}>{score}</Text>
        </Header>

        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
  scoreText: { fontSize: 22 },
});

export default Game;
