(function(){

    const btnSwitch = document.querySelector("#switch");
    let logoMostrado = 'deezer-negro';
    const logo = document.querySelector("#logo");

    $(btnSwitch).click(() => {
        document.body.classList.toggle("dark");
        btnSwitch.classList.toggle("active");

        if (logoMostrado == 'deezer-negro') {
            logo.src = "img/deezer.png";
            logoMostrado = "deezer";

        } else {
            logo.src = "img/deezer-negro.png";
            logoMostrado = "deezer-negro";     
        }
   
    }); 


}())