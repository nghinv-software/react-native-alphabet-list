/**
 * Created by nghinv on Thu Jul 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import equals from 'react-fast-compare';
interface HeaderProps {
  title: string;
  headerTitleColor?: string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}

Header.defaultProps = {};

function Header(props: HeaderProps) {
  const {
    title,
    headerTitleColor = 'white',
    headerTitleStyle,
    headerStyle,
  } = props;

  return (
    <View style={[styles.container, headerStyle]}>
      <Text
        style={[
          styles.txtHeader,
          { color: headerTitleColor },
          headerTitleStyle,
        ]}
      >
        {title.toLocaleUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  txtHeader: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default React.memo(Header, equals);
