const admin = false

export const auth = (req, res, next) =>{
    if (!admin){
        return res.status(401).json({
            msg:'No Autorizado'
        })
    }
    next();
}