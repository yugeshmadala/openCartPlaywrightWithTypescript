import {test,expect,Locator,Page} from "@playwright/test"
import {ProductPage} from "../pages/ProductPage"

export class SearchResults{

    // varibale declaration
    private readonly page:Page;
    // decalartion of varibale for page header
    private readonly SearchPageHeader:Locator
    // decalaration of varibale for search products
    private readonly SearchProducts:Locator

    // constructor 
    constructor(page:Page)
    {
        this.page=page;
        // locating the search page header
        this.SearchPageHeader=this.page.locator("//div[@id='content']/h1")
        // locating the search products
        this.SearchProducts=this.page.locator("//div[@class='caption']/h4/a")
    }

    // actions 

    // Method to check whether the search results page is visible or not
    async isSearchResultsPageExists():Promise<boolean>
    {
        try
        {
            // getting the header text for search page 
            const headertext=await this.SearchPageHeader.textContent()
            // checking whether the header text constins search-
            return headertext?.includes("Search -") ?? false
        }
        catch(error)
        {
            return false
        }
    }

    // Method to check whether the product exists or not
    async isProductExists(productName:string):Promise<boolean>
    {
        try
        {
            // counting the number of products for the search
            const count=await this.SearchProducts.count()
            // iterating over each product
            for (let i=0;i<count;i++)
            {
                // getting each product
                const product=this.SearchProducts.nth(i)
                // getting the title of each product
                const title=await product.textContent()
                // comparing the title of the product to the product name 
                if (title && title.toLowerCase()===productName.toLowerCase())
                {
                    return true 
                }

            }
        }
        catch(error)
        {
            console.log(`Error occurred while checking the product:${error}`)
        }
        return false
    }

    // Method to select product from list of products
    async selectProduct(product_name:string):Promise<ProductPage | null>
    {
        try
        {
            // getting the count of number of products for the search
            const count=await this.SearchProducts.count()
            // Iterating over each product
            for(let i=0;i<count;i++)
            {
                // getting each product
                const product=this.SearchProducts.nth(i)
                // getting the title of each product
                const title=await product.textContent()
                // checking whether the title is equal to product name
                if (title && title.toLowerCase()===product_name.toLowerCase())
                {
                    // clicking on the product link
                    await product.click()
                    //  returning an instance of the product  page 
                    return new ProductPage(this.page)
                }
            }
        console.log(`Product not found:${product_name}`)
        }
        catch(error)
        {
            console.log(`Error occurred while clicking on the product:${error}`)
        }
        return null;
    }

    // Method to get the count of number of products 
    async getProductsCount():Promise<number>
    {
        // returing the count of number of products
        return await this.SearchProducts.count()
    }

        
}




