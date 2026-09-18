module.exports = {
  extends: ['stylelint-config-standard'],
  // Components use independent selector scopes; preserve their cascade order.
  rules: { 'no-descending-specificity': null },
};
