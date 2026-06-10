import { test, expect } from "@playwright/test";

test("dashboard loads with property cards", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /property command center/i })).toBeVisible();
  await expect(page.locator("[data-testid='property-card']").first()).toBeVisible();
});

test("search navigates to property workspace", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-testid='property-card']").first().click();
  await expect(page).toHaveURL(/\/properties\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("property workspace renders all sections", async ({ page }) => {
  await page.goto("/properties/oakland-adu-expansion");
  for (const section of ["Overview", "Scenarios", "Assumptions", "Risks", "Report", "Sources"]) {
    await expect(page.getByRole("tab", { name: section })).toBeVisible();
  }
});

test("scenario switch updates 3D massing", async ({ page }) => {
  await page.goto("/properties/oakland-adu-expansion");
  const firstScenario = page.locator("[data-testid='scenario-tab']").first();
  const secondScenario = page.locator("[data-testid='scenario-tab']").nth(1);
  await firstScenario.click();
  const massingBefore = await page.locator("[data-testid='massing-3d']").innerHTML();
  await secondScenario.click();
  const massingAfter = await page.locator("[data-testid='massing-3d']").innerHTML();
  expect(massingBefore).not.toBe(massingAfter);
});

test("report export produces markdown download", async ({ page }) => {
  await page.goto("/properties/oakland-adu-expansion");
  await page.getByRole("tab", { name: "Report" }).click();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /export/i }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.md$/);
});
