/*
* This project will be done using Object oriented JavaScript;
* therefore, we'll learn about how to:
* create a class
* create class methods such as: constructor, getters, setters, etc.
* instantiate a class with the property new.
* define a User Interface which will be in charge of modifying the DOM.
*/
class Product{
    //This is the proper way to declare a constructor
    constructor(name,quantity,price,description,total){
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.description=description;
        this.total=total;
    }
}