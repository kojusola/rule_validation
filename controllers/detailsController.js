exports.details = async (req, res, next) =>{
    try{
        return res.status(200).json({
            "message":"My Rule-Validation API",
            "status":"success",
            "data": {
                "name":"Fafemi Adeola",
                "github":"@kojusola",
                "email":"fafemiadeolas@gmail.com",
                "mobile":"09011539003",
                "twitter": "@fafemiadeola"
            }
        })
        
    }catch(error){
        return res.status(400).json({
            "status": "error",
            "data": null
        })
    }
}