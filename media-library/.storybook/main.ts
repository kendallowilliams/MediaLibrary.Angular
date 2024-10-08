import type { StorybookConfig } from '@storybook/core-common';

export const rootMain: StorybookConfig = {
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs
  //   // Return the altered config
  //   return config;
  // },
};

export const framework = {
  name: '@storybook/angular',
  options: {}
};

export const docs = {
  autodocs: true
};
export const addons = [
  '@storybook/addon-styling-webpack',
  '@storybook/auto-config',
  '@chromatic-com/storybook'
];
