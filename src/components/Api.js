export default class Api{
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }
    getAllCards(){
        return fetch(this._url + "/cards", {headers: this._headers})
            .then((res) => {
                return res.json()
            })
    }
    getProfileInfo(){
        return fetch(this._url + "/users/me", {headers: this._headers})
        .then((res) => {
            return res.json()
        })
    }
    setProfileInfo(newName, newProfession){
                fetch(this._url + "/users/me", {
        method: 'PATCH',
        headers: {
            authorization: this._headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newProfession
        })
        }); 
    }
    addCard(data){
        return fetch(this._url + "/cards", {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
            }); 
    }
    deleteCard(cardId){
        fetch(this._url + "/cards/"+ cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
            });
    }
    setLike(cardId){
        fetch(this._url + "/cards/likes/"+ cardId, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
            
            });
    }
    deleteLike(cardId){
        fetch(this._url + "/cards/likes/"+ cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
            });
    }
}