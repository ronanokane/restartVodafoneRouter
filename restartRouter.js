const puppeteer = require("puppeteer-core");

(async ()=>{
    const browser = await puppeteer.launch({
       product: "chrome", executablePath: "/usr/bin/chromium",
       headless: true
   });

    const page = await browser.newPage();

    await page.goto('http://192.168.0.2/main.cgi?page=app.html#cat=status-and-support_restart');

    await page.waitForSelector('input[id=login_Password]');
    await page.waitForSelector('a[id="btn_login"]');
    await page.$eval('#login_Password', el => el.value = process.env.ROUTER_PASSWD);

    await page.click("#btn_login");

    await page.waitForSelector('a[id="btn_restart"]');
    await page.click("#btn_restart");

    await page.waitForSelector('a[id="popUp_RestartConfirmationMessage_Button_Apply"]');
    await page.click("#popUp_RestartConfirmationMessage_Button_Apply");

    console.log("router restarted...");
    await browser.close();

})();
