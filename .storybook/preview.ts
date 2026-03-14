import type { Preview } from '@storybook/react-vite';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        brew: { name: 'brew', value: '#0a0a0f' },
        "brew-surface": { name: 'brew-surface', value: '#12111a' },
        white: { name: 'white', value: '#ffffff' }
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'brew'
    }
  }
};

export default preview;
