import {Page,Locator, expect} from "@playwright/test"
// import shoppingCartPage from ShoppingCartPage 
import {shoppingCartPage} from "../pages/ShoppingCartPage"
import test from "node:test";

export class ProductPage{

    // variable decalartion
    private readonly page:Page;
    // decalartion of inputQuantity variable
    private readonly inputQuantity:Locator
    // declaration of addToCartButton variable
    private readonly addToCartButton:Locator
    // declaration of addConfirmationMsg variable
    private readonly addConfirmationMsg:Locator
    // declaration of itemsButton varaible
    private readonly itemsButton:Locator
    // declaration of linkViewCart varaible 
    private readonly linkViewCart:Locator


    // constructor 
    constructor(page:Page)
    {
        this.page=page
        // Locating inputQuantity text box
        this.inputQuantity=this.page.locator("//input[@id='input-quantity']")
        // Locating add to acrt button
        this.addToCartButton=this.page.locator("//button[@id='button-cart']")
        // Locating confirmation message
        // this.addConfirmationMsg=this.page.locator("//div[@class='alert alert-success alert-dismissible']")
        this.addConfirmationMsg = this.page.locator(".alert-success");
        // Locating the items button
        this.itemsButton=this.page.locator("//div[@id='cart']")
        // Locating linkViewCart button
        this.linkViewCart=this.page.locator('strong:has-text("View Cart")');

    }

    // actions 

    // Method to fill the input quantity
    async inputQuantityFill(qty:string):Promise<void>
    {
        // clearing the existing input quantity 
        await this.inputQuantity.fill('')
        // Filling the inputQunatity with qty parameter
        await this.inputQuantity.fill(qty)
    }

    // Method to add a product to the cart
    async addToCartClick():Promise<void>
    {
        // clicking the add to cart button
        // await this.page.waitForSelector("//button[@id='button-cart']", {timeout:2000})
        expect(this.addToCartButton.isVisible).toBeTruthy();
        await this.page.waitForTimeout(1000);
        await this.addToCartButton.click();
        //await this.page.waitForSelector("//div[@class='alert alert-success alert-dismissible']")
        await this.page.waitForTimeout(1000










            
        )
        const text = await this.getMessageConformation();
        await console.log("text"+text)
    }

    // Method to check whether we got the confirmation message or not
    async getMessageConformation():Promise<boolean>
    {
        try
        {
            await this.addConfirmationMsg.waitFor({timeout:5000})
            return await this.addConfirmationMsg.isVisible()
        }
        catch(error)
        {
            console.log(`Confirmation message not found: ${error}`);
            return false

        }
    }

    // Method to get the items 
    async getItemsLink():Promise<void>
    {
        // clicking on the items link
        await this.itemsButton.waitFor({state:'visible'})
        await this.itemsButton.click()
    }

    // Method to click the view cart button
    async clickViewCart():Promise<shoppingCartPage>
    {
        // clicking on the view cart link
        await this.linkViewCart.click()
        // returning an instance of the shopping cart page 
        return new shoppingCartPage(this.page)
    }

    // single method to add product to cart 
    async addProductToCart(qty:string):Promise<void>
    {
        await this.inputQuantityFill(qty)
        await this.addToCartClick()
        await this.getMessageConformation()
    }


}
