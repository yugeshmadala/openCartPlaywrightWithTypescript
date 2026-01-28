import {test,expect,Locator,Page} from "@playwright/test";
// Import TestConfig class from test config
import {TestConfig} from "../test.config";
// Import HomePage class from HomePage
import {HomePage} from "../pages/HomePage";
// Import LoginPage class from LoginPage
import {LoginPage} from "../pages/LoginPage";
// Import MyAccountPage class from MyAccount
import {MyAccountsPage} from "../pages/MyAccount";

// Making all classes accesible globally
let config: TestConfig;
let homepage: HomePage;
let loginpage: LoginPage;
let myAccountPage: MyAccountsPage;

// creating beforeach hook for TestConfig, navigating to URL, opening homepage, loginpage and my Account page 
test.beforeEach(async({page})=>{
    // creating an instance of TestConfig
    config = new TestConfig();
    // Navigating to the app url
    await page.goto(config.appUrl);

    // creating an instance of HomePage
    homepage = new HomePage(page);
    // Creating an instance of LoginPage
    loginpage = new LoginPage(page);
    // Creating an instance of MyAccountPage
    myAccountPage = new MyAccountsPage(page);
})

// Creating after each hook to close the page 
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    // closing the page 
    await page.close();
})

test("User login, test @master @sanity @regression",async()=>{

    // clicking the My Account button
    await homepage.myAccountClick();
    // clicking the login button
    await homepage.loginClick();

    // enter the email address
    await loginpage.setEmail(config.email);
    // enter the password 
    await loginpage.setPassword(config.password);
    // clicking the login button
    await loginpage.clickLoginButton();

    // Checking whther we have logged in or not 
    const isLoggedInto= await myAccountPage.isMyAccountPageExists();
    expect(isLoggedInto).toBeTruthy();
})

