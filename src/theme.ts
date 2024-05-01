import { theme as chakraTheme, extendBaseTheme } from '@chakra-ui/react';
import '@fontsource/nunito-sans';

const { Badge, Button, Drawer } = chakraTheme.components;

const theme = extendBaseTheme({
  fonts: {
    heading: `'Nunito Sans', sans-serif`,
    body: `'Nunito Sans', sans-serif`,
  },
  colors: {
    primary: {
      500: '#95C475',
    },
  },
  space: {
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px',
    9: '72px',
    10: '80px',
    11: '88px',
    12: '96px',
  },
  components: {
    Badge,
    Button,
    Drawer,
  },
});

export default theme;
