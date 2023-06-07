 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoge avec la cle addToCart  et utilise la methode JSON.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.querySelector("#cart__items");
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (!productsLocalStorage || productsLocalStorage.length === 0) {
    console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);
infoUsers.style.textAlign = "center";

//message pour informer utilisateur que le panier est vide//
  }else {
    console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//
//je cree une fonction en utilisant foreach pour parcourir le tableau du localstorage et recupéré id, la couleur et la quantité//
productsLocalStorage.forEach(product => {
  //recup les infos depuis API//
fetch(`http://localhost:3000/api/products/${product.id}`)   
      .then ((response) => response.json())
          .then((data) => {
            showProductsCart(data, product);
            
         
        });
    
      })
      
    };  
     
  



function showProductsCart(data, product) {
//cree une div pour afficher le produit//
const cartItem = document.createElement('article');
cartItem.classList.add('cart__item');
cartItem.dataset.productId = product.id;
cartItem.dataset.productColor = product.colors;
console.log(cartItem);


  //afficher image//
  const cartItemImg = document.createElement('div');
  cartItemImg.classList.add('cart__item__img');
  const image = document.createElement('img');
  image.src = data.imageUrl;
  image.alt = data.altTxt;
  cartItem.appendChild(cartItemImg);


  //cree la div qui comprend le titre, couleur, prix quantité et bouton supprimer//
  const cartContent = document.createElement('div');
  cartContent.classList.add('cart__item__content');

    //je cree une variable pour mettre dans la description le nom, la couleur et le prix//
    const cartContentDescription = document.createElement('div');
    cartContentDescription.classList.add('cart__item__content__description');
  
  //afficher le titre du produit//
  const productName = document.createElement('h2');
  productName.textContent = data.name;
  cartItem.appendChild(productName);
  //afficher la ou les couleurs du produit//
  const productColor = document.createElement('p');
  productColor.textContent = `Couleur : ${product.colors}`;
  cartItem.appendChild(productColor);
  //je cree une variable pour afficher le prix du produit//
  const productPrice = document.createElement('p');
  productPrice.textContent = `${parseFloat(data.price) || 0} € `;
  cartItem.appendChild(productPrice);

  //je cree une div pour positionner element supprimer et modifier//
const cartContentSetting = document.createElement('div');
cartContentSetting.classList.add('cart__item__content__settings');

   //je cree une div ou on va positionner la quantité et la qunatité modifier//
  const productEdit = document.createElement('div');
  productEdit.classList.add('cart__item__content__settings__quantity');
  //afficher la quantité du produit//
  const productQuantity = document.createElement('p');
  productQuantity.textContent = `Quantité : ${product.quantity}`;
  cartItem.appendChild(productQuantity);
    //creer un input pour modifier la quantité du produit//
    const valueQtity = document.createElement('input');
    valueQtity.querySelector('.cart__item__content__settings__quantity');
    valueQtity.classList.add('cart__item__content__settings__quantity');
    //cree un element input de ty^pe number en ajoutant les valeurs//
    valueQtity.setAttribute("type","number");
    valueQtity.setAttribute("class","itemQuantity");
    valueQtity.setAttribute("name","itemQuantity");
    valueQtity.setAttribute("min","1");
    valueQtity.setAttribute("max","100");
    valueQtity.setAttribute("value",product.quantity);//ajout la valeur qui correspondt a la quantité choisir//

  //cree un div pour afficher element supprimer//
  const productDelete = document.createElement('div');
  productDelete.classList.add('cart__item__content__settings__delete');
  //créé un variable pour ajouter un element supprimer//
  const deleteItem = document.createElement('p');
  deleteItem.classList.add('deleteItem');
  deleteItem.textContent = `Supprimer`;
  

//  Ajouter le produit a la page panier en liant la variable qui situe les elements du panier et la variable qui positionne articles//
            cartProduct.appendChild(cartItem);
            cartItem.appendChild(cartItemImg);
            cartItemImg.appendChild(image);
            cartItem.appendChild(cartContent);
            cartItem.appendChild(cartContentDescription);
            cartContent.appendChild(cartContentDescription);
            cartItem.appendChild(productName);//
            cartContentDescription.appendChild(productName);
            cartItem.appendChild(productColor);//
            cartContentDescription.appendChild(productColor);
            cartItem.appendChild(productPrice);//
            cartContentDescription.appendChild(productPrice);
            cartItem.appendChild(cartContentSetting);//
            cartContent.appendChild(cartContentSetting);
            cartItem.appendChild(productEdit);//
            cartContentSetting.appendChild(productEdit);
            cartItem.appendChild(productDelete);//
            cartContentSetting.appendChild(productDelete);
            cartItem.appendChild(productQuantity);//
            productEdit.appendChild(productQuantity);
            cartItem.appendChild(valueQtity);//
            productEdit.appendChild(valueQtity);
            cartItem.appendChild(deleteItem);//
            productDelete.appendChild(deleteItem);
            

  //Appel des fonctions//
  editCart();
  deleteCart();
  getTotalQuantity();
  calculateTotalPrice();
  validationForms();
  }
          


