import jwt from  'jsonwebtoken';

//If user  wants to like a post then...
//click the like button => auht middleware (next) => like controller...

//Do something and move on to the next step(middleware usecase)

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
  
      let decodedData;
  
      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, process.env.SECRET_KEY);
  
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
  
        req.userId = decodedData?.sub;
      }    
  
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
  export default auth;