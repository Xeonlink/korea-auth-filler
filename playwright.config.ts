import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "null",
  outputDir: ".playwright",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // BaseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/!(yeskey).spec.ts",
    },
    // {
    //   name: "no check",
    //   use: { ...devices["Desktop Chrome"] },
    //   testMatch: "**/yeskey.spec.ts",
    // },
    // {
    //   Name: "firefox",
    //   Use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   Name: "webkit",
    //   Use: { ...devices["Desktop Safari"] },
    // },
  ],
});
