import jwt from "jsonwebtoken";


export const tokenathu = (req, res, next) => {
    const token = req.headers.authorization;
        if(!token) return res.status(404).json({message: "no token found"});
        jwt.verify(token, process.env.token_privite_code, (error, payload) => {
            if(error){
                return res.status(401).json({message: "token not veriefied or compelete"});
            };
        req.userinfo = payload
    });

    next()
}