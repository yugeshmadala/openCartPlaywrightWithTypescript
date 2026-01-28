import {test,Locator,Page,expect} from "@playwright/test"

export class register{

    // variable declaration
    private readonly page:Page 
    private readonly firstNameTextBox:Locator
    private readonly lastNameTextBox:Locator
    private readonly emailTextBox:Locator
    private readonly telephoneTextBox:Locator
    private readonly passwordTextBox:Locator 
    private readonly passwordConfirmTextBox:Locator
    private readonly policyCheck:Locator
    private readonly continueButton:Locator
    private readonly confirmationMessage:Locator

    // constructor 
    constructor(page:Page)
    {
        this.page=page
        this.firstNameTextBox=this.page.locator("//input[@name='firstname']")
        this.lastNameTextBox=this.page.locator("//input[@name='lastname']")
        this.emailTextBox=this.page.locator("//input[@name='email']")
        this.telephoneTextBox=this.page.locator("//input[@id='input-telephone']")
        this.passwordTextBox=this.page.locator("//input[@id='input-password']")
        this.passwordConfirmTextBox=this.page.locator("//input[@id='input-confirm']")
        this.policyCheck=this.page.locator("//input[@type='checkbox']")
        this.continueButton=this.page.locator("//input[@type='submit']")
        this.confirmationMessage=this.page.locator("//div[@id='content']/h1")

    }

    // actions 

    // method to fill first name
    async firstNameFill(fname:string): Promise<void> {
        await this.firstNameTextBox.fill(fname)
    }

    // method to fill last name 
    async lastNameFill(lname:string): Promise<void> {
        await this.lastNameTextBox.fill(lname)
    }

    // method to fill email
    async emailFill(email:string): Promise<void> {
        await this.emailTextBox.fill(email)
    }

    // method to fill telephone 
    async telephoneFill(telephoneNum:string): Promise<void> {
        await this.telephoneTextBox.fill(telephoneNum)
    }

    // method to fill password
    async passwordFill(password:string): Promise<void> {
        await this.passwordTextBox.fill(password)
    }

    // method to fill confirm password 
    async confirmPasswordFill(cpassword:string): Promise<void> {
        await this.passwordConfirmTextBox.fill(cpassword)
    }

    // method to check the policy
    async policyCheckBox(): Promise<void> {
        await this.policyCheck.check()
    }

    // method to click the continue button
    async clickContinueButton(): Promise<void> {
        await this.continueButton.click()
    }

    // method to get the confirmation message 
    async getConfirmationMsg(): Promise<string> {
        return await this.confirmationMessage.textContent() ?? '';
    }

    // method to get the complete registration on a flow
    async completeRegistration(userData: {
        fname:string,
        lname:string,
        email:string,
        telephone:string,
        password:string,
    }):Promise<void> {
        await this.firstNameFill(userData.fname)
        await this.lastNameFill(userData.lname)
        await this.emailFill(userData.email)
        await this.telephoneFill(userData.telephone)
        await this.passwordFill(userData.password)
        await this.confirmPasswordFill(userData.password)
        await this.policyCheckBox()
        await this.clickContinueButton()
        await expect(this.confirmationMessage).toBeVisible()
    }

}