function editCart() {

  //Selectionner tous les element du panier avec la class cart//
   const editContent = document.querySelectorAll('.cart__item');
   console.log(editContent);

     //Parcourir chaque element dans le panier(le DOM)//
     for (let a = 0; a < editContent.length; a++){
        //element actuel du panier//
        const cartItem = editContent[a];
        console.log(cartItem);

        //Selectionner element entree de la quantite//
        const quantityInput = cartItem.querySelector('.itemQuantity');
        console.log(quantityInput);

        //Ajouter un evenement pour le changement de quantité//
        quantityInput.addEventListener('change',(event)=>{
        //recuperer la quantité en tant que nombre//
        if(quantityInput){
        const newQuantity = parseInt(event.target.value);
        console.log(newQuantity)
        //Recuperer ID du produit a partir de attribut data//
        const productId = cartItem.dataset.productId;
        console.log(productId);
      //mettre a jour la quantité dans le localstorage avec une cle basé sur ID//
      localStorage.setItem(`addToCart_${productId}_quantity`, newQuantity);

      // Sélectionner l'élément d'affichage de la quantité dans le DOM//
      const quantityDisplay = cartItem.querySelector('.itemQuantity');
      quantityDisplay.textContent = ` Quantité : ${newQuantity}`;
      console.log(quantityDisplay);
        
      getTotalQuantity();
      calculateTotalPrice();
        }
      });   
    }
  }
  

  
       
function deleteCart() {
  //Slectionner tous les elements de suppression//
const deleteElements = document.querySelectorAll('.deleteItem');
console.log(deleteElements);

//Parcourir chaque element de supression//
 deleteElements.forEach(deleteElement => {
   deleteElement.addEventListener("click",(event) => {
    event.preventDefault();

     //trouver element parent le plus proche de cart__item( de supression)//
    const cartItem = deleteElement.closest('.cart__item');
    console.log(cartItem);

    //verifier si l'élement parent existe//
     if(cartItem){
      //je recup id et sa couleur depuis le data-productId//
       const productId = cartItem.dataset.productId;
       console.log(productId);
       const productColor = cartItem.dataset.productColor;
       console.log(productColor);

       //Recup les donnees du panier depuis le localstorage//
       let productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
       console.log(productsLocalStorage);

      //Supprimer le produit du DOM//
      cartItem.remove();

      //Filtrer les produits du panier pour supprimer celui ou ceux qui correspondt à ID//
      productsLocalStorage = productsLocalStorage.filter(product => product.productId !== productId && product.productColor !== productColor);
      //Mettre a jour les données du panier dans le localstorage//
      localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
  
      getTotalQuantity();
      calculateTotalPrice();
  }
  
       });
       
      });
}



function getTotalQuantity() {
  //Recup tous les elements du panier avec la calss cart__item//
  const cartItems = document.querySelectorAll('.cart__item');

  let totalQuantity = 0;
  console.log(totalQuantity);

  //Parcourir chaque element du panier //
  cartItems.forEach(item => {

    //recup la qtite de article//
    const quantityElement = item.querySelector('.itemQuantity');
    console.log(quantityElement);
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);
    

    //Ajouter la quantité de chaque article a la quantité totale//
    totalQuantity +=  quantity;
    console.log(totalQuantity);
    
    
    //Mettre a jour le HTML qui correspondt a la qtite//
    const totalQuantityElement = document.querySelector('#totalQuantity');
    console.log(totalQuantityElement);
    totalQuantityElement.textContent = totalQuantity;
    console.log(quantity);
    console.log(totalQuantityElement);
  });
}







function calculateTotalPrice() {
  //Selectionner tous les element du panier//
  const cartItems = document.querySelectorAll('.cart__item');
  //Initialiser la variable totalPrice à 0//
  let totalPrice = 0;
  console.log(totalPrice);
  cartItems.forEach(item => {

    //Selectionner le prix dans la description de chaque produit//
    const priceElement = item.querySelector('.cart__item__content__description p:last-child');
    console.log(priceElement);
    //Recup le texte du prix à partir de element selectionne//
    const priceText = priceElement.textContent;
    console.log(priceText);
    //Convertir le texte du prix en nombre en supprimant le symbole € + les espaces supplémentaires//
    const price = parseFloat(priceText);
    console.log(price);

    //Selectionne element de la quantite de chaque produit//
    const quantityElement = item.querySelector('.itemQuantity');
    console.log(quantityElement);
    //Recuperer la valeur de la quantite //
    const quantity = quantityElement ? parseInt(quantityElement.value): 0;
    console.log(quantity);

    //calcul du prix en multipliant le prix par la quantiite//
    const productTotal = price * quantity;
    console.log(productTotal);
    //Ajouter le prix total//
    totalPrice += productTotal;
    console.log(totalPrice);
    
  });

 

//Selectionner le prix total dans le HTML
  const totalPriceElement = document.querySelector('#totalPrice');
  console.log(totalPriceElement);
  //Mettre a jour le contenur le element prix avec le prix total arrondi a deux decimal//
  totalPriceElement.textContent = totalPrice.toFixed(2);
  console.log(totalPriceElement);

  
}


