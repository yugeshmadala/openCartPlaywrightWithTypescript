import {Page, Locator} from "@playwright/test"

export class shoppingCartPage {
    private readonly page:Page 

    // Varibale declaration for Total price 
    private readonly totalPrice:Locator
    // Variable declaration for checkoutButton
    private readonly checkoutButton:Locator

    // constructor 
    constructor(page:Page)
    {
        this.page=page 
        // Locating the total price 
        this.totalPrice=this.page.locator("//div[@id='checkout-cart']//div[@class='col-sm-4 col-sm-offset-8']//td/strong[text()='Total:']//following::td")
        // Locating the checkout button
        this.checkoutButton=this.page.locator("//a[@class='btn btn-primary']")
        
    }

    // actions 

    // Method to get the total price 
    async getTotalPrice():Promise< string | null >
    {
        
       try{
        // getting the text content of total price
        return await this.totalPrice.textContent()
       }
       catch(error){
        console.log(`error occurred while getting the total price:${error}`)
        return null
       }
    }

    // Method to click the checkout button
    async clickCheckout():Promise <void>
    {
        // clicking the checkout button
        await this.checkoutButton.click()
    }

    // Method to chcek whether the page is loaded or not
    async isPageLoaded():Promise <boolean> 
    {
        try{
            // checking whether the checout button is visible or not 
            return this.checkoutButton.isVisible()
        }
        catch(error){
            return false
        }
    }


}

