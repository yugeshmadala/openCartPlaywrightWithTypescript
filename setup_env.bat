npm install
npm install -D allure-playwright
npx playwright install
npm install -g allure-commandline --force
npm run "%script%"
allure generate allure-results -o allure-report --clean

