/* 
* Test Case: Product Search
*
* Tags : @master @regression
* 
* Steps:
* 1)Navigate to the app url
* 2)fill the product name in the search box 
* 3)click on the search button
* 4)verify wheter we navigated to the search results page
* 5)verify whether the product is in the list of displayed products
* 
*/

import {test,expect} from "@playwright/test";
// Import HomePage class from HomePage
import {HomePage} from "../pages/HomePage";
// Import SearchResults class from SearchResultsPage
import {SearchResults} from "../pages/SearchResultsPage";
// Import TestConfig class from test.config file
import {TestConfig} from "../test.config";

// Declare the shared variables for TestConfig, HomePage and SearchResults
let config: TestConfig;
let homepage: HomePage;
let searchresults:SearchResults;

// write the hook to navigate to the url and initialize the pages 
test.beforeEach(async({page})=>{
    // Initialize the config object from TestConfig class
    config= new TestConfig();
    // Navigate to the app url
    await page.goto(config.appUrl);

    // Initialize the homepage object from HomePage class
    homepage=new HomePage(page);
    // Initialize the searchresults object from the SearchResults class
    searchresults=new SearchResults(page);
})

// write the after each hook to clean up purpose
test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    // close the page 
    await page.close();
})

test("Product Search Test @master @regression", async()=>{
    test.slow();

    // fill the earch box with the product name 
    await homepage.searchTextBoxFill(config.productName);
    // click the search button
    await homepage.searchButtonClick();

    // verify whether search results page exists or not
    expect(await searchresults.isSearchResultsPageExists()).toBeTruthy();

    // a single line expection to check wheter the product exist or not
    // expect(await searchresults.isProductExists(config.productName)).toBeTruthy();

    // check whether the product exists or not
    const is_product_exists=await searchresults.isProductExists(config.productName);
    // Assert whether the product is in the list of products displayed 
    expect(is_product_exists).toBeTruthy();
});

