import { validatePresence } from './config-validator';
describe('config validator', () => {
  describe('validate presence', () => {
    it('validates presence of variable', () => {
      expect(validatePresence('my variable', 'my env', 'dev')).toBe(
        'my variable'
      );
    });

    it('gives an error when variable is undefined', () => {
      expect(() => validatePresence(undefined, 'my env', 'dev')).toThrow(
        "Expected to find environment variable my env but found 'undefined'"
      );
    });
  });
});
