// SPDX-License-Identifier: AGPL-3.0-or-later
// Partidas de prueba (ratón, teclado, promoción) y revisión automática de accesibilidad (axe, WCAG 2.1 AA).
const { test, expect } = require('@playwright/test');
const { default: AxeBuilder } = require('@axe-core/playwright');

const casilla = (page, nombre) => page.locator(`#chessboard [data-row="${8 - Number(nombre[1])}"][data-col="${'abcdefgh'.indexOf(nombre[0])}"]`);

async function mover(page, desde, hasta) {
    await casilla(page, desde).click();
    await casilla(page, hasta).click();
}

async function sinFallosDeAccesibilidad(page) {
    const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(resultado.violations.map(v => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
}

test('posición inicial, pie con licencias e IA y sin fallos de accesibilidad', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#chessboard .square')).toHaveCount(64);
    await expect(casilla(page, 'e1')).toHaveAttribute('aria-label', 'e1, rey blanco');
    await expect(casilla(page, 'd8')).toHaveAttribute('aria-label', 'd8, reina negra');
    await expect(page.locator('#turn-indicator')).toHaveText('Turno de las Blancas');
    const pie = page.locator('footer');
    await expect(pie).toContainText('AGPL v3');
    await expect(pie.getByRole('link', { name: 'nivel 4 del MIAE' })).toHaveAttribute('href', 'https://jjdeharo.github.io/miae/?nivel=4');
    await expect(pie).toBeInViewport();
    await sinFallosDeAccesibilidad(page);
});

test('mate del pastor con el ratón y reinicio', async ({ page }) => {
    await page.goto('/');
    await mover(page, 'e2', 'e4');
    await expect(page.locator('#turn-indicator')).toHaveText('Turno de las Negras');
    await mover(page, 'e7', 'e5');
    await mover(page, 'f1', 'c4');
    await mover(page, 'b8', 'c6');
    await mover(page, 'd1', 'h5');
    await mover(page, 'g8', 'f6');
    await mover(page, 'h5', 'f7');
    await expect(page.locator('#turn-indicator')).toContainText(/[Jj]aque mate/);
    await page.getByRole('button', { name: 'Reiniciar Juego' }).click();
    await expect(casilla(page, 'e2')).toHaveAttribute('aria-label', 'e2, peón blanco');
});

test('se juega con el teclado', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'movil', 'en el móvil no hay teclado físico');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(casilla(page, 'e2')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(casilla(page, 'e2')).toHaveAttribute('aria-label', 'e2, peón blanco, seleccionada');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await expect(casilla(page, 'e4')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(casilla(page, 'e4')).toHaveAttribute('aria-label', 'e4, peón blanco');
    await expect(page.locator('#turn-indicator')).toHaveText('Turno de las Negras');
    await sinFallosDeAccesibilidad(page);
});

test('el peón que llega al final se promociona', async ({ page }) => {
    await page.goto('/');
    for (const [a, b] of [['a2', 'a4'], ['h7', 'h6'], ['a4', 'a5'], ['h6', 'h5'], ['a5', 'a6'], ['h5', 'h4'], ['a6', 'b7'], ['h4', 'h3'], ['b7', 'a8']]) {
        await mover(page, a, b);
    }
    await expect(page.locator('#promotion-dialog')).toBeVisible();
    await sinFallosDeAccesibilidad(page);
    await page.locator('#promotion-dialog').getByRole('button', { name: 'Reina', exact: true }).click();
    await expect(casilla(page, 'a8')).toHaveAttribute('aria-label', 'a8, reina blanca');
});
