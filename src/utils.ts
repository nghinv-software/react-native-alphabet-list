/**
 * Created by nghinv on Thu Jul 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { Easing } from 'react-native-reanimated';

export const Alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const springConfig = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const timingConfig = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};
