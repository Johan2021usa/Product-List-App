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

            //this is the way for us to create a new object in regard to the class Product.
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

//Total Amount capture event
document.getElementById('productContainer').addEventListener("click",
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