const express = require("express")


const app = express();

app.use(express.json());

const details = require("./routes/detailsRouter")
const ruleValidation = require("./routes/ruleValidationRouter")

app.use('/',details);
app.use('/validate-rule',ruleValidation);

PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server has started")
});