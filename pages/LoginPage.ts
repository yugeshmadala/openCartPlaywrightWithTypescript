import {Page,test,expect,Locator} from "@playwright/test"

export class LoginPage{

    // Variable declaration
    private readonly page:Page
    // Declaring email address
    private readonly textEmailAddress:Locator
    // Declaring password 
    private readonly textPasswrd:Locator
    // Declaring password
    private readonly loginButton:Locator
    // Declaring error message
    private readonly textErrorMessage:Locator

    // constructor
    constructor(page:Page){
        this.page=page
        // Locating email address
        this.textEmailAddress=this.page.locator("//input[@id='input-email']")
        // Locating password
        this.textPasswrd=this.page.locator("//input[@id='input-password']")
        // Locating login button
        this.loginButton=this.page.locator("//input[@type='submit']")
        // Locating error message
        this.textErrorMessage=this.page.locator("//div[@class='alert alert-danger alert-dismissible']")
    
    }

    // Actions 

    // Method to set email address
    async setEmail(email_address:string):Promise<void>
    {
        await this.textEmailAddress.fill(email_address)
    }

    // Method to set password
    async setPassword(password_text:string):Promise<void>
    {
        await this.textPasswrd.fill(password_text)
    }

    // Mthod to click login button
    async clickLoginButton():Promise<void>
    {
        await this.loginButton.click()
    }

    // Method to click the entire login 
    async login(email_address:string,password:string):Promise<void>
    {
        await this.setEmail(email_address)
        await this.setPassword(password)
        await this.clickLoginButton()
    }

    // Method to get the error message 
    async getLoginErrorMessage():Promise<null | string >
    {
        return (this.textErrorMessage.textContent())
    }


}

