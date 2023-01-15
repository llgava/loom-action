[![Test loom (Custom Pattern)](https://github.com/llgava/loom-action/actions/workflows/custom.yml/badge.svg)](https://github.com/llgava/loom-action/actions/workflows/custom.yml) [![Test loom (Mojang Pattern)](https://github.com/llgava/loom-action/actions/workflows/mojang.yml/badge.svg)](https://github.com/llgava/loom-action/actions/workflows/mojang.yml)

# Loom

| Pattern | Description                                                   |
|---------|---------------------------------------------------------------|
| Mojang  | The Mojang style for file endings. (Default)                  |
| Custom  | The Custom style for file endings configured on `pattern.yml` |

# TODO
```env
# add .env file on project root
PATTERN='mojang'
BEHAVIOR_PACK_PATH='addon/behavior_pack'
RESOURCE_PACK_PATH='addon/resource_pack'
```

```sh
# Start build:dev (will recompile the code on every change)
yarn build:dev or npm run build:dev

# Start dev (will reload the app on every change)
yarn dev or npm run dev
```
