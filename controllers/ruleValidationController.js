const{conditions,inputValidation,dataValidation,ruleValidation} = require('../utils/conditions');

exports.ruleValidation = exports.details = async (req, res) =>{
    try{
    const input = req.body;
    const data = input.data
    const rule = input.rule
    // validate the input
    validateInput = await inputValidation(input);
    if(validateInput){
    if (validateInput.bool){
        return res.status(400).json({
            "message": `${validateInput.missing} is required.`,
            "status":"error",
            "data": null
        });
    }else if (!validateInput.bool){
        return res.status(400).json({
            "message": "Invalid JSON payload.",
            "status":"error",
            "data": null
        })
    }
}
// validate the rule field
    const validateRule = await ruleValidation(rule);
    if (validateRule){
        if(validateRule.bool === "true"){
            return res.status(400).json({
                "message": `${validateRule.missing} is missing from rule.`,
                "status":"error",
                "data": null
            });
        }else if(validateRule.bool ==="false"){
            return res.status(400).json({
            "message": "rule should be an object.",
            "status":"error",
            "data": null
        })
        }else if(validateRule.condition){
            return res.status(400).json({
            "message": `${validateRule.condition} is not one of the rule conditions listed.`,
            "status":"error",
            "data": null
        })
    }
    }
// validate the data field
    const validateData = await dataValidation( data, rule.field);
    if(validateData){
        if(validateData.bool === "true"){
         return res.status(400).json({
            "message": "data should be an object|array|string.",
            "status":"error",
            "data": null
        })
    }else if (validateData.bool === "false"){
        return res.status(400).json({
            "message": `field ${validateData.missing} is missing from data.`,
            "status":"error",
            "data": null
        })
    }
    }
    // Rule validation 
    const result = await conditions(data[rule.field],rule.condition,rule.condition_value);
    if (result){
        return res.status(200).json({
        "message":`field ${rule.field} successfully validated.`,
        "status": "success",
        "data": {
            "validation":{
                "error": false,
                "field":`${rule.field}`,
                "field_value":data[rule.field],
                "condition": `${rule.condition}`,
                "condition_value":rule.condition_value
            }
        }
        })
    } else if (!result){
        return res.status(400).json({
        "message":`field ${rule.field} failed validation.`,
        "status": "error",
        "data": {
            "validation":{
                "error": true,
                "field":`${rule.field}`,
                "field_value":`${data[rule.field]}`,
                "condition": `${rule.condition}`,
                "condition_value":`${rule.condition_value}`
            }
        }
        })
    }

} catch(error){
    return res.status(500).json({
        "message":"internal server error.",
        "status":"error",
        "data": null
    })
}
};
        