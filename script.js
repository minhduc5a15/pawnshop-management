function checkScreenWidth() {
    if (window.innerWidth >= 1200) {
        document.getElementById('aside').style.transform = 'translateX(0)';

        document.getElementById('main').style.width = 'calc(100% - 250px)';
        document.getElementById('main').style.left = '250px';

        document.getElementById('menu_bar').style.display = 'none';

        document.getElementById('title').style.display = 'flex';
        document.getElementById('title').style.width = '250px';
        x = 0;
    }
    else{
        document.getElementById('aside').style.transform = 'translateX(-250px)';

        document.getElementById('main').style.width = '100%';
        document.getElementById('main').style.left = '0';

        document.getElementById('menu_bar').style.display = 'flex';

        document.getElementById('title').style.display = 'none';
        document.getElementById('title').style.width = '200px';
        document.getElementById('menu_bar').classList.remove("fa-times");
        document.getElementById('menu_bar').classList.add("fa-bars");
    }
}
window.addEventListener('resize', checkScreenWidth);

let x = 0;
document.getElementById('menu_bar').addEventListener("click", Click_menu_bar)
document.getElementById('blur').addEventListener("click", Click_menu_bar)
function Click_menu_bar(){
    if(x == 0){
        document.getElementById('menu_bar').classList.remove("fa-bars");
        document.getElementById('menu_bar').classList.add("fa-times");
        
        document.getElementById('title').style.display = 'flex';
        document.getElementById('aside').style.transform = 'translateX(0)';
        document.getElementById('page').style.display = 'none';
        document.getElementById('blur').style.display = 'block';
        x = 1;
    }
    else{
        document.getElementById('menu_bar').classList.add("fa-bars");
        document.getElementById('menu_bar').classList.remove("fa-times");

        document.getElementById('title').style.display = 'none';
        document.getElementById('aside').style.transform = 'translateX(-250px)';
        document.getElementById('page').style.display = 'flex';
        document.getElementById('blur').style.display = 'none';
        x = 0;
    }
}