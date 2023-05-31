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
//appeler la fonction modifier et supprimer//
editCart();
deleteCart();
//Appel de la fonction le total des quantites 
getTotalQuantity();
validationForms();
            
  }
          

function editCart() {

  //Selectionner tous les element du panier avec la class cart//
  const editContent = document.querySelectorAll('.cart__item');
  console.log(editContent);

   //Slectionner element quantité et supprimer// 
    //const quantityInput = document.querySelectorAll('.itemQuantity');
     //console.log(quantityInput);
     //const deleteElement = document.querySelectorAll('.deleteItem');
     //console.log(deleteElement);

     //Parcourir chaque element dans le panier//
    for (let a = 0; a < editContent.length; a++){
      console.log(editContent); 
      const cartItem = editContent[a];//element actuel du panier//
      console.log(cartItem);
      const quantityInput = cartItem.querySelector('.itemQuantity');
      const deleteElement = cartItem.querySelector('.deleteItem');

    //Ajouter un evenement pour le changement de quantité//
     if(quantityInput){
     quantityInput.addEventListener('change',(event)=>{
      //recuperer les nouvelle qunatité en tant que nombre 
       const newQuantity = parseInt(event.target.value) || 0;
       console.log(newQuantity);

      //Recuperer id du produit et sa couleur actuel//
       const productId = cartItem.dataset.productId;
       const productColor = cartItem.dataset.productColor;
      console.log(productId);
      console.log(productColor);
      //mettre a jour la quantité dans le localstorage//
       const productsLocalStorageQuantity = JSON.parse(localStorage.getItem("addToCart"));
       console.log(productsLocalStorageQuantity);
       const updateProducts = productsLocalStorageQuantity.map((product)=>{
        //Verifier si id et la couleur du produit correspondent a element actuel//
         if(product.id ===productId && product.color === productColor){
           product.quantity = newQuantity;
         }
         return product;
       });
       localStorage.setItem("addToCart",JSON.stringify(updateProducts));
      console.log(updateProducts);
       //Mettre a jour la quantité dans le DOM//
       const quantityElement = cartItem.querySelector('.cart__item__content__settings__quantity input');
       //quantityElement.textContent =`Quantité: ${newQuantity}`;
       //console.log(quantityElement);

       if(quantityElement){
        quantityElement.value = newQuantity;
        //Mettre a jour la valeur de input//
       }

       //Calculer le nouveau prix total //
       calculateTotalPrice();
     });
 }
  
  //Ajouter un evenement pour le bouton supression//
   if(deleteElement){
  //Ajouter un evenemnet pour le bouton suppression//
     deleteElement.addEventListener('click',() => {
      //Recup id et la couleur du produit actuel//
       const productId = cartItem.dataset.productId;
       const productColor = cartItem.dataset.productColor;

      //Supprimer le produit du localstorage//
       let productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
       console.log(productsLocalStorage);
       productsLocalStorage = productsLocalStorage.filter(
         (product) => { 
          return product.id !== productId ||product.color !== productColor;
         
        });
        
       localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage));
    
//Supprimer le produit du DOM//
       cartItem.remove();

       calculateTotalPrice();
       getTotalQuantity();
   });   
  }
};
 //Mettre a jour dans le localstorage des que l'on modifie une quantité//
 window.addEventListener('change',() =>{
  //recup tous les element avec la classe'cart__item'//
  const products = Array.from(editContent).map((cartItem) =>{
    //Recup id du produit depuis l'attribut 'data-productId' de lement du panier//
    const productId = cartItem.dataset.productId;
    //recup la couleur du produit depuis le panier//
    const productColor = cartItem.dataset.productColor;
    //Recup l'element de la quantité depuis sa classe//
    const quantityElement = cartItem.querySelector('.cart__item__content__settings__quantity input');
    console.log(quantityElement);
    //Extraire la quantité depuis le texte de element de quantité //
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);
    //Créé un objet contenant id, la couleur et la quantité du produit qui a ete modifié//
    return{
      id: productId,
      color: productColor,
      quantity: quantity,
    };
  });
  //Mettre a jour le localstorage avec les produits mis a jour//
  localStorage.setItem('addtoCart', JSON.stringify(products));
 });
 //Mettre a jour la quantité totale dans le localstorage et le DOM//
 getTotalQuantity();
 

}
function deleteCart() {
const deleteElements = document.querySelectorAll('.deleteItem');
//des on supprime un produit on cree une boucle evenement//
console.log(deleteElements);
 deleteElements.forEach(deleteElement => {
   deleteElement.addEventListener("click",(event) => {
     event.preventDefault();
     //trouver element parent le plus proche de element suppression//
     const cartItem = deleteElement.closest('.cart__item');
    console.log(cartItem);

     if(cartItem)//si element parent//
     {
      //je recup id et sa couleur depuis le data//
       const productId = cartItem.dataset.id;
       console.log(productId);
       const productColor = cartItem.dataset.colors;
       console.log(productColor);

       //Ajouter la declaration de la variable productsLocalStorage//
       let productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
       console.log(productsLocalStorage);

      //Supprimer le produit du localstorage//
      productsLocalStorage = productsLocalStorage.filter(product => product.id !== productId || product.colors !== productColor);
      localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));

      //Supprimer le produit du DOM//
      cartItem.remove();
  
  }
  //Mettre a jou la quantité totale dans le localstorage et le DOM//
calculateTotalPrice();
getTotalQuantity();
  
       });
      });
  

}
function getTotalQuantity() {
  //Recup tous les elements du panier avec la calss cart__item//
  const cartItems = document.querySelectorAll('.cart__item');

  let totalQuantityArticles = 0;
  console.log(totalQuantityArticles);

  //Parcourir chaque element du panier //
  cartItems.forEach(item => {

    //recup la qtite de article//
    const quantityElement = item.querySelector('.cart__item__content__settings__quantity input');
    console.log(quantityElement);
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);

    //Ajouter la quantité a la quantité totale//
    totalQuantityArticles += quantity;
  });
 

  //Mettre a jour le HTML qui correspondt a la qtite//
  const totalQuantityElement = document.querySelector('#totalQuantity');
  console.log(totalQuantityElement);
  totalQuantityElement.textContent = totalQuantityArticles;
  calculateTotalPrice();

}
function calculateTotalPrice() {
  //Selectionner tous les element du panier//
  const cartItems = document.querySelectorAll('.cart__item__content__description');

  //Initialiser la variable totalPrice à 0//
  let totalPrice = 0;
  console.log(totalPrice);
  let totalQuantity =0;
  console.log(totalQuantity);
  //Parcourir chaque element du panier//
  cartItems.forEach(item => {

    //Selectionner le prix dans la description de chaque produit//
    const priceElement = item.querySelector('p:last-child');
    console.log(priceElement);
    //Recup le texte du prix à partir de element selectionne//
    const priceText = priceElement.innerText;
    console.log(priceText);
    //Convertir le texte du prix en nombre en supprimant le symbole € + les espaces supplémentaires//
    const price = parseFloat(priceText.replace('€','').trim());
    console.log(price);

    //Selectionne element de la uantite de chaque produit//
    const quantityElement = item.closest('.cart__item').querySelector('.cart__item__content__settings__quantity input');
    console.log(quantityElement);
    //Obtenir la quantite a partir de la valeur du produit//
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);

    //calcul du prix en multipliant le prix par la quantiite//
    const productTotal = price * quantity;

    //Ajouter le prix total//
    totalPrice += productTotal;

    //Ajouter la quantité au totalQuantity//
    totalQuantity += quantity;

    });

    //Mettre  ajour le prix total dans le localstorage//
    const productsLocalStorage = JSON.parse(localStorage.getItem('addToCart'));
    console.log(productsLocalStorage);
    const updatedProducts = productsLocalStorage.map(product =>{
      const productTotal = totalPrice * (product.quantity / totalQuantity);
      console.log(productTotal);
      product.price = productTotal;
      return product;

    });
    console.log(updatedProducts);

    localStorage.setItem('addToCart', JSON.stringify(updatedProducts));
 
