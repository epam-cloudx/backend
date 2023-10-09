import type { Config } from '@jest/types';
import jestBaseConfig from '../../jest.base.config';

const config: Config.InitialOptions = {
  ...jestBaseConfig,
  rootDir: './',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default config;
