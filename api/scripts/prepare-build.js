const fs = require('fs');

const ENV = `
POSTGRES_PASSWORD=${process.env._POSTGRES_PASSWORD}
POSTGRES_USER=${process.env._POSTGRES_USER}
POSTGRES_DB=${process.env._POSTGRES_DB}
DATABASE_HOST=${process.env._DATABASE_HOST}
GOOGLE_APPLICATION_CREDENTIALS=${process.env._GOOGLE_APPLICATION_CREDENTIALS}
HOST=${process.env._HOST}
FIREBASE_API_KEY=${process.env._FIREBASE_API_KEY}
FIREBASE_AUTH_DOMAIN=${process.env._FIREBASE_AUTH_DOMAIN}
FIREBASE_DATABASE_URL=${process.env._FIREBASE_DATABASE_URL}
FIREBASE_PROJECT_ID=${process.env._FIREBASE_PROJECT_ID}
FIREBASE_STORAGE_BUCKET=${process.env._FIREBASE_STORAGE_BUCKET}
FIREBASE_MESSAGING_SENDER_ID=${process.env._FIREBASE_MESSAGING_SENDER_ID}
FIREBASE_APP_ID=${process.env._FIREBASE_APP_ID}
FIREBASE_MEASUREMENT_ID=${process.env._FIREBASE_MEASUREMENT_ID}
FEATURE_UPLOAD_BALANCE_TO_STORAGE=${process.env._FEATURE_UPLOAD_BALANCE_TO_STORAGE}
BALANCES_STORAGE_BUCKET: ${process.env._BALANCES_STORAGE_BUCKET}
BALANCES_STORAGE_DIRECTORY: ${process.env._BALANCES_STORAGE_DIRECTORY}
`;

const TEMPLATE = `
runtime: nodejs10
service: api
instance_class: F4

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

env_variables:
  POSTGRES_PASSWORD: ${process.env._POSTGRES_PASSWORD}
  POSTGRES_USER: ${process.env._POSTGRES_USER}
  POSTGRES_DB: ${process.env._POSTGRES_DB}
  DATABASE_HOST: ${process.env._DATABASE_HOST}
  GOOGLE_APPLICATION_CREDENTIALS: ${process.env._GOOGLE_APPLICATION_CREDENTIALS}
  HOST: ${process.env._HOST}
  FIREBASE_API_KEY: ${process.env._FIREBASE_API_KEY}
  FIREBASE_AUTH_DOMAIN: ${process.env._FIREBASE_AUTH_DOMAIN}
  FIREBASE_DATABASE_URL: ${process.env._FIREBASE_DATABASE_URL}
  FIREBASE_PROJECT_ID: ${process.env._FIREBASE_PROJECT_ID}
  FIREBASE_STORAGE_BUCKET: ${process.env._FIREBASE_STORAGE_BUCKET}
  FIREBASE_MESSAGING_SENDER_ID: ${process.env._FIREBASE_MESSAGING_SENDER_ID}
  FIREBASE_APP_ID: ${process.env._FIREBASE_APP_ID}
  FIREBASE_MEASUREMENT_ID: ${process.env._FIREBASE_MEASUREMENT_ID}
  FEATURE_UPLOAD_BALANCE_TO_STORAGE: ${process.env._FEATURE_UPLOAD_BALANCE_TO_STORAGE}
  BALANCES_STORAGE_BUCKET: ${process.env._BALANCES_STORAGE_BUCKET}
  BALANCES_STORAGE_DIRECTORY: ${process.env._BALANCES_STORAGE_DIRECTORY}

beta_settings:
  cloud_sql_instances: ${process.env._CLOUD_SQL_INSTANCE}
`;

const SERVICE_ACCOUNT = `
{

  "type": "${process.env._SERVICE_ACCOUNT_TYPE}",
  "project_id": "${process.env._SERVICE_ACCOUNT_PROJECT_ID}",
  "private_key_id": "${process.env._SERVICE_ACCOUNT_PRIVATE_KEY_ID}",
  "private_key": "${process.env._SERVICE_ACCOUNT_PRIVATE_KEY}",
  "client_email": "${process.env._SERVICE_ACCOUNT_CLIENT_EMAIL}",
  "client_id": "${process.env._SERVICE_ACCOUNT_CLIENT_ID}",
  "auth_uri": "${process.env._SERVICE_ACCOUNT_AUTH_URI}",
  "token_uri": "${process.env._SERVICE_ACCOUNT_TOKEN_URI}",
  "auth_provider_x509_cert_url": "${process.env._SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL}",
  "client_x509_cert_url": "${process.env._SERVICE_ACCOUNT_CLIENT_X509_CERT_URL}"
}

`;

fs.writeFileSync('./app.yaml', TEMPLATE);
fs.writeFileSync('./serviceAccount.json', SERVICE_ACCOUNT);
fs.writeFileSync('./.env', ENV);