//Selectionner le prix total dans le HTML
  const totalPriceElement = document.querySelector('#totalPrice');
  console.log(totalPriceElement);
  //Mettre a jour le contenur le element prix avec le prix total arrondi a deux decimal//
  totalPriceElement.textContent = totalPrice.toFixed(2);
  
  //Mettre  ajour la quantite totale dans le DOM//
  const totalQuantityElement = document.querySelector('#totalQuantity');
  totalQuantityElement.textContent = totalQuantity;
  console.log(totalQuantityElement);
}
function validationForms() {
  //recup la ref vers element du prenom//
  const firstNameInput = document.getElementById('firstName');
  console.log(firstNameInput);
  //recup la ref vers erreur du message//
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  console.log(firstNameErrorMsg);

  //Ajouter un ecouteur evenement sur la soumission du formulaire//
  document.querySelector('.cart__order__form').addEventListener('submit', function(event){

    //Verifier si le prenom constient au moins 3 lettres//
    if (firstNameInput.value .trim() === "" || firstNameInput.value.length > 3 || !/^a-zA-Z]+$/.test(firstNameInput.value)) {
      //Affichage du message erreur//
      firstNameErrorMsg.textContent = " ceci est un message d'erreur";
      //Empecher la soumission du formulaire//
      false;
      event.preventDefault();
    }

  else{
    firstNameErrorMsg.textContent =" Valide ";
    //Autorisation de la soumission du formulaire //
    return true;
  }
});

  
}

// Corriger pour que j utilise get afin que avant la soumission si le prenom a moins de trois lettre il repond false  avec un message "erreur" alors que si il repond 5 lettre il repond truc avec un message d" valide"




 //valider la commande//
