/**
 * Test Case : Add product to cart
 * 
 * Tags : @master @Regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Click on the My Account link in the Home page 
 * 3) Click on the login button
 * 4) Perform the login operation from the login page 
 * 5) Verify whether we are in the My Accounts page
 * 6) Enter the product in the search text box and click the search button
 * 7) Verify whether we are in the search results page 
 * 8) Check whether the product is in the list of the products 
 * 9) select the product matching the product name 
 * 10) Fill the quantity in the products page
 * 11) click on the add to cart button
 * 12) verify the message confirmation
 */

import { test, expect } from "@playwright/test";
// Import HomePage class from the HomePage
import { HomePage } from "../pages/HomePage";
// Import LoginPage class from LoginPage
import { LoginPage } from "../pages/LoginPage"
// Import MyAccountsPage class from MyAccount
import { MyAccountsPage } from "../pages/MyAccount";
// Import SearchResults class from SearchResultsPage
import { SearchResults } from "../pages/SearchResultsPage";
// Import TestConfig class from test.config
import { TestConfig } from "../test.config";
// Import ProductPage class from ProductPage
import { ProductPage } from "../pages/ProductPage";

// Declaring shared variables
let config : TestConfig;
let homepage : HomePage;
let loginpage : LoginPage;
let myaccountspage : MyAccountsPage;
let searchresults: SearchResults;
let products: ProductPage;

// write before each hook to navigate to the url and initialize the instances 
test.beforeEach(async({page})=>{
    // Initialize the TestConfig 
    config = new TestConfig();
    //Navigate to the app url
    await page.goto(config.appUrl);

    // Initialize the HomePage 
    homepage = new HomePage(page);
    // Initailize the LoginPage
    loginpage = new LoginPage(page);
    // Initialize the MyAccountsPage
    myaccountspage = new MyAccountsPage(page)
    // Initialize the searchresults page 
    searchresults = new SearchResults(page);
    // Initialize the products page
    products = new ProductPage(page);
})

// write the afterEach hook to clean up activities 
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    // close the page 
    await page.close();
})

test("Add product to cart test @master @regression", async()=>{
    test.slow();

    // click the My Account button in the HomePage
    await homepage.myAccountClick()
    // click on the login link in the HomePage
    await homepage.loginClick()

    // perform the login operation from the login page
    await loginpage.login(config.email,config.password)

    // Verify whether my accounts page exists or not
    expect(await myaccountspage.isMyAccountPageExists()).toBeTruthy()

    // Enter the product name in the search box 
    await homepage.searchTextBoxFill(config.productName)
    // Click the search Button
    await homepage.searchButtonClick()

    // verify whether the search results page exists or not
    expect(await searchresults.isSearchResultsPageExists()).toBeTruthy()

    // variable declaration from product name 
    const product = config.productName
    // check whether the product exists or not
    const is_product_exists = await searchresults.isProductExists(product)
    // Assert whether the product exists or not
    expect(is_product_exists).toBeTruthy()

    // If the product exists, then select the product and add to cart
    if (await searchresults.isProductExists(product))
    {
        // select the product with the searched product name 
        await searchresults.selectProduct(product)
        // enter the quanity in the products page 
        await products.inputQuantityFill(config.productQuantity)
        // clcik on the add to cart in the products page 
        await products.addToCartClick()

        // verify whether we get the message confirmation 
        expect(await products.getMessageConformation()).toBeTruthy()
    }


})