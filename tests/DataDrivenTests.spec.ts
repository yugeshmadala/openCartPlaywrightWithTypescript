import {test,expect} from "@playwright/test"
// import HomePage class from HomePage
import {HomePage} from "../pages/HomePage"
// import LoginPage class from LoginPage
import {LoginPage} from "../pages/LoginPage"
// import MyAccountsPage from MyAccount
import {MyAccountsPage} from "../pages/MyAccount"
// import DataProvider class from dataprovider 
import {DataProvider} from "../utils/dataProvider"
// import TestConfig class from test.config
import {TestConfig} from "../test.config"

// Declaring json path variable 
const jsonpath="data/logindata.json"
// Getting data from json file
const jsondata=DataProvider.getDataFromJson(jsonpath)

for (const data of jsondata)
{
    test(`Data driven test for Login Data:${data.testName} @datadriven`,async({page})=>{
        test.slow()
        
        // creating an instance for TestConfig 
        const config= new TestConfig()
        // Navigating to the url
        await page.goto(config.appUrl)

        // creating an instance for homepage 
        const homepage=new HomePage(page)
        // clicking the my accounts button
        await homepage.myAccountClick()
        // clicking the login button
        await homepage.loginClick()

        // creating an instance for login page 
        const loginpage=new LoginPage(page)
        /* calling individual methods 
        await loginpage.setEmail(data.email);
        await loginpage.setPassword(data.password);
        await loginpage.clickLoginButton();
        */
        
        // calling single method to login 
        await loginpage.login(data.email,data.password)

        // condition to check the valid login and invalid login
        if (data.expected.toLowerCase()==='success')
        {
            // creating an instance for MyAccountsPage
            const myaccountpage= new MyAccountsPage(page);
            // Checking whether we logged in or not
            const is_loggedin= await myaccountpage.isMyAccountPageExists();
            expect(is_loggedin).toBeTruthy()
        }
        else 
        {
            // getting the error message for invalid login credentials from login page 
            const error_message=await loginpage.getLoginErrorMessage()
            // Asserting the error message 
            expect(error_message).toContain("Warning: No match for E-Mail Address and/or Password.")
        }

    })
}

// creating path varibale for csv file
const csv_filepath="data/logindata.csv"
// loading data from csv file 
const csvdata=DataProvider.getDataFromCSV(csv_filepath)

for (const data1 of csvdata)
{
    test(`Data driven test for login loading csv data: ${data1.testName} @datadriven`,async({page})=>{
        test.slow()

        // creating an instance for TestConfig 
        const config=new TestConfig()
        // Navigating to the URL 
        await page.goto(config.appUrl)

        // creating an instance for HomePage
        const homepage=new HomePage(page)
        // clicking on My Account link
        await homepage.myAccountClick()
        // clicking on the login link
        await homepage.loginClick()

        // creating an instance for login page 
        const loginpage=new LoginPage(page)
        // using a single method to login
        await loginpage.login(data1.email,data1.password)
        /* using individual methods to login
        await loginpage.setEmail(data1.email)
        await loginpage.setPassword(data1.password)
        await loginpage.clickLoginButton()
        */

        // condition to check whether valid login and invalid login 
        if (data1.expected.toLowerCase()==='success')
        {
            // creating an instance for MyAccountsPage
            const myaccountpage= new MyAccountsPage(page)
            // Checking whether we entered into the login page 
            const is_logged_into=await myaccountpage.isMyAccountPageExists()
            expect(is_logged_into).toBeTruthy()
        }
        else 
        {
            // getting the error message from login page 
            const error_message=await loginpage.getLoginErrorMessage()
            // Asserting the error message 
            expect(error_message).toContain("Warning: No match for E-Mail Address and/or Password.")
        }

    })
}





