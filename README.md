# Pulumi Orbs for CircleCI

This repo contains Pulumi Orbs for use in CircleCI. Using these orbs
will allow you to easily integrate stack updates and previews into
your existing CI/CD workflow, without the need for writing custom
scripts.

## Usage

To use these orbs, simply include the `pulumi/pulumi@1.0.0` orbs package, and
then call the orb commands like `pulumi/login` or `pulumi/update` from your
CircleCI configuration file.

```yaml
version: 2.1
orbs:
  pulumi: pulumi/pulumi@1.0.0
jobs:
  build:
    docker:
      - image: circleci/node:7.10
    working_directory: ~/repo
    steps:
      - checkout
      - pulumi/login
      - run:
          command: |
            npm install
            npm run build
      - pulumi/update:
          stack: website-prod
```

## Orb Reference

### pulumi/login

The `login` orb downloads the Pulumi CLI and authenticates with the Pulumi
service.

> It is recommended to omit the `version` and `access-token` parameters, and
> instead download the latest Pulumi CLI and provide the access token via a
> secure environment variable named `PULUMI_ACCESS_TOKEN`.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| version           | string  | latest      | Version of the Pulumi CLI to install. |
| cloud-url         | string  | https://api.pulumi.com | URL of the Pulumi service to log into. |
| access-token      | string  | ${PULUMI_ACCESS_TOKEN} | The access token to use to log in. |

### pulumi/preview

The `preview` orb performs a preview of the update to a given Pulumi stack.

If the `Pulumi.yaml` file for your stack is in a different directory than the
CircleCI job's current working directory, you will need to set the `working_directory`
parameter.

> It is recommended to always run a preview in your CI/CD, as it will catch
> certain classes of errors that wouldn't otherwise be found in a standard
> build, test, lint setup.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the Pulumi stack to preview. |
| working_directory | string | . | The relative working directory to run `pulumi` from. | 

### pulumi/update

The `update` orb performs an update to a given Pulumi stack.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the Pulumi stack to update. |
| working_directory | string | . | The relative working directory to run `pulumi` from. | 
| skip-preview | boolean | false | Whether or not to skip the preview step before the update. | 
