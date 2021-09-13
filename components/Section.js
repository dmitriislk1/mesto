
export default class Section{
    constructor({items, renderer}, containerSelector, api){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }
    renderItems(){
        this._items.forEach((item)=>{
            this._container.append(this._renderer(item));
        });
    }
    addItem(data, card){
        this._container.prepend(card);
        return this._saveCard(data);
    }
    _saveCard(data){
        return this._api.addCard(data);
    }
}