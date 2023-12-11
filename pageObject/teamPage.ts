import { expect, type Locator, type Page } from "@playwright/test";

export class TeamPage {
  readonly page: Page;
  readonly createTeamButton: Locator;
  readonly createTeamDialog: Locator;
  readonly teamName: Locator;
  readonly teamMembers: Locator;
  readonly channels: Locator;
  readonly saveTeamButton: Locator;
  readonly teamCreationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createTeamButton = page.getByRole("button", {
      name: "Create a team",
    });

    this.createTeamDialog = page.getByRole("dialog");
    this.teamName = page.getByPlaceholder("Sales Team");
    this.teamMembers = page.getByPlaceholder("Select one or more users");
    this.channels = page.getByPlaceholder("Select one or more channels");
    this.saveTeamButton = page.locator(".md", { hasText: "Create team" });
    this.teamCreationMessage = page.locator(".growl-large", {
      hasText: "Team created successfully",
    });
  }

  async gotoTeamPage() {
    await this.page.goto("https://app.trengo.com/admin/teams");
    await this.page.waitForLoadState();
  }

  async createTeam(teamName: string, teamMember: string, channel: string) {
    await this.gotoTeamPage();
    await this.createTeamButton.click();
    await expect(this.createTeamDialog).toBeVisible({ timeout: 2000 });
    await this.teamName.click();
    await this.teamName.fill(teamName);
    await this.teamMembers.click();
    await this.teamMembers.fill(teamMember);
    await this.teamMembers.press("Enter");
    await this.channels.click();
    await this.channels.fill(channel);
    await this.channels.press("Enter");
    await this.saveTeamButton.click();
  }
}
