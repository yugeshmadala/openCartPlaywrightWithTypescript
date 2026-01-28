import {test,expect,Locator,Page} from "@playwright/test"

export class HomePage {

    // Variable declaration
    private readonly page:Page
    private readonly myAccountLink:Locator
    private readonly registerLink:Locator
    private readonly loginLink:Locator
    private readonly textBoxSearch:Locator
    private readonly searchButton:Locator

    // Constructor 
    constructor(page:Page)
    {
        this.page=page 
        this.myAccountLink=this.page.locator("//a[@title='My Account']")
        this.registerLink=this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']/li[1]")
        this.loginLink=this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']/li[2]")
        this.textBoxSearch=this.page.locator("//input[@name='search']")
        this.searchButton=this.page.locator("//i[@class='fa fa-search']")
    }

    // actions 
    
    // method to check whether the home page exists or not
    async isHomePageExists():Promise<boolean>{
        let title:string=await this.page.title()
        if (title)
        {
            return true
        }
        return false 
    }
    
    // method to click the my account link 
    async myAccountClick():Promise<void>{
        try{
            await this.myAccountLink.click()
        }
        catch (error)
        {
            console.log(`Exception occured during the my account link click:${error}`)
            throw error
        }
    }

    // method to click the register link
    async registerClcik():Promise<void>{
        try{
            await this.registerLink.click()
        }
        catch(error)
        {
            console.log(`Exception occured during the register link click:${error}`)
            throw error
        }
    }

    // method to click the login link
    async loginClick():Promise<void>{
        try{
            await this.loginLink.click()
        }
        catch(error)
        {
            console.log(`Exception occured during the Login link click:${error}`)
            throw error 
        }
    }

    // method to fill the search box 
    async searchTextBoxFill(productName:string):Promise<void>{
        try{
            await this.textBoxSearch.fill(productName)
        }
        catch(error)
        {
            console.log(`Exception occured during the serach text box fill:${error}`)
            throw error
        }
    }

    // method to click the search button
    async searchButtonClick():Promise<void>{
        try {
            await this.searchButton.click()
        }
        catch(error)
        {
            console.log(`Exception occured during the search text button click:${error}`)
            throw error
        }
    }
}