/**
 * Created by nghinv on Thu Jul 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import equals from 'react-fast-compare';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { springConfig } from './model';

interface CharacterProps {
  text: string;
  index: number;
  translateY: Animated.SharedValue<number>;
  isGesture: Animated.SharedValue<boolean>;
  charHeight: number;
  trackSize: number;
  trackScale: number;
  lineWidth: number;
  textColorActive: string;
  textInactiveColor: string;
  charStyle?: StyleProp<TextStyle>;
}

function Character(props: CharacterProps) {
  const {
    text,
    index,
    translateY,
    isGesture,
    charHeight,
    trackSize,
    trackScale,
    lineWidth,
    textColorActive,
    textInactiveColor,
    charStyle,
  } = props;

  const style = useAnimatedStyle(() => {
    const size = trackSize + 2;
    const sizeActive = trackSize * trackScale + 4;
    const activeIndex = translateY.value / charHeight;
    const inputRange = [index - 2, index - 1, index, index + 1, index + 2];
    const outputRange = isGesture.value
      ? [0, -sizeActive / 2, -sizeActive, -sizeActive / 2, 0]
      : [0, -size / 2, -size, -size / 2, 0];

    const translateX = interpolate(
      activeIndex,
      inputRange,
      outputRange,
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: withSpring(translateX, springConfig) }],
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const activeIndex = translateY.value / charHeight;
    const inputRange = [index - 2, index - 1, index, index + 1, index + 2];
    const outputRange = [1, 1, 1.6, 1, 1];
    const scale = interpolate(activeIndex, inputRange, outputRange);

    return {
      color:
        Math.round(activeIndex) === index ? textColorActive : textInactiveColor,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, { height: charHeight }, style]}>
      <Animated.Text style={[styles.txtTitle, charStyle, titleStyle]}>
        {text.toLocaleUpperCase()}
      </Animated.Text>
      <View
        style={[
          styles.line,
          { width: lineWidth, backgroundColor: textInactiveColor },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 4,
  },
  txtTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default React.memo(Character, equals);
