window.addEventListener("load", function()
{
    document.getElementById("filtrare").onclick=function(){
        var produse = document.querySelectorAll("article");
        var durataMin=document.getElementById("i_range").value;
        var nume_melodie_input = document.getElementById("i_text").value; //PRIMUL INPUT
        var compozitor_input = document.getElementById("i_sel_simplu").value  //SEL SIMPLU
        var sex_artist1 = document.getElementById("i_bool1").checked
        var sex_artist0 = document.getElementById("i_bool0").checked
        var optiuni=document.getElementById("i_sel_multiplu").options
        var gen_muzical_input = document.getElementsByName("gr_rad");
        var descriere_input = document.getElementById("i_textarea").value;

        //radio check
        radio_checked="";
        for (let gen of gen_muzical_input){
            if(gen.checked){
                radio_checked=gen.value
                break;
            }
        }
        console.log(radio_checked);

        //sel multiplu
        var lista = [];
		for(let opt of optiuni){
			if(opt.selected)
				lista.push(opt.value);
        }

        for (var prod of produse)
        {
            prod.style.display="block";
            var nume_melodie = prod.getElementsByClassName("nume_melodie")[0];
            var conditie1 = 1;
            if (nume_melodie != "") 
            {
                conditie1 = (nume_melodie.innerHTML.toLowerCase().includes(nume_melodie_input.toLowerCase()));
            }

            var gen_muzical = prod.getElementsByClassName("gen_muzical")[0];
            var conditie3 = (radio_checked == gen_muzical.innerHTML) || (radio_checked == "nimic");
            


            var durata_melodiei = prod.getElementsByClassName("durata_melodiei")[0].textContent;
            var conditie2=(parseInt(durata_melodiei)<=parseInt(durataMin));

            var val_sex_artist = prod.getElementsByClassName("sex_artist")[0];
            var conditie4_feminin = (sex_artist1 && val_sex_artist.innerHTML == 1);
            var conditie4_masculin = (sex_artist0 && val_sex_artist.innerHTML == 0);
            
            var descriere = prod.getElementsByClassName("descriere")[0];
            var conditie5 = 1;
            if(descriere_input != ""){
            conditie5 = (descriere.innerHTML.toLowerCase().includes(descriere_input.toLowerCase()));
            }
            
            var compozitor = prod.getElementsByClassName("nume_artist")[0];
            var conditie6 = (( compozitor_input == compozitor.innerHTML) || (compozitor_input=="Nimic"));

            var instrumente = prod.getElementsByClassName("instrumente")[0];
            var instrumente_split = instrumente.innerHTML.split(", ");
            //console.log(luna);
            var conditie7 = false;
            for(elem of lista){
                if(instrumente_split.includes(elem)) {
                     conditie7 = true;
                    }
            }

            var conditie_totala = conditie5 && conditie6 && conditie7 && conditie1 && conditie2 && conditie3 && (conditie4_feminin || conditie4_masculin);
			console.log(conditie_totala);
			if(conditie_totala == false){
				prod.style.display="none";
            }
    
        }
        console.log("\n")
    }


    document.getElementById("i_range").onchange=function(){
        document.getElementById("info_range").innerHTML= this.value;
    }
    
    

    //SORTAREA CARE NU MERGE

    document.getElementById("sort_asc").onclick = function(){
        var container = document.getElementById("gr-prod")
        //var hotels = container.getElementsByClassName("hotel")
        var nume_artist1 = container.children
        console.log(nume_artist1);

        var nume_artist_array = Array.from(nume_artist1)
        console.log(document.getElementsByClassName("nume_artist")[0].textContent);
        //console.log(hotels_array)
        nume_artist_array.sort(function(a,b){
            if(a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == - 1 ){
                console.log("primul if")
                return -1;
            }
            if(a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == 1 ){
                console.log("al doilea if")
                return 1;
            }
            else{
                
                var a_durata = a.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0]
                var b_durata = b.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0]
                console.log("COMPARARE:a="+a_durata)
                console.log("COMPARARE:b="+b_durata)
                return a_durata - b_durata
            }
        })

        for(var i = 0; i < nume_artist_array.length; i++){
            let aux = nume_artist_array[i]
            console.log(aux)
            container.appendChild(aux)
        }
    }


    document.getElementById("sort_desc").onclick = function(){
        var container = document.getElementById("gr-prod")
        //var hotels = container.getElementsByClassName("hotel")
        var nume_artist1 = container.children
        console.log(nume_artist1);

        var nume_artist_array = Array.from(nume_artist1)
        console.log(document.getElementsByClassName("nume_artist")[0].textContent);
        //console.log(hotels_array)
        nume_artist_array.sort(function(a,b)
        {
            if(a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == - 1 ){
                console.log("primul if")
                return 1;
            }
            if(a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == 1 ){
                console.log("al doilea if")
                return -1;
            }
            else{
                
                var a_durata = a.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0]
                var b_durata = b.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0]
                console.log("COMPARARE:a="+a_durata)
                console.log("COMPARARE:b="+b_durata)
                return b_durata - a_durata
            }
        })

        for(var i = 0; i < nume_artist_array.length; i++){
            let aux = nume_artist_array[i]
            console.log(aux)
            container.appendChild(aux)
        }
    }


    //AVERAGE
    document.getElementById("average").onclick = function(){
        var average = 0
        var count = 0

        var container = document.getElementById("gr-prod")
        var melodii = container.children
        var melodii_array = []

        for(var melodie of melodii){
            console.log(melodii)
            if(melodie.style.display != "none"){
                melodii_array[count] = melodie
                count = count + 1
                var melodie_curenta = melodie.getElementsByClassName("durata_melodiei")[0].textContent.split(" ")[0]
                average = average + Number(melodie_curenta)
                console.log("SE ADAUGA PRETUL:"+melodie_curenta)
            }
        }

        if(count > 0){
            average = Number(average/count)
            alert( "The average starting price calculated from the selected hotels is: "+average + " RON")
        }
        else{
            alert( "You need to select some hotels in order to find out the average starting price!")
        }
    }

    document.getElementById("reset_filter").onclick = function(){
        document.getElementById("i_text").value = "";
        document.getElementById("i_range").value = "10000";
        document.getElementById("i_rad1").checked = true;
        document.getElementById("i_rad2").checked = true;
        document.getElementById("i_rad3").checked = true;
        document.getElementById("i_rad4").checked = true;
        document.getElementById("i_rad5").checked = true;
        document.getElementById("i_rad6").checked = true;
        document.getElementById("i_textarea").value = "";
        document.getElementById("i_sel_simplu").value = "Nimic";
        document.getElementById("i_bool1").checked = true;
        document.getElementById("i_bool0").checked = true;
        
        var options = document.getElementById("i_sel_multiplu").options
        for (var opt of options){
            opt.selected = true;
        }
    }




})
