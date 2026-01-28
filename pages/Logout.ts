import {test,expect,Locator,Page} from "@playwright/test"
// Importing HomePage class from HomePage
import {HomePage} from "../pages/HomePage"

export class Logoutpage{

    // Variable declaration
    private readonly page:Page
    // Declaring continue button
    private readonly continueButton:Locator

    // Constructor 
    constructor(page:Page)
    {
        this.page=page
        // Locating the continue button
        this.continueButton=this.page.locator("//a[@class='btn btn-primary']")
    }

    // actions 

    // Method to click the continue button
    async clickContinue():Promise<HomePage>
    {
        await this.continueButton.click()
        return new HomePage(this.page)
    }

    // Method to check whether the continue button is visible 
    async isContinueButtonVisible():Promise<boolean>
    {
        return await this.continueButton.isVisible()
    }
    
}