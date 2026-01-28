import {test,expect,Locator} from "@playwright/test"

// import HomePage class from HomePage
import {HomePage} from "../pages/HomePage"
// import register class from Registrationpage
import {register} from "../pages/RegistrationPage"
// import RandomDataUtility class from randomDataGenerator
import {RandomDataUtility} from "../utils/randomDataGenerator"
// import TestConfig class from test.config
import {TestConfig} from "../test.config"

// making config, homepage and registration_page accessible globally
let config : TestConfig
let homepage: HomePage
let registration_page: register

// creating a before each hook to execute before each step
test.beforeEach(async({page})=>{
    // creating an instance for TestConfig
    config=new TestConfig()
    // Navigating to the URL
    page.goto(config.appUrl)
    // Creating an instance for HomePage 
    homepage=new HomePage(page)
    // Creating an instance for registration_page
    registration_page=new register(page)

})

// creating afterEach hook to execute after each test
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000)
    // closing the page after the action is performed 
    await page.close()
})

test("User registration test @master @sanity @regression",async({page})=>{
    test.slow()
    // click the MyAccount link
    await homepage.myAccountClick()
    // click the register link
    await homepage.registerClcik()
    
    // Filling the first name text box 
    await registration_page.firstNameFill(RandomDataUtility.getFirstName())
    // Filling the lastname textbox
    await registration_page.lastNameFill(RandomDataUtility.getLastName())
    // Filling the email textbox
    await registration_page.emailFill(RandomDataUtility.getEmail())
    // Filling the telephone textbox
    await registration_page.telephoneFill(RandomDataUtility.getPhoneNumber())

    // creating password variable to enter in the password and confirm password 
    const password= RandomDataUtility.getPassword()
    // Filling the password box
    await registration_page.passwordFill(password)
    // Filling the confirm password box
    await registration_page.confirmPasswordFill(password)
    // Checking the policy check box 
    await registration_page.policyCheckBox()
    // Clicking the continue button in the registration page 
    await registration_page.clickContinueButton()

    // getting the confirmation message
    const confirmation_message=await registration_page.getConfirmationMsg()
    // checking the confirmation message
    expect(confirmation_message).toContain("Your Account Has Been Created!")
})

