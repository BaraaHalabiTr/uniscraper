const puppeteer = require('puppeteer');

//get username
exports.login = async (req, res) => {
    const browser = await puppeteer.launch({ handless: true });
    const page = await browser.newPage();

    //navigates to the websites login page
    await page.goto(process.env.URL);
    
    //fills the login credentials
    await page.type('[name="lognForm:j_idt14"]', req.body.username);
    await page.type('[name="lognForm:j_idt21"]', req.body.password);

    //sets the language to english
    await page.evaluate(() => document.getElementById('lognForm:j_idt24:0').setAttribute('checked', ''));

    //clicks the login button
    await page.click('[name="lognForm:j_idt29"]');

    await page.waitForNavigation();

    //scraping
    const user = await page.evaluate(() => {
        let data = new Array();
        document.getElementsByTagName('ul')[16].querySelectorAll('li > span + span').forEach(el => data.push(el.innerHTML));

        let user = {};

        user.id = data[0].trim();
        user.name = data[1].trim().replace('  ', ' ');
        user.faculty = data[3].trim().replace('&amp; ', '');
        user.major = data[4].trim();
        user.status = data[5].trim();
        user.gpa = parseFloat(document.getElementsByClassName('knob')[0].innerHTML);

        return user;
    });

    res.send(user);
}

