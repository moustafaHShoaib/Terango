import { expect, type Locator, type Page } from "@playwright/test";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const testData = require('../testData.json');
export class ChannelPage {
  readonly page: Page;
  readonly connect_Custom_ChannelButton: Locator;
  readonly channelInternalNameField: Locator;
  readonly createChannelButton: Locator;
  readonly ChannelCreationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connect_Custom_ChannelButton = page.getByLabel(
      "Connect Custom channel"
    );
    this.channelInternalNameField = page.locator(".form-control").first();

    this.createChannelButton = page.getByRole("button", {
      name: "Create channel",
    });
    this.ChannelCreationMessage = page.locator(".growls-tc", {
      hasText: "The channel has been created successfully.",
    });
  }

  async gotoCustomChannelPage() {
    await this.page.goto("https://app.trengo.com/admin/channels2/custom");
    await this.page.waitForLoadState();
  }

  async ConnectCutomChannel() {
    await this.connect_Custom_ChannelButton.isVisible();
    await this.connect_Custom_ChannelButton.click();
    await this.page.waitForLoadState();
    await expect(this.page).toHaveURL(
      "https://app.trengo.com/admin/channels2/custom/create"
    );
  }

  async EnterChannelDetails(channelName:string) {
    await this.channelInternalNameField.click();
    await this.channelInternalNameField.fill(channelName);
    await this.createChannelButton.click();
    await this.page.waitForLoadState();
    await expect(this.page).toHaveURL(new RegExp('.*https://app.trengo.com/admin/channels2/custom/.*'));
  }

  async sendNotificationApiCall(channelIdentifier:string,headers?: Record<string, string>): Promise<AxiosResponse> {
    try {
      let endpoint='https://app.trengo.com/api/v2/custom_channel_messages'
      const config: AxiosRequestConfig = {
        headers: headers || {},  // Pass the provided headers or an empty object
      };
      
      const response = (await axios.post(endpoint,config))
      .data({
        "contact": {
          "identifier": "custom-abdtfdrbdordo"
        },
        "body": {
          "text": "test"
        },
        "channel": channelIdentifier
      })
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error(`API call failed: ${error}`);
    }
  }
}
