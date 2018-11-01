# Pulumi Orbs for CircleCI

This repo contains Pulumi Orbs for use in CircleCI. Using these orbs
will allow you to easily integrate stack updates and previews into
your existing CI/CD workflow, without the need for writing custom
scripts.

## Usage

To use these orbs, simply include the `pulumi/pulumi@1.0.0` orbs package, and
then call the orb commands like `pulumi/login` or `pulumi/update` from your
CircleCI configuration file.

```
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
