# Responsive Utilities Guide

This guide explains how to use the responsive utilities in our codebase to create adaptive UI components that respond well to different screen sizes.

## Table of Contents

- [Overview](#overview)
- [Breakpoints](#breakpoints)
- [Core Responsive Hooks](#core-responsive-hooks)
- [Responsive Value Object](#responsive-value-object)
- [Responsive Scaling Functions](#responsive-scaling-functions)
- [Responsive Style Creators](#responsive-style-creators)
- [Usage Examples](#usage-examples)

## Overview

Our responsive system provides tools to create UIs that adapt to different screen sizes automatically. The system is based on:
- Predefined breakpoints for different device sizes
- Hooks for responding to screen size changes
- Utility functions for creating responsive layouts and typography

## Breakpoints

The system uses the following breakpoints:

```javascript
export const breakpoints = {
  xs: 0,     // Extra small devices
  sm: 375,   // Small devices (phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
};
```

## Core Responsive Hooks

### `useBreakpoint()`

Returns the current breakpoint based on screen width.

```javascript
import { useBreakpoint } from '../app/theme/responsive';

function MyComponent() {
  const breakpoint = useBreakpoint();
  // breakpoint will be 'xs', 'sm', 'md', 'lg', or 'xl'
  
  return (
    <View style={{
      // Adjust layout based on breakpoint
      flexDirection: breakpoint === 'xs' ? 'column' : 'row',
    }}>
      {/* Component content */}
    </View>
  );
}
```

### `useResponsiveValue(values)`

Returns a value based on the current breakpoint.

```javascript
import { useResponsiveValue } from '../app/theme/responsive';

function MyComponent() {
  const fontSize = useResponsiveValue({
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    base: 16, // Fallback value
  });
  
  return (
    <Text style={{ fontSize }}>
      This text changes size based on screen width
    </Text>
  );
}
```

## Responsive Value Object

The `ResponsiveValue` type defines values for different breakpoints:

```typescript
type ResponsiveValue<T> = {
  xs?: T;   // Value for extra small screens
  sm?: T;   // Value for small screens
  md?: T;   // Value for medium screens
  lg?: T;   // Value for large screens
  xl?: T;   // Value for extra large screens
  base: T;  // Default value (required)
};
```

## Responsive Scaling Functions

### Font Size Scaling

```javascript
import { useResponsiveFontSize } from '../app/theme/responsive';

function MyComponent() {
  // Scales the font size for different devices
  const fontSize = useResponsiveFontSize(16);
  // Or with breakpoints
  const responsiveSize = useResponsiveFontSize({
    xs: 14,
    md: 18,
    base: 16,
  });
  
  return <Text style={{ fontSize }}>Responsive Text</Text>;
}
```

### Spacing Scaling

```javascript
import { useResponsiveSpacing } from '../app/theme/responsive';

function MyComponent() {
  // Scales the spacing for different devices
  const padding = useResponsiveSpacing(16);
  
  return <View style={{ padding }}>Responsive Padding</View>;
}
```

## Responsive Style Creators

Our system includes helper functions to create responsive styles:

### Responsive Container

```javascript
import { responsiveStyles } from '../app/theme/responsiveStyles';
import { useTheme } from '../app/theme';

function MyContainer() {
  const theme = useTheme();
  
  return (
    <View style={responsiveStyles.container(theme)}>
      {/* Content */}
    </View>
  );
}
```

### Responsive Row

```javascript
import { responsiveStyles } from '../app/theme/responsiveStyles';
import { useTheme } from '../app/theme';

function MyRow() {
  const theme = useTheme();
  
  // Create a responsive row with custom options
  const rowStyle = responsiveStyles.row({
    spacing: 'lg',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    wrap: true,
  })(theme);
  
  return (
    <View style={rowStyle}>
      {/* Row items */}
    </View>
  );
}
```

### Responsive Text

```javascript
import { responsiveStyles } from '../app/theme/responsiveStyles';
import { useTheme } from '../app/theme';

function MyText() {
  const theme = useTheme();
  
  const textStyle = responsiveStyles.text({
    fontSize: {
      xs: 14,
      md: 18,
      base: 16,
    },
    fontFamily: 'bold',
    colorKey: 'text',
  })(theme);
  
  return <Text style={textStyle}>Responsive Text</Text>;
}
```

### Responsive Button

```javascript
import { responsiveStyles } from '../app/theme/responsiveStyles';
import { useTheme } from '../app/theme';

function MyButton() {
  const theme = useTheme();
  
  const buttonStyle = responsiveStyles.button({
    paddingVertical: 'md',
    paddingHorizontal: 'lg',
    borderRadius: 8,
    backgroundColorKey: 'palette.primary100',
  })(theme);
  
  return <TouchableOpacity style={buttonStyle}>Press Me</TouchableOpacity>;
}
```

## Usage Examples

### Conditional Rendering Based on Breakpoint

```javascript
import { useBreakpoint } from '../app/theme/responsive';

function MyComponent() {
  const breakpoint = useBreakpoint();
  
  return (
    <View>
      {(breakpoint === 'xs' || breakpoint === 'sm') ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </View>
  );
}
```

### Responsive Grid Layout

```javascript
import { useBreakpoint, useResponsiveValue } from '../app/theme/responsive';

function GridLayout() {
  // Number of columns based on breakpoint
  const columns = useResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    base: 2,
  });
  
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map(item => (
        <View key={item.id} style={{ width: `${100 / columns}%` }}>
          {/* Item content */}
        </View>
      ))}
    </View>
  );
}
```

### Responsive Image

```javascript
import { responsiveStyles } from '../app/theme/responsiveStyles';
import { useTheme } from '../app/theme';

function ResponsiveImage() {
  const theme = useTheme();
  
  const imageStyle = responsiveStyles.image({
    width: {
      xs: 150,
      md: 250,
      lg: 350,
      base: 200,
    },
    height: {
      xs: 100,
      md: 180,
      lg: 250,
      base: 150,
    },
    borderRadius: 8,
  })(theme);
  
  return <Image source={...} style={imageStyle} />;
}
```

This responsive system helps create UIs that look great on all device sizes while keeping your code clean and maintainable. 
