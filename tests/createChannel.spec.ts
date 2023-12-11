import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/loginPage";
import { ChannelPage } from "../pageObject/ChannelPage";

const testData = require('../testData.json');

test("Create Custom Channel tests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const channelPage = new ChannelPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.PerformLogin(testData.userEmail,testData.password);
  await channelPage.gotoCustomChannelPage();
  await channelPage.ConnectCutomChannel();
  await channelPage.EnterChannelDetails("Channel Name");
  const customHeaders = {
    'Authorization': 'Bearer '+testData.APIToken ,
    'Content-Type': 'application/json',
    'accept':'application/json'
  };
  await channelPage.sendNotificationApiCall("LhXu9ayXakiVcv7UuX6UuZoj4",customHeaders)
});
