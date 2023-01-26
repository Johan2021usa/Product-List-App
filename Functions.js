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
    constructor(name,quantity,price,description,total){
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.description=description;
        this.total=total;
    }
}

class UserInterface{
    /**
    * With DOM we are able to create, modifying, delete tags from an HTML document
    * for isntance, if we want to create a div that contains forms we can do it using the
    * UserInterface class, all process related ti affect the  document (view) has to be done here
    */


    addProduct(product){
        let productList = document.querySelector('#productList');
        /**
         * With DOM we are able to create, modifying, delete tags from an HTML document
         * then this element will be placed inside the productList (showcase);
         */

        //const objectContainer = document.createElement('div');
        //objectContainer.innerHTML = `
        //    <div id="card-product" class="card-body border border-top-0">
        //        <strong>Name</strong>: ${product.name}
        //        <strong>Quantity</strong>: ${product.quantity}
        //        <strong>Price</strong>: ${product.price}
        //        <strong>Description</strong>: ${product.description}
        //        <button name="delete" class="btn btn-outline-danger btn-sm">Delete</button>
        //        <br>
        //    </div>    
        //`;
        //productList.appendChild(objectContainer);

        let object;
        /**
         * We can create tags using two ways:
         * writing manually the tag with its properties or 
         * using the createElement, className,
         * for this case we will create a DIV tag manually
         */
        object =`
            <div id="card-product" class="card-body border border-top-0">
                <strong>Name</strong>: ${product.name}
                <strong>Quantity</strong>: ${product.quantity}
                <strong>Price</strong>: ${product.price}
                <strong>Description</strong>: ${product.description}
                <strong>Unitary total</strong>:
                <Strong class="total">${product.total}</Strong> 
                <button name="delete" class="btn btn-outline-danger btn-sm">Delete</button>
                <br>
            </div>    
        `;
        productList.innerHTML+=object;
    }

    /**
     * 
     */
    deleteProduct(objectObtained){
        switch(objectObtained.name){
            case "delete" : 
            objectObtained.parentElement.remove();
        }
    }

    /**
    * This event is interesting because 
    * we don't have to add an empty space to each field,
    * in the other hhand we will capture an event to restart the complet DIV
    */
    cleanFields(){
        document.querySelector('#productForm').reset();
    }
    
    /**
     * If we want to show a message in the screen that appears each time we do an action such as: create or delete
     * and we don't want to use an alert; we can insert a div using the DOM,
     * this allows us to modify its feature, shape, etc
     * this is a better option to offer a better user experience
     */
    showMessage(message, classProperty){
        const messageDiv = document.createElement('div');
        
        /**
         * To concatenate a class to a div, it's important to use the ${} at the end of the command line, 
         * which is done to become variable an attribute
         * mt = margin top, it provides an empty space over the element
         */
        messageDiv.className = `alert alert-${classProperty} mt-3 text-md-center`;

        /**
         * We have to use appendChild to add an element inside a div
         * in this case we are adding a text inside the Div,
         * to do so, we have to use the command document. createTextNode
         */
        messageDiv.appendChild(document.createTextNode(message));

        /**
         * This DIV of the HTML will receive the previos DIV that we created using the DOM
         * in this case we are selecting it using its id
         */
        const contDiv = document.querySelector('#divParent');
        /**
         * A good practice to add elements inside a tag is using the command
         * appendChild, in this case is child because is an internal property or object.
         */
        contDiv.appendChild(messageDiv);

        /**
         * Until this point the screen will show a message painted in green,
         * however, each time we add a product a message will be added, so that,
         * we have to create a method for this DIV desapears automatically,
         * we can do it using setTimeOut();
         * we can select an element from de DOM using the Class property, for this case: alert,
         * then we can remove this element with .remove(),
         * last but not least, we can define the time for this element to be removed,
         * 1000= 1 sec.
         * 2000 = 2 sec.
         */
        setTimeout(
            function(){
                document.querySelector('.alert').remove();
            }, 1000
        );
    }

    calculateTotalAmount(unitaryTotal){
        const showTotal = document.getElementById('showTotal');
        showTotal.removeAttribute("hidden","hidden");
        /**
         * Temporary div
         */
        let cardTotal =`<div class="card text-center">${unitaryTotal}</div>`;
        
        /**
         * Dom div
         */
        //unitaryTotal.parentElement.remove();
        showTotal.innerHTML = cardTotal;
    }
}

//Document events
/**
 * Any action done by user in the DOM can be captured as an event,
 * for that we have to use diifferent methods such as:
 * addEventLister
 * 
 */

//Add product capture event
document.getElementById('productForm')
    /*
     * Event listener captures any event in tag called "productForm"; 
     * so that in this case it will capture the "submit" event
     * there are other options different than submit such as click, reset, etc.
     * 
     */
    .addEventListener('submit', 
        function (objectObtained) {
            const name = document.getElementById('name').value;
            const quantity = document.getElementById('quantity').value;
            const price = document.getElementById('price').value;
            const description = document.getElementById('description').value;
            let uniqueTotal = quantity*price;
            //console.log(uniqueTotal);

            //this is the way for us to create a new object in regard to the class Prodcut.
            const product = new Product(name, quantity, price, description, uniqueTotal);
            const myInterface = new UserInterface();
            
            console.log(String(name).length);       
            if(String(name).length || String(quantity).length || String(price).length || String(description).length !== 0){                
                myInterface.addProduct(product);
                myInterface.cleanFields();
                
                let message = 'Product added successfully';
                let cssProperty = 'success';
                myInterface.showMessage(message,cssProperty);
            }else{
                let message = "A product information is required";
                let cssProperty = 'warning';
                myInterface.showMessage(message,cssProperty);
            }

            
            /* preventDefault command avoids the page to be refreshed; otherwise, 
            * you won't be able to debug your code... console.log() for instance
            * you could delete it and look at the console to proof the error.
            */
            objectObtained.preventDefault();
        }
    );


//Delete product capture event
document.getElementById('productContainer')
/*
* This event listener will capture the "click" event inside a diff "product list",
* for that reason is important to separate each element iside a tag or something,
* a tag's property name or type doesn't infer with the event; what defines the event is the add listener and the user action.
*/
    .addEventListener('click', 
        function(objectObtained){
            const myInterface = new UserInterface();    
            /*
            * The target method gets the element's features we click, it will be any element from the DOM;
            * for instance, whether we want to delete a product, when we click on the delete button,
            * we have to obtain an object which contains the name=delete;
            * tha was the reason we put that property to the delete button,
            * now we have to send the target to the User interface who is in charge of modify the interface.
            */
            myInterface.deleteProduct(objectObtained.target);
            const targetVar = objectObtained.target;
            
            switch(targetVar.name){
                case "delete" :
                    let message = 'Product deleted successfully';
                    let cssProperty = 'danger';
                    myInterface.showMessage(message,cssProperty);
            }    
        }
    );

//Total Amount capure event
document.getElementById('productContainer').addEventListener('click',
    function(totalObtained){
        let totalAmount = document.querySelectorAll('strong.total');
        let total=0;
        for(unitaryAmount of totalAmount){
            let unitary = parseInt(unitaryAmount.textContent);
            total += unitary;
        }

        let verifyButton = totalObtained.target;

        switch(verifyButton.name){
            case "calculateTotal" :
                let newInterface = new UserInterface;
                newInterface.calculateTotalAmount(total);
        }       
    }
);
