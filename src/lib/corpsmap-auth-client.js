import xhr from 'xhr';
const authUrl = 'https://rsgis-testdev.crrel.usace.army.mil/auth/login';

export default {
  _getNewToken(callback){
    let _this = this;
    xhr({
      url:authUrl
    }, function(errr, res, body){
      _this._setToken(JSON.parse(body));
      callback(null, body);
    })
  },
  _getStoredToken(callback){
    return window.localStorage.apitoken || '';
  },
  _setToken(token){
    window.localStorage.apitoken = token;
  },
  _unsetToken(){
    window.localStorage.clear();
  },
  _validateToken(token){

  },
  _getTokenPart(part){
    let splitToken = this._getStoredToken().split('.');
    return splitToken[part];
  },
  isLoggedIn(){
    let token = this._getStoredToken();
    return token.length > 1 ? true : false;
  },
  login(callback){
    const _this = this;
    this._getNewToken(function(err, token){
      if(err) return callback(err);
      return callback(null, _this.getTokenPayload());
    })
  },
  logout(){
    this._unsetToken();
    return true;
  },
  getTokenHeader(){
    return JSON.parse(window.atob(this._getTokenPart(0))) || '';
  },
  getTokenPayload(){
    return JSON.parse(window.atob(this._getTokenPart(1))) || '';
  }
}
