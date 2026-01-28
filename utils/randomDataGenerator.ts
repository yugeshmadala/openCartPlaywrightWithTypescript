import {faker} from "@faker-js/faker"

export class RandomDataUtility {

// method get random first names
static getFirstName() 
{
   return faker.person.firstName() 
}

// method get random last names 
static getLastName()
{
    return faker.person.lastName()
}

// method to get random full name
static getFullName()
{
    return faker.person.fullName()
}

// method to get random email
static getEmail()
{
    return faker.internet.email()
}

// method to get random phone number
static getPhoneNumber()
{
    return faker.phone.number()
}

// method to get random usernames 
static getUserName():string {
    return faker.internet.username()
}

// method to get random passwords
static getPassword():string {
    return faker.internet.password()
}

// method to get random countries 
static getRandomCountry():string {
    return faker.location.country()
}

// method to get random states 
static getRandomState():string {
    return faker.location.state()
}

// method to get random cities 
static getRandomCity():string {
    return faker.location.city()
}

// method to get random zip codes 
static getRandomzipCode():string {
    return faker.location.zipCode()
}

// method to get random address
static getRandomAddress():string {
    return faker.location.streetAddress()
}

// method to get random password 
static getRandomPassword(length: number=10): string {
    return faker.internet.password({length})
}

// method to get random alpha numeric 
static getRandomAlphaNumeric(length:number):string {
    return faker.string.alphanumeric(length)
}

// method to get random numeric 
static getRandomNumeric(length:number):string {
    return faker.string.numeric(length)
}

// method to get random uuid
static getRandomUUID():string {
    return faker.string.uuid()
}

}