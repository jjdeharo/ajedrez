// SPDX-License-Identifier: AGPL-3.0-or-later
// Pruebas en Chromium y Firefox, en escritorio y en móvil, con la página servida en local.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: 'tests',
    use: { baseURL: 'http://127.0.0.1:8772/' },
    webServer: {
        command: 'python3 -m http.server 8772 --bind 127.0.0.1',
        url: 'http://127.0.0.1:8772/',
        reuseExistingServer: false,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'movil', use: { ...devices['Pixel 7'] } },
    ],
});
