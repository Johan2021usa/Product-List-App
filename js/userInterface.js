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
                <strong>Unitary total</strong>: <Strong class="total">${product.total}</Strong> 
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
    * in the other hand we will capture an event to restart the complete DIV
    */
    cleanFields(){ document.querySelector('#productForm').reset();}
    
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
        let cardTotal =`<div class="card text-center">${unitaryTotal.toLocaleString('en-US')}</div>`;
        
        /**
         * Dom div
         */
        //unitaryTotal.parentElement.remove();
        showTotal.innerHTML = cardTotal;
    }
}


