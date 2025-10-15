// components/VideoSurface.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

type Props = {
  uri: string;
  onReady?: () => void;
  onError?: (e: unknown) => void;
  style?: any;
  autoPlay?: boolean;
  loop?: boolean;
  useNativeControls?: boolean;
};

export default function VideoSurface({
  uri,
  onReady,
  onError,
  style,
  autoPlay = true,
  loop = true,
  useNativeControls = true,
}: Props) {
  return (
    <View style={[styles.fill, style]}>
      <Video
        style={styles.fill}
        source={{ uri }}
        useNativeControls={useNativeControls}
        resizeMode={ResizeMode.COVER}
        shouldPlay={autoPlay}
        isLooping={loop}
        onError={(e) => onError?.(e)}
        onLoad={() => onReady?.()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { width: '100%', height: '100%' },
});
