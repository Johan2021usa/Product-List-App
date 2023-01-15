/*
* This project will be done using Object oriented JavaScript;
* thereforem, we'll learn about how to:
* create a class
* create class methods such as: constructor, getters, setters, etc.
* instantiate a class with the property new.
* define a User Interface which will be in charge of modifying the DOM.
*/
class Product{
    //This is the proper way to delcare a constructor
    constructor(name,quantity,price,description){
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.description=description;
    }
}

/**
 * This calls will be in chage of comunicate with the DOM, 
 * so that it will put all items in the div that receives all products
 */
class UserInterface{
    /**
     * When an user click on a button, the DOM is interacting with JavaScript; 
     * so that those events are part of the DOM,
     * to capture events we have to do the next:
     * receive an object and then we can show than inside a div or modify the object
     * and then show it; at the end of the process we can show a message according
     * the result.
     */

    addProduct(product){
        console.log(product);
        
        let productList = document.querySelector('#productList');
        /**
         * This new element is creted in order to create a div that contains the products
         * then this element will be placed inside the productList (showcase);
         */
        //const objectContainer = document.createElement('div');
        let object;

        //objectContainer.innerHTML = `
        object =`
            <div id="card-product" class="card-body border border-top-0">
                <strong>Name</strong>: ${product.name}
                <strong>Quantity</strong>: ${product.quantity}
                <strong>Price</strong>: ${product.price}
                <strong>Description</strong>: ${product.description}
                <button name="delete" class="btn btn-outline-danger btn-sm">Delete</button>
                <br>
            </div>    
        `;
        //productList.appendChild(objectContainer);
        productList.innerHTML+=object;
    }

    deleteProduct(objectObtained){
        switch(objectObtained.name){
            case "delete" : 
            objectObtained.parentElement.remove();   
        }
    }

    //Functional events

    /* This event is interesting because 
    * we don't have to add an empty space to each field,
    * in the other hhand we will capture an event to restart the complet DIV
    */

    cleanFields(){
        document.querySelector('#productForm').reset();
    }

    showMessage(){

    }
}

//Document events

//Add product event
document.getElementById('productForm')
    /*
     * Event listener captures any event in tag called "productForm"; 
     * so that in this case it will capture the "submit" event
     * there are other options different than submit such as click, reset, etc.
     * 
     */
    .addEventListener('submit', function (objectObtained) {
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        
        //this is the way for us to create a new object in regard to the class Prodcut.
        const product = new Product(name, quantity, price, description);
        const myInterface = new UserInterface();
        myInterface.addProduct(product);
        myInterface.cleanFields();

        /* preventDefault command avoids the page to be refreshed; otherwise, 
        * you won't be able to debug your code... console.log() for instance
        * you could delete it and look at the console to proof the error.
        */
        objectObtained.preventDefault();
    });

//Delete product event
document.getElementById('productList')
/*
* This event listener will capture the "click" event inside a diff "product list",
* for that reason is important to separate each element iside a tag or something,
* a tag's property name or type doesn't infer with the event; what defines the event is the add listener and the user action.
*/
    .addEventListener('click', function(objectObtained){
        const myInterface = new UserInterface();
        /**
         * The target method gets the element's features we click, it will be any element from the DOM;
         * for instance, as we want to delete a product, when we click on the delete button,
         * we have to obtain an object which contains the name=delete;
         * tha was the reason we put that property to the delete button,
         * now we have to send the target to the User interface who is in charge of modify the interface.
         */
        myInterface.deleteProduct(objectObtained.target);
        //console.log(objectObtained.target);
    });
