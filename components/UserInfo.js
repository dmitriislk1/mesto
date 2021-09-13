export default class UserInfo{
    constructor({nameSelector, profesionSelector}){
        
        this._name = document.querySelector(nameSelector);
        this._profesion = document.querySelector(profesionSelector);
    
    }
    getUserInfo(){
        return {name: this._name.textContent , profesion: this._profesion.textContent}
    }
    setUserInfo(name, profesion){
        this._name.textContent = name;
        this._profesion.textContent = profesion;
    }
}