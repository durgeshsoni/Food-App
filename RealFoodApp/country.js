
document.querySelector('#searchBtn').addEventListener('click', function(e) {
    e.preventDefault();

    getData();

});

let getData = async () => {
    let searchInputTxt = document.querySelector('#search').value;
    try {
       
        // let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInputTxt}`);
        let data = await response.json();
        // console.log(data.meals);
        append(data.meals);

    } catch (error) {
        console.log(error);
        alert('No Data Found');
    }
}

let getData2 = async () => {
  
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=indian`);
        let data = await response.json();
        // console.log(data.meals);
        append(data.meals);

    } catch (error) {
        console.log(error);
    }
}
getData2()


// strMeal
// strMealThumb

let foodArr = JSON.parse(localStorage.getItem('food')) || [];

let likeArr = JSON.parse(localStorage.getItem('like')) || [];
const append =(data)=>{
   let sup =  document.querySelector('sup');
   sup.innerHTML = foodArr.length;
  
    let notif = document.querySelector('.notification');
    let notifd = document.querySelector('.notifDiv');
    document.getElementById('show').innerHTML = '';
    let price  = Math.floor(Math.random() * 500); 

    data.forEach(el => {
        
        let div = document.createElement('div');

        let img = document.createElement('img');
        img.src = el.strMealThumb;
        
        let div2 = document.createElement('div');
        div2.classList.add('text')
        let p = document.createElement('h3');
        p.innerHTML = el.strMeal;

        let p2 = document.createElement('p');
        p2.innerHTML =`<i class="fa-solid fa-heart"></i>`
        p2.classList.add('heart')
        p2.addEventListener('click', function(e) {
           let timer = setInterval(() => {

            notif.innerHTML =el.strMeal+ ' 👍';
            notifd.style.display = 'block';

            }, 10);
            setTimeout(() => {
                notifd.style.display = 'none';
                clearInterval(timer);
            }, 2000);
           
            p2.style.color = 'oranged';
            let foodObj = {
                name: el.strMeal,
                price: parseInt(price.innerHTML),
                img: el.strMealThumb

            }
            likeArr.push(foodObj);
            localStorage.setItem('like', JSON.stringify(likeArr));
           
            
        });

        div2.append(p,p2);

        let div3 = document.createElement('div');
        div3.classList.add('price');
        let price  = document.createElement('p');
        // <i class="fa-solid fa-rupee-sign"></i>. 
        price.innerHTML = `${Math.floor(Math.random() * 500)}`;

        let cart = document.createElement('button');
        // cart.classList.add('cssbuttons-io-button');
        cart.innerHTML = `Add to Cart`;
        cart.addEventListener('click', function(e) {
            let timer = setInterval(() => {

                notif.innerHTML =el.strMeal+ ' <b>Added to Cart</b>';
                notifd.style.display = 'block';
    
                }, 300);
                setTimeout(() => {
                    notifd.style.display = 'none';
                    clearInterval(timer);
                }, 2000);
            let foodObj = {
                name: el.strMeal,
                price: parseInt(price.innerHTML),
                img: el.strMealThumb

            }
           foodArr.push(foodObj);
            localStorage.setItem('food', JSON.stringify(foodArr));
            
        });

        div3.append(price,cart);

        div.append(img,div2,div3);
        document.getElementById('show').append(div);


    });
}

// -------------------- other section 
