// Non-overlapping groups keep concurrent tasks from editing the same file.
module.exports = {
  '*.{js,jsx,cjs,mjs}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.css': ['stylelint --fix --max-warnings=0', 'prettier --write'],
  '*.{json,jsonc,md,mdx,html,yml,yaml}': 'prettier --write',
};
