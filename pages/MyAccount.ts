import { Page, Locator, expect } from '@playwright/test';
// Import Logoutpage 
import { Logoutpage } from '../pages/Logout'; 

export class MyAccountsPage{

    // variable declaration
    private readonly page:Page
    // declaring variable for getting the message header
    private readonly MyAccountMsgHeading:Locator
    // Varibale declaration for logout link
    private readonly LinkLogout:Locator

    // constructor
    constructor(page:Page)
    {
        this.page=page
        // Locating the My Account Message Heading
        this.MyAccountMsgHeading=this.page.locator("//div[@id='content']/h2[text()='My Account']")
        // Locating the Logout Link
        this.LinkLogout=this.page.locator("//div[@class='list-group']/a[13]")
    }

    // actions 

    // Method to check whether the account page exists or not
    async isMyAccountPageExists():Promise<boolean> {
        try {
            // getting the message heading and returning the same 
            const isVisible=await this.MyAccountMsgHeading.isVisible()
            return isVisible;
        }
        catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
         }
    }

    async clickLogout():Promise<Logoutpage>{
        try{
            // clicking on the logout link
            await this.LinkLogout.click()
            // Return an instance of lofoutpage 
            return new Logoutpage(this.page)
        }
        catch (error) {
            console.log(`Unable to click Logout link: ${error}`);
            throw error
        }
    }

    // alternate method to check the my account page by getting the title of the page 
    async getPageTitle():Promise<string>{
        return (this.page.title())
    }
}
