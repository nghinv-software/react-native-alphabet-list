/**
 * Created by nghinv on Thu Jul 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring, measure, useAnimatedRef, scrollTo, useAnimatedScrollHandler, withTiming } from 'react-native-reanimated';
import equals from 'react-fast-compare';
import { snapPoint } from 'react-native-redash';
import { Alphabet, springConfig, timingConfig } from './model';
import Section from './Section';
import Character from './Character';
import type { DataType, ItemType } from './types';

interface AlphabetListProps {
  data: DataType;
  showAllHeader?: boolean;
  renderHeader?: (header: string) => React.ReactNode;
  renderItem?: (data: ItemType) => React.ReactNode;
  trackSize?: number;
  trackColor?: string;
  charHeight?: number;
  trackScale?: number;
  lineWidth?: number;
  textColorActive?: string;
  textInactiveColor?: string;
  charStyle?: StyleProp<TextStyle>;
  headerTitleColor?: string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}

function createSharedVariables(sections: Array<any>) {
  const sectionsData = sections.map((char) => ({
    position: useSharedValue(0),
    ref: useAnimatedRef(),
    key: char,
  }));

  return {
    sectionsData,
  };
}

function AlphabetList(props: AlphabetListProps) {
  const {
    data,
    showAllHeader = false,
    renderHeader,
    renderItem,
    trackSize = 18,
    trackColor = 'white',
    charHeight = 20,
    trackScale = 1.5,
    lineWidth = 20,
    textColorActive = 'tomato',
    textInactiveColor = 'white',
    charStyle,
    headerTitleColor,
    headerTitleStyle,
    headerStyle,
  } = props;
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isGesture = useSharedValue(false);
  const isGestureAnim = useSharedValue(false);
  const isComputed = useSharedValue(false);
  const charIndex = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const Sections = useMemo(() => {
    return showAllHeader ? Alphabet : Alphabet.filter(char => data.find(d => d.key.toLocaleUpperCase() === char.toLocaleUpperCase()));
  }, [showAllHeader, data]);

  const { sectionsData } = createSharedVariables(Sections);

  const applyMeasure = () => {
    'worklet';

    if (!isComputed.value) {
      let distance = 0;
      sectionsData.forEach((s) => {
        const { height } = measure(s.ref);
        s.position.value = distance;
        distance += height;
      });
    }

    isComputed.value = true;
  };

  const processScroll = (transY: number) => {
    'worklet';

    const index = Math.round(transY / charHeight);
    if (index !== charIndex.value) {
      charIndex.value = index;

      const currentChar = Alphabet[index];
      const findItem = sectionsData.filter(s => `${s.key}`.toLocaleUpperCase() === currentChar.toLocaleUpperCase())?.[0];
      if (findItem) {
        scrollTo(scrollRef, 0, findItem.position.value, true);
      }
    }
  };

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>({
    onStart: (event, ctx) => {
      translateY.value = event.y - trackSize / 2;
      ctx.y = translateY.value;
      processScroll(translateY.value);
      scale.value = trackScale;
      isGesture.value = true;
      isGestureAnim.value = true;
      applyMeasure();
    },
    onActive: (event, ctx) => {
      const newTranslate = event.translationY + ctx.y;
      translateY.value = Math.max(0, Math.min(charHeight * (Alphabet.length - 1), newTranslate));
      processScroll(translateY.value);
    },
    onFinish: (event) => {
      scale.value = 1;
      const snapPoints = Alphabet.map((_, index) => index * charHeight);
      const newTranslate = snapPoint(translateY.value, event.velocityY, snapPoints);
      processScroll(newTranslate);
      translateY.value = withSpring(newTranslate, springConfig, () => {
        isGestureAnim.value = false;
      });
      isGesture.value = false;
    },
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (isGestureAnim.value) return;

      const transY = event.contentOffset.y;
      let findIndex = -1;

      sectionsData.forEach((s, index) => {
        const current = sectionsData[index].position.value;
        const next = sectionsData[index + 1]?.position.value ?? current;

        if (current <= transY + 100 && transY < next) {
          Alphabet.forEach((a, idx) => {
            if (a === s.key) {
              findIndex = idx;
            }
          });
        }
      });

      if (findIndex !== -1) {
        translateY.value = withTiming(findIndex * charHeight, timingConfig);
      }
    },
    onBeginDrag: () => {
      applyMeasure();
    },
  });

  const pointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: (charHeight - trackSize) / 2 },
        { translateY: translateY.value },
        { translateX: withSpring((1 - scale.value) * (trackSize / 2), springConfig) },
        { scale: withSpring(scale.value, springConfig) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          {
            Sections.map((header, index) => (
              <Section
                key={header}
                index={index}
                header={header}
                sectionsData={sectionsData}
                data={data}
                renderHeader={renderHeader}
                renderItem={renderItem}
                headerTitleColor={headerTitleColor}
                headerTitleStyle={headerTitleStyle}
                headerStyle={headerStyle}
              />
            ))
          }
        </Animated.ScrollView>
      </View>
      <View style={styles.viewRight}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
        >
          <Animated.View style={styles.viewCharacters}>
            {
              Alphabet.map((char, index) => (
                <Character
                  key={char}
                  text={char}
                  index={index}
                  translateY={translateY}
                  isGesture={isGesture}
                  charHeight={charHeight}
                  trackSize={trackSize}
                  trackScale={trackScale}
                  lineWidth={lineWidth}
                  textColorActive={textColorActive}
                  textInactiveColor={textInactiveColor}
                  charStyle={charStyle}
                />
              ))
            }
            <Animated.View
              style={[
                {
                  width: trackSize,
                  height: trackSize,
                  borderRadius: trackSize,
                  backgroundColor: trackColor,
                  position: 'absolute',
                  right: 0,
                },
                pointStyle,
              ]}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  viewLeft: {
    flex: 1,
  },
  viewRight: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  viewCharacters: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});

export default React.memo(AlphabetList, equals);
