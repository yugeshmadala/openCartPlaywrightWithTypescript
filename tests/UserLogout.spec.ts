/* 
* Test Case : User Logout
* 
* Tags : @master @regression
* 
* Steps:
* 1)Navigate to the Homepage
* 2)Click on the My Account button and then click on login button
* 3)Perform the login operation in the login page with valid credntials 
* 4)Check whether we are in the My Accounts page 
* 5)Click on the logout link in the My Accounts page
* 6)Verify whether we are in the logout page 
* 7)Click on the continue button 
* 8)Verify whether we are in the home page 
* 
*/

// Import necessary libraries 
import {test,expect} from "@playwright/test"
// Import HomePage class from HomePage
import {HomePage} from "../pages/HomePage"
// Import LoginPage class from LoginPage
import {LoginPage} from "../pages/LoginPage"
// Import MyAccountsPage class from MyAccount
import {MyAccountsPage} from "../pages/MyAccount"
// Import Logoutpage class from Logout
import {Logoutpage} from "../pages/Logout"
// Import TestConfig class from test config
import {TestConfig} from "../test.config"

// Declare shared variables for HomePage, LoginPage, MyAccountsPage, Logoutpage and TestConfig
let homepage: HomePage
let loginpage: LoginPage
let MyAccountspage: MyAccountsPage
let logoutpage: Logoutpage
let config: TestConfig

// Creating before each hook to initialize the pages and navigate to url 
test.beforeEach(async({page})=>{
    // initialize the Test Config
    config= new TestConfig()
    // Navigate to the app url
    await page.goto(config.appUrl)

    // Initialize HomePage, LoginPage, MyAccountsPage,LogoutPage
    homepage= new HomePage(page)
    loginpage= new LoginPage(page)
    MyAccountspage=new MyAccountsPage(page)
    logoutpage=new Logoutpage(page)

})

// Create after each hook to close the page i.e to clean up after each test
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000)
    // close the page 
    await page.close()
})

// 
test("User logout @master @regression",async()=>{
    test.slow()

    // Navigate to the homepage
    await homepage.myAccountClick()
    // Click the login link in home page 
    await homepage.loginClick()

    // Perform login operation by passing email and password from test config file
    await loginpage.login(config.email,config.password)

    // Verify whether we are in the Accounts page or not
    expect(await MyAccountspage.isMyAccountPageExists()).toBeTruthy()

    // Click on the logout link in the MyAccountspage
    await MyAccountspage.clickLogout()

    // Verify whether we are in the logout page or not
    expect(await logoutpage.isContinueButtonVisible()).toBeTruthy()
    // click on the continue button in the logout page
    await logoutpage.clickContinue()

    // Verify whether we are in the home page or not
    expect (await homepage.isHomePageExists()).toBeTruthy()

})
