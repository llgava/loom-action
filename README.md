# Loom - ![Latest Release](https://img.shields.io/github/v/release/llgava/loom-action?logo=github&logoColor=959da5&labelColor=353c43&color=0091c2&Current&label=Latest%20Release)
Standardization and moderation when creating addons for Minecraft Bedrock.

## Setting up action step
If necessary, use the template file located [here](./.github/loom-action.template.yml).

| Input              | Type                            | Description                               | Required | Default          |
|--------------------|---------------------------------|-------------------------------------------|----------|------------------|
| pattern            | custom, mojang or seface_blocks | The file endings style                    |     ✔    | mojang           |
| behavior_pack_path | string                          | The relative path to behavior pack folder |     ✖    | behavior_packs/0 |
| resource_pack_path | string                          | The relative path to resource pack folder |     ✖    | resource_packs/0 |

## Roadmap
##### Updated: 01/15/2023

- [ ] Add support to check identifier patterns
- [ ] Add support to check missing names on text files
- [ ] Add support to check the max supported path lenght

---

## Setting up locally
Want to contribute? Prepare the environment locally to test your contribution correctly!

1. Clone the repository
    ```sh
    git clone https://github.com/llgava/loom-action.git
    ```

2. Install the dependencies
    ```sh
    yarn install or npm install
    ```

3. Setup your environment (`.env`) variables<br />
If you prefer, use the [.env.template](./.github/.env.template) template
    
    ```env
    PATTERN='xxxxx'
    BEHAVIOR_PACK_PATH='xxxxx'
    RESOURCE_PACK_PATH='xxxxx'
    ```

4. Run the project in development mode
    ```sh
    # Will recompile the code on every change
    yarn build:dev or npm run build:dev
    ```

---

### Contact
Leonardo Luiz Gava - [@llgava](https://twitter.com/llgava "Leonardo Luiz Gava • Twitter") - <me@llgava.net>
