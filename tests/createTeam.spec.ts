import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/loginPage";
import { TeamPage } from "../pageObject/teamPage";
const testData = require('../testData.json');
test("Create team Tests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const teamPage = new TeamPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.PerformLogin(testData.userEmail,testData.password);
  await teamPage.gotoTeamPage();
  await teamPage.createTeam('test','moustafa shoaib','email');
  await expect (teamPage.teamCreationMessage).toBeVisible();
});
