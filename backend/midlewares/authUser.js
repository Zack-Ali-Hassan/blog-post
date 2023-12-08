import jwt from 'jsonwebtoken';
export const userAuthentication =(req, res, next)=>{
   try {
    const token =req.cookies.token;
    if(!token){
        return res.status(403).send("do not allow to create post")
    }

    const jwt_secret ="abdh3jdkakjdeid";
    const decode =jwt.verify(token, jwt_secret);
    req.user =decode;
    next();
   } catch (error) {
    console.log("Error verifying user :", error)
   }
}