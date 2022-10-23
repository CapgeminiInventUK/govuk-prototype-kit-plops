# GOVUK Prototype Kit Plops

> :construction: **Under construction** :construction:
>
> This is not ready for usage

## How to use

1. Install using npm (currently on working with local as the plugin is not published)

    > Currently using the prototype kit that is cloned as a submodule you can use this plugin. If you want to try it out you need to run `npm install --save ../../govuk-prototype-kit-plops` from within the submodule prototype kit

2. Add the following to the `package.json` in the prototype kit

    ```json  
    "generate:plop": "plop --plopfile ./node_modules/govuk-prototype-kit-plops/plopfile.js",
    "generate:web": "./node_modules/govuk-prototype-kit-plops/web/bin/www",
    ```

3. From within the prototype kit run `npm run plop` and then answer the CLI accordingly
