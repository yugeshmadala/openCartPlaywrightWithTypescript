import fs from "fs"
import {parse} from "csv-parse/sync"
import { LoginTestData } from "../types/loginTestDataTypes"

export class DataProvider {

// static method to get the data from JSON 
static getDataFromJson(filePath:string):LoginTestData[]
{
    let data =JSON.parse(fs.readFileSync(filePath,'utf-8'))
    return data
}

// static method to get data from CSV 
static getDataFromCSV(filePath:string):LoginTestData[]
{
    let data=parse(fs.readFileSync(filePath,'utf-8'),{columns:true,skip_empty_lines:true}) as LoginTestData[]
    return data
}
}