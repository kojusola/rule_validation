// conditions for the rule validation
exports.conditions =  (dataField,ruleCondition,ruleConditionValue) =>{
switch (ruleCondition){
    case "eq":
        if (dataField === ruleConditionValue){
            return true
        }
        break
    case "neq":
        if (dataField !==  ruleConditionValue ){
            return true
        }
        break
    case "gt":
        if (dataField >  ruleConditionValue ){
            return true
        }
        break
    case "gte":
        if (dataField >=  ruleConditionValue ){
            return true
        }
        break
    case "contains":
        if ((typeof(dataField) !== 'number' )&&(dataField.includes(ruleConditionValue))){
            return true
        } else  if ((typeof(dataField) === 'number' )&&((dataField+'').indexOf(ruleConditionValue)> -1)){
            return true
        }
        break
}

}
// validates the input to ensure the input and data fields
exports.inputValidation = (input) =>{
    if(!input.data){
        return {
            "missing":"data", 
            "bool":true
        }
    }else if(!input.rule){
        return {
            "missing":"rule", 
            "bool":true
        }
    }else if((Object.keys(input).length) !== 2){
        return {
            "missing":"rule", 
            "bool":false
        }
    }  
}
// validates the data field to ensure it's either an object/array/string
// if the data field is an object, it checks if the rule field is present.
// if the data field is an array, it checks if the rule field value is less than the length of the string
exports.dataValidation = (data,ruleField) =>{
    if ((typeof(data) !== 'object')&&(!Array.isArray(data))&&(typeof data !=="string")){
        return { 
            "bool":"true"
        }
    } else if ((!Array.isArray(data))&&(typeof data !=="string")&&(!data[ruleField])){
        return {
            "missing":`${ruleField}`, 
            "bool":"false"
        }
    } else if ((Array.isArray(data))&&((data.length) <= parseInt(ruleField))){
        return{
            "missing":`${ruleField}`, 
            "bool":"false" 
        }
    }

}
//  validates the rule field to ensure all fields are present and it is a type object.
exports.ruleValidation = (rule) =>{
    if ((typeof(rule) !== 'object')||(Array.isArray(rule))){
        return { 
            "bool":"false"
        }
    } else if ((!rule.field)){
        return {
            "missing":"field", 
            "bool":"true"
        } 
    }else if (!rule.condition){
        return {
            "missing":"condition", 
            "bool":"true"
        }
    }else if (!rule.condition_value){
        return {
            "missing":"condition_value", 
            "bool":"true"
        }
    }else if ((rule.condition =="eq")||(rule.condition =="neq")||(rule.condition =="gt")||(rule.condition =="gte")||(rule.condition =="contains")){
        return {
            "bool": "continue"
        }
    }else {
        return {
            "condition": `${rule.condition}`
        }
    }
};