let jwt = require('jwt-simple');
let secret = "wangyy";
let time = 10;
module.exports = { 
  validate: function(req, res, next) { 
    let token = req.body.token || req.headers["xssToken"];
    if(token){ 
      let decodeToken = null;
      try { //防止假冒token解析報錯 
        decodeToken = jwt.decode(token,secret,'HS256'); 
      } catch (err) { 
        res.status(401).send("非法访问"); return; 
      } 
      let exp = decodeToken.exp;
      if(!exp){
        res.status(401).send("非法访问");
      }
      let now = new Date().getTime();
      if(exp > (now + time * 60 * 1000)) {
        res.send({code:'002',"errorMsg":"授权超时"})
      }
      next();
    } else { 
      res.status(401).send("非法访问");
    }
  },
  /* 生成token*/ 
  makeToken() { 
    let Token = null; 
    let payload = { 
      time: new Date().getTime(), 
      exp: this.makeExp(time)
    } 
    Token = jwt.encode(payload, secret, 'HS256');
    return Token; 
 }, 
 /*生成token过期时间*/ 
  makeExp: function(time) {
    let stam = time * 60 * 1000; 
  } 
}
