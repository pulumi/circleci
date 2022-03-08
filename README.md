# Pulumi Orbs for CircleCI

This repository contains Pulumi Orbs for use in CircleCI. Using these orbs
will allow you to easily integrate stack updates and previews into
your existing CI/CD workflow, without the need for writing custom
scripts.

## Usage

To use these orbs, simply include the `pulumi/pulumi@2.0.0` orbs package, and
then call the orb commands like `pulumi/login` or `pulumi/update` from your
CircleCI configuration file.

```yaml
version: 2.1
orbs:
  pulumi: pulumi/pulumi@2.0.0
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

### pulumi/stack_init

The `stack_init` orb initializes a new Pulumi stack.

If the `Pulumi.yaml` file for your stack is in a different directory than the
CircleCI job's current working directory, you will need to set the `working_directory`
parameter.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the stack to initialize. |
| secrets_provider | string  | default      | The type of the provider that should be used to encrypt and decrypt secrets (possible choices: default, passphrase, awskms, azurekeyvault, gcpkms, hashivault). |
| working_directory | string | . | The relative working directory to run `pulumi` from. | 
| copy | string | "" | The stack name from which to copy an existing stack's configuration

### pulumi/stack_rm

The `stack_rm` orb removes a stack and its configuration..

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the stack to remove. |
| force | boolean | false | Whether or not to force deletion of the stack, leaving behind any resources managed by the stack. | 
| working_directory | string | . | The relative working directory to run `pulumi` from. | 

### pulumi/stack_output

The `stack_output` sets a stack's output property to an environment variable.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the stack to read the output property from. |
| property_name           | string  | (none)      | Name of the output property to read. |
| env_var           | string  | (none)      | Name of the environment variable to set the output property's value to. |
| show_secrets | boolean | false | Display stack outputs which are marked as secret in plaintext. | 
| working_directory | string | . | The relative working directory to run `pulumi` from. | 

### pulumi/preview

The `preview` orb performs a preview of the update to a given Pulumi stack.

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

### pulumi/destroy

The `destroy` orb destroys a given Pulumi stack and its resources. After running to completion, all of this stack’s resources and associated state will be gone.

Warning: this command is generally irreversible and should be used with great care.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the Pulumi stack to destroy. |
| working_directory | string | . | The relative working directory to run `pulumi` from. | 
| skip-preview | boolean | false | Whether or not to skip the preview step before destroying the stack. | 

### pulumi/refresh

The `refresh` orb performs a refresh to a given Pulumi stack. The stack’s resource state is compared to the current state known in the cloud provider, and the stack's resources are updated as necessary. No changes will be made to the resources on the cloud provider, but resources that can no longer be found will be removed from the stack.

| Parameter         | type    | default     | description    |
|-------------------|---------|-------------|----------------|
| stack           | string  | (none)      | Name of the Pulumi stack to refresh. |
| expect_no_changes | boolean | false | If set, Pulumi will report an error if any resource changes are detected. | 
| working_directory | string | . | The relative working directory to run `pulumi` from. | 
| skip-preview | boolean | false | Whether or not to skip the preview step before the refresh. | 
