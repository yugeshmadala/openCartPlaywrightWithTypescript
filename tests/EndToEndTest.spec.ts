import {test,expect,Page} from "@playwright/test"

// Import TestConfig class from test.config file
import { TestConfig } from "../test.config";
// Import HomePage class from HomePage
import { HomePage } from "../pages/HomePage";
// Import LoginPage class from LoginPage
import { LoginPage } from "../pages/LoginPage";
// Import MyAccountsPage class from MyAccount
import { MyAccountsPage } from "../pages/MyAccount";
// Import ProductPage class from ProductPage
import { ProductPage } from "../pages/ProductPage";
// Import SearchResults class from SearchResultsPage
import { SearchResults } from "../pages/SearchResultsPage";
// Import shoppingCartPage class from ShoppingCartPage
import { shoppingCartPage } from "../pages/ShoppingCartPage";
// Import RandomDataUtility class from RandomDataGenerator
import { RandomDataUtility } from "../utils/randomDataGenerator";
// Import register class from RegistrationPage
import { register } from "../pages/RegistrationPage"
import { Logoutpage } from "../pages/Logout";


test("End to End test flow execution @endtoend",async({page})=>{
    test.slow();

    // Creating an instance of TestConfig
    const config = new TestConfig();
    // Navigating to the page URL
    await page.goto(config.appUrl);

    // Calling performRegistration function to return the registered_email
    let registered_email:string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Calling performLogout function to logout from the page 
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Calling performLogin function to login using the regsitered email and password
    await performLogin(page,registered_email);
    console.log("✅ Login is completed!");

    // Calling addProductToCart function to add product to cart
    await addProductToCart(page);
    console.log("✅ Product added to cart!");

    // Calling verifyCartDetails function to verify whether the product is added to page 
    await verifyCartDetails(page);
    console.log("✅ Shopping cart verification completed!")

    // Step 6: Perform checkout (skipped for demo site)
    // await performCheckout(page);

})


// function to register a new account
async function performRegistration(page:Page):Promise<string>
{
    // Create an instance of HomePage
    const homepage = new HomePage(page)
    // Click the My Account link 
    await homepage.myAccountClick();
    // Click the register link
    await homepage.registerClcik();

    // Create an instance of register page
    const registrationpage = new register(page);
    // Fill the first name using RandomDataUtility
    await registrationpage.firstNameFill(RandomDataUtility.getFirstName());
    // Fill the last name using RandomDataUtility
    await registrationpage.lastNameFill(RandomDataUtility.getLastName());

    // Storing the email generated from RandomDataUtility in email variable
    const email = RandomDataUtility.getEmail();
    // Fill the email in registartion page 
    await registrationpage.emailFill(email);

    // Fill the telephone in registration page using RandomDataUtility
    await registrationpage.telephoneFill(RandomDataUtility.getPhoneNumber());
    // Fill the password in registartionpage
    await registrationpage.passwordFill("Test123");
    // Fill the confirm password in registartionpage
    await registrationpage.confirmPasswordFill("Test123");
    // Check the policy check 
    await registrationpage.policyCheckBox();
    // Click the continue button
    await registrationpage.clickContinueButton();

    // Check the confirmation message 
    const confirmation_message = await registrationpage.getConfirmationMsg();
    expect(confirmation_message).toContain("Your Account Has Been Created!");

    // return the registered email
    return email;
}

// function to logout the current user 
async function performLogout(page:Page) {
    // Create an instance of MyAccountsPage
    const myAccount = new MyAccountsPage(page);

    const logoutpage = await myAccount.clickLogout();

    // Check whenther the logoutpage is visible or not
    expect(await logoutpage.isContinueButtonVisible()).toBeTruthy();

    // getting the homepage after click the continue in logout page
    const homepage = await logoutpage.clickContinue();

    // check whether the home page exists after getting logout
    expect(await homepage.isHomePageExists()).toBeTruthy();
};

// function to login with registered email
async function performLogin(page:Page,email:string)
{
    // creating an instance of TestConfig
    const config = new TestConfig();
    // Navigating to the page url
    await page.goto(config.appUrl);

    // Creating an instance of HomePage
    const homepage = new HomePage(page);
    // click My Account link 
    await homepage.myAccountClick();
    // Click the login link
    await homepage.loginClick();

    // create an instance of loginpage 
    const loginpage = new LoginPage(page);
    // login using the email and password
    await loginpage.login(email,"Test123");

    // create an instance of myAccountPage
    const myAccountPage = new MyAccountsPage(page)
    // Check whether the myAccountPage exists or not
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy()
}

// function to search for a product and add that to cart
async function addProductToCart(page:Page)
{
    // create an instance of HomePage
    const homepage = new HomePage(page)
    // create an instance of TestConfig
    const config = new TestConfig()

    // storing the product_name and product_quantity from config file
    const product_name = config.productName
    const product_quantity = config.productQuantity

    // Fill the searchbox in homepage
    await homepage.searchTextBoxFill(product_name)
    // Click the search button 
    await homepage.searchButtonClick()

    // create an instance of SearchResults page 
    const searchresults = new SearchResults(page)
    // Check whether the searchresults page exists or not 
    expect(await searchresults.isSearchResultsPageExists()).toBeTruthy()
    // Check whether the product exists or not
    expect(await searchresults.isProductExists(product_name)).toBeTruthy()
    // select the product from the searchresults page 
    await searchresults.selectProduct(product_name)

    // create an instance of products page 
    const productspage = new ProductPage(page)
    /*await productspage?.inputQuantityFill(product_quantity)
    await productspage?.addToCartClick()
    */
   // add products to the cart
    await productspage.addProductToCart(product_quantity);

    // await page.waitForTimeout(3000)

    // check whether the confirmation message is displayed or not
    expect(await productspage.getMessageConformation()).toBe(true)

}

// function to verify the shopping cart details 
async function verifyCartDetails(page:Page)
{
    // create an instance of productpage
    const products = new ProductPage(page)
    // get the items link from the products page 
    await products.getItemsLink()
    // display the click view cart
    await products.clickViewCart()
    console.log("🛒 Navigated to shopping cart!");
    // create an instance of shoppingCartPage
    const shoppingpage = new shoppingCartPage(page)
    // create an instance of TestConfig
    const config = new TestConfig()

    // check whether the Total price in the cart page is equal to the total price in the config file 
    expect(await shoppingpage.getTotalPrice()).toBe(config.totalPrice)
}

// Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.
    // Place your checkout flow logic here if backend is available.
}






