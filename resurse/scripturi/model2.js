window.addEventListener("load", function(){

    var autor_preferat_vechi = localStorage.getItem("autor_preferat") ? localStorage.getItem("autor_preferat") : ""; //la inceput nu va exista;
     
    var grid = document.getElementById("grid_carte");
        
    var articole = grid.getElementsByTagName("article"); 


     for (var i = 0; i < articole.length; i++) {
   
          autor_de_colorat = articole[i].getElementsByClassName("autor")[0].innerHTML.trim()


          if( autor_de_colorat == autor_preferat_vechi){

             articole[i].getElementsByClassName("autor")[0].style="color:green"
          }
     }

    document.getElementById("sorteaza").onclick = function() {
        
        var sel = document.getElementById("ordine").value; 

        var grid = document.getElementById("grid_carte");
        
        var articole = grid.getElementsByTagName("article"); 
        
        var vector_articole = Array.from(articole);
        vector_articole.sort(function(a, b) {
            
            var ul_tematici = a.getElementsByClassName("tematici")[0];
        
            var li_tematici = ul_tematici.getElementsByTagName("li");
            var nrTematici_a = 0;
            for (var i = 0; i < li_tematici.length; i++) {
                nrTematici_a += 1
            }
 
            ul_tematici = b.getElementsByClassName("tematici")[0];
        
            li_tematici = ul_tematici.getElementsByTagName("li");
            var nrTematici_b = 0;
            for (var i = 0; i < li_tematici.length; i++) {
                nrTematici_b += 1
            }
 
            if (sel == "asc")
                return nrTematici_a - nrTematici_b;
            else
                return nrTematici_b - nrTematici_a;
        });
        //tre sa afisam sortarea si in pagina
        for (var i = 0; i < vector_articole.length; i++) {
            //adaugam la parintele articolelor adica in divul cu idul grid-elevi
            grid.appendChild(vector_articole[i]);
        }
    }

    document.getElementById("filtreaza_model2").onclick = function() {
        var tematica_cautata = document.getElementsByName("gr_rad_model2");
 
        tematica_aleasa="";
        for(let tem of tematica_cautata){
            if(tem.checked){
                tematica_aleasa=tem.value;
                break;
            }
        }



        var grid = document.getElementById("grid_carte");
        
        var articole = grid.getElementsByTagName("article"); 

        for (var i = 0; i < articole.length; i++) {
            articole[i].style.display = "none";
 
            ul_tematici = articole[i].getElementsByClassName("tematici")[0];
        
            li_tematici = ul_tematici.getElementsByTagName("li");
            
            for (var j = 0; j < li_tematici.length; j++) {

                if (li_tematici[j].innerHTML.trim() == tematica_aleasa) {
                    articole[i].style.display = "block";
                }
            }

        }
    }

    document.getElementById("seteazaLocalStorage").onclick = function(){

        var autor_preferat_input = document.getElementById("autor_preferat").value;
        localStorage.setItem("autor_preferat", autor_preferat_input);
        var autor_preferat_vechi = localStorage.getItem("autor_preferat") ? localStorage.getItem("autor_preferat") : ""; //la inceput nu va exista;
        

    }
    

})