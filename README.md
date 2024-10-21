<h1 align="center"><img src="assets/start-repo.svg" alt="Start REPO" width="300" /></h1>

🪲 Start REPO

The purpose of Start REPO is to easily create default issues on a new GitHub or
GitLab repository. It is a simple way to get started with your projects. We do
have a lot of clients at BearStudio and we need to create a bunch of default
issues when bootstrapping a new project. This is where Start REPO comes.

Scopes are here to easily target the kind of project you are starting: `web`,
`mobile`, `desktop`, `server`, `game`, are some example of scopes you can
create.

## Installation

```bash
yarn install
yarn build
```

## Project Setup

- Duplicate and rename your `.env.example` into `.env`.

### GitHub
- Go to your github [developper settings](https://github.com/settings/developers). Create a new OAuth app and a new client secret.
- Fill your `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` env variable with your client id and client secret.


> [!NOTE]
> **If you need to request access to your organization :**
> - You can approve it in the OAuth policies page when logged in as an administrator of your organization.

### GitLab
- Go to your gitlab [applications](https://gitlab.com/-/user_settings/applications). Create a new OAuth app with `http://localhost:3000/api/auth/callback/gitlab` as the callback url as you are in development mode.
- Check the `read_user` scope as it is needed for authentication.
- Fill your `GITLAB_CLIENT_ID` and `GITLAB_CLIENT_SECRET` env variable with your application id and application secret.


## Development

```bash
yarn dev
```

### Storybook

```bash
yarn storybook
```

## Show hint on development environments

Setup the `NEXT_PUBLIC_DEV_ENV_NAME` env variable with the name of the environment.

```
NEXT_PUBLIC_DEV_ENV_NAME=staging
NEXT_PUBLIC_DEV_ENV_COLOR_SCHEME=teal
```


## Translations

### Setup the i18n Ally extension

We recommended using the [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) plugin for VS Code for translations management.

Create or edit the `.vscode/settings.json` file with the following settings:

```json
{
  "i18n-ally.localesPaths": ["src/locales"],
  "i18n-ally.keystyle": "nested",
  "i18n-ally.enabledFrameworks": ["general", "react", "i18next"],
  "i18n-ally.namespace": true,
  "i18n-ally.defaultNamespace": "common",
  "i18n-ally.extract.autoDetect": true,
  "i18n-ally.keysInUse": ["common.languages.*"]
}
```

### Guidelines for translations

- Use namespaces `t('namespace:translationKey')` and nesting `t('namespace:this.is.nested')`.
```js
// Example for translations available in account.json
t('account:data.firstname.label')
```

- For fields and data translations use a `data` object.
```json
// account.json
{
  "data": {
    "firstname": {
      "label": "First Name",
      "required": "First Name is required",
    },
  }
}
```
```js
// React
t('account:data.firstname.label')
t('account:data.firstname.required')
```

- For user feedbacks, use a `feedbacks` object with `actionSuccess` & `actionError` keys containing each `title` and `description` (optional).
```json
// account.json
{
  "resetPassword": {
    "feedbacks": {
      "confirmSuccess": {
        "title": "Your password has been reset",
        "description": "You can now login"
      },
      "confirmError": {
        "title": "Reset password failed"
      }
    }
  }
}
```
```js
// React
t('account:resetPassword.feedbacks.updateSuccess.title')
t('account:resetPassword.feedbacks.updateSuccess.description')
t('account:resetPassword.feedbacks.updateError.title')
```

- For user actions, use an `actions` object.
```json
// account.json
{
  "resetPassword": {
    "actions": {
      "send": "Send Email",
      "reset": "Reset Password"
    }
  }
}
```
```js
// React
t('account:resetPassword.actions.send')
t('account:resetPassword.actions.reset')
```

- Use the common workspace only for VERY generic translations. By default, use specific namespaces to allow easy update on large code base without unwanted side-effects.

## Production

```bash
yarn storybook:build # Optional: Will expose the Storybook at `/storybook`
yarn build
yarn start
```