function validationForms() {
  //Selection du formulaire//
  const form = document.querySelector('.cart__order__form');
  console.log(form);


  //Je selectionne le champ de saisie du prenom//
  const firstNameInput = document.querySelector('#firstName');
  console.log(firstNameInput);
  //selection element du message erreur//
  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  console.log(firstNameErrorMsg);

  //je selectionne le champ du nom//
  const lastNameInput = document.querySelector('#lastName');
  console.log(lastNameInput);
  //Je recup le message erreur du nom//
  const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
  console.log(lastNameErrorMsg);

  //je selectionne le champ de l'adresse postale//
  const addressInput = document.querySelector('#address');
  console.log(addressInput);
  const addressErrorMsg = document.querySelector('#addressErrorMsg');
  console.log(addressErrorMsg);

  //je selectionne le champ de la ville//
  const cityInput = document.querySelector('#city');
  console.log(cityInput);
  const cityErrorMsg = document.querySelector('#cityErrorMsg');
  console.log(cityErrorMsg);

  //Je selectionne adresse-email //
  const emailInput = document.querySelector('#email');
  console.log(emailInput);
  const emailErrorMsg = document.querySelector('#emailErrorMsg');
  console.log(emailErrorMsg);


  //Ajouter un gestionnaire evenement a la soumission du formulaire //
  form.addEventListener('submit', (event) =>{
    //empeche le comportement par defaut du formulaire(soumission)//
    event.preventDefault();
    //Recupere la valeur du prenom saisi//
    const firstName = firstNameInput.value;
    console.log(firstName);
    //Definir expression reguliere pour verifier il y es au moins trois lettres//
    const regexFirstName = /^[a-zA-Z]{3,}$/;
    console.log(regexFirstName);
    //Je test si le prenom respecte bien expression reguliere //
        if(regexFirstName.test(firstName)){
        firstNameErrorMsg.textContent ='Valide';
        }else{
        //le prenom ne respecte pas les trois lettres, je recupere le message erreur//
        firstNameErrorMsg.textContent = 'Le prénom doit contenir au moins 3 lettres.';
        console.log(firstNameErrorMsg);  
        false; 
      }
  
  //Je recupere la valeur du nom saisi//
  const lastName = lastNameInput.value;
  console.log(lastName);
  //Definir l'expression reguliere il y a minimum 5 lettres//
  const regexLastName = /^[a-zA-Z]{5,}$/;
  console.log(regexLastName);
  if(regexLastName.test(lastName)){
    lastNameErrorMsg.textContent = 'Valide';
  }else{
  lastNameErrorMsg.textContent = 'Le nom doit contenir au moins 5 lettres. ';
  console.log(lastNameErrorMsg);
  false;
  }

  //je recup adress postale//
  const address = addressInput.value;
  const regexAddress = /([0-9]{1,}) ?([a-zA-Z,\. ]*)$/;
  console.log(regexAddress); 
  if (regexAddress.test(address)) {
    addressErrorMsg.textContent = 'Valide';
  } else {
      addressErrorMsg.textContent = 'Adresse postale doit être complete';
      console.log(addressErrorMsg);
      false;
  }

  //je recup le code postale et nom de la ville//
  const city = cityInput.value;
  const regexCity = /^[a-zA-Z]{2,}$/;
  console.log(regexCity);
  if (regexCity.test(city)) {
    cityErrorMsg.textContent = 'Valide';
  } else {
    cityErrorMsg.textContent = 'La ville a un minimum de 2 lettres. ';
    console.log(cityErrorMsg);
    false;
  }

  //je recupere le mail//
  const email = emailInput.value;
  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  console.log(regexEmail);
  if (regexEmail.test(email)) {
    emailErrorMsg.textContent = 'Valide';
  } else {
    emailErrorMsg.textContent = 'Adresse email doit être complete. ';
    console.log(emailErrorMsg);
    false;
  }
  
    })


    


  
}

//Appel des functions pour initialiser le panier//
editCart();
deleteCart();
getTotalQuantity();
calculateTotalPrice();
validationForms();

 //valider la commande/
