# Cypress Tests for CKEditor 5

Short description: This repository is a base for testing CKEditor 5.

## Components

- `editor/` — Sample project, used for local deployment and tests.
- `token/` — Node.js application for generating JWT tokens. Token is used for generating signatures used in proxy application.
- `proxy/` — Node.js application that serves as a proxy between client and Cloud Services REST API.
- `cypress/` — CKEditor 5 tests, covering API test scenario.

## Setup

1. Install dependencies in the relevant directories.
2. Configure environment variables for the required services.
3. Start the applications.
4. Run the Cypress test suite.

## Environment variables

The `proxy` and `token` directories require their own `.env` files.

See the README files inside those directories for the required variables and setup instructions.

