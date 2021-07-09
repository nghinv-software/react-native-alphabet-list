/**
 * Created by nghinv on Fri Jul 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import equals from 'react-fast-compare';
import Animated from 'react-native-reanimated';
import Header from './Header';
import type { ItemType } from './types';

interface SectionProps {
  header: string;
  data: Array<any>;
  index: number;
  sectionsData: any;
  renderHeader?: (header: string) => React.ReactNode;
  renderItem?: (data: ItemType) => React.ReactNode;
  headerTitleColor?: string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}

function Section(props: SectionProps) {
  const {
    header,
    data,
    index,
    sectionsData,
    renderHeader,
    renderItem,
    headerTitleColor,
    headerTitleStyle,
    headerStyle,
  } = props;

  return (
    <Animated.View ref={sectionsData[index].ref}>
      {renderHeader ? (
        renderHeader?.(header)
      ) : (
        <Header
          title={header}
          headerTitleColor={headerTitleColor}
          headerTitleStyle={headerTitleStyle}
          headerStyle={headerStyle}
        />
      )}
      {data
        .filter((d) => d.key.toLocaleUpperCase() === header.toLocaleUpperCase())
        .map((d, idx) => (
          <React.Fragment key={`index_${idx}`}>
            {renderItem?.({ item: d, index: idx })}
          </React.Fragment>
        ))}
    </Animated.View>
  );
}

export default React.memo(Section, equals);
