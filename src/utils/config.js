let baseUrl = 'https://blackice-api-dev.falconweb.app/api';
let nodeUrl = 'https://blackice-api-dev.falconweb.app';

if (window.location.host === 'blackice-admin-dev.falconweb.app') {
  baseUrl = 'https://blackice-api-dev.falconweb.app/api';
  nodeUrl = 'https://blackice-api-dev.falconweb.app';
} else if (window.location.host === 'blackice-admin-qa.falconweb.app') {
  baseUrl = 'https://blackice-api-qa.falconweb.app/api';
  nodeUrl = 'https://blackice-api-qa.falconweb.app';
} else if (window.location.host === 'blackice-admin-staging.falconweb.app') {
  baseUrl = 'https://blackice-api-staging.falconweb.app/api';
  nodeUrl = 'https://blackice-api-staging.falconweb.app';
}

module.exports = { baseUrl, nodeUrl };
