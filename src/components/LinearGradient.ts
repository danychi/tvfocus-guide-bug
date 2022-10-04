// Resolves issue with using this comoponent as a jsx component
// https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/100 explains why requiring this dependency is necessary
const LinearGradient = require('react-native-linear-gradient').default;

export { LinearGradient };
