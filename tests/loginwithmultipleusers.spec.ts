import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { MyAccountsPage } from "../pages/MyAccount";
import { TestConfig } from "../test.config"

let homepage : HomePage;
let loginpage : LoginPage;
let myAccountsPage : MyAccountsPage;
let config : TestConfig;

const login = [
    { username: "yugeshyogi972@gmail.com", password: "Yugesh@123" },
    { username: "example123@gmail.com", password: "12345678" },
];


login.forEach((log) => {
        test.describe.parallel(`login with user ${log.username}`, () => {


         test(`login test ${log.username}`, async ({page}) => {
           test.slow()

           config = new TestConfig()
           await page.goto(config.appUrl)

           homepage = new HomePage(page)
           loginpage = new LoginPage(page)
           myAccountsPage = new MyAccountsPage(page)
           await homepage.myAccountClick()
           await homepage.loginClick()

           await loginpage.login(log.username,log.password)

           const is_logged=await myAccountsPage.isMyAccountPageExists()
           console.log("is logged:",is_logged)
           if (is_logged)
           {
            console.log("Credentails are correct")
            console.log(`${log.username} and ${log.password}`)
           }
           else
           {
            console.log("Credntails are incorrect")
            console.log(`${log.username} and ${log.password}`)
            
           }


            
         });


      });
 });

