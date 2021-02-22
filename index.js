var express=require('express')// import modulul express
var path= require('path');

var app=express();//aici am creat serverul

const session = require('express-session')
const formidable = require('formidable');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
var mysql=require('mysql');
var fs=require('fs');

app.use(session({
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
  }));

//aici astept orice tip de cerere (caracterul special * care tine loc de orice sir)

app.set('view engine', 'ejs');//setez drept compilator de template-uri ejs (setez limbajul in care vor fi scrise template-urile)

//setez folderele statice (cele in care nu am fisiere generate prin node)
app.use('/resurse', express.static('resurse'));
app.use('/poze_uploadate', express.static('poze_uploadate'));

console.log(__dirname); //predefinita - calea pe masina serverului
console.log(path.join(__dirname, "resurse"));
app.use(express.static(path.join(__dirname, "resurse")));

// aici astept cereri de forma localhost:8080 (fara nimic dupa)
app.get('/', function(req, res){
	//res.render('pagini/index');//afisez index-ul in acest caz
	res.render("pagini/index",{utilizator:req.session.utilizator});
});


var mysql=require('mysql');
var conexiune=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"proiect"

});
conexiune.connect(function(err){
    if (err) throw err;
    console.log("Ne-am conectat!");
});

//functii utile

function getUtiliz(req){
	var utiliz;
	if(req.session){
		utiliz=req.session.utilizator
	}
	else{utiliz=null}
	return utiliz;
}

conexiune.query("select * from produse", function(err,rezultat,campuri){
    if(err) throw err;
    console.log(rezultat);
        
})




app.set('view engine', 'ejs');//setez drept compilator de template-uri ejs (setez limbajul in care vor fi scrise template-urile)

console.log(__dirname); //predefinita - calea pe masina serverului
console.log(path.join(__dirname, "resurse"));
app.use(express.static(path.join(__dirname, "resurse")));


app.get('/', function(req, res){
    res.render("pagini/index",{utilizator:req.session.utilizator});//afisez index-ul in acest caz
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/produse', function(req, res){

    conexiune.query("select * from produse",function(err,rezultat,campuri){
        if(err) throw err;
        console.log(rezultat);
        res.render('pagini/produse',{produse:rezultat, utilizator:req.session.utilizator});//afisez index-ul in acest caz
    });

});



app.get('/produs/:id', function(req, res){
    var idProdus=req.params.id;

    conexiune.query("select * from produse where id="+idProdus,function(err,rezultat,campuri){
        if(err) throw err;
        console.log(rezultat);
        res.render('pagini/pag_produs',{produs_unic:rezultat[0]});//afisez index-ul in acest caz
    });

});

async function trimiteMail(username, email){
	var transp= nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth:{//date login 
			user:"melissa.unal.TW@gmail.com",
			pass:"cisco12345"
		},
		tls:{
			rejectUnauthorized:false
		}
	});
	//genereaza html
	await transp.sendMail({
		from:"melissa.unal.TW@gmail.com",
		to:email,
		subject:"Bună, "+username,
		text:"Bine ai venit în comunitatea Minstrel's Stream.",
		html:"<h1>Salut!</h1> <p> <span style='background-color: lightblue; font-size: 40px'> Bine ai venit în comunitatea Minstrel's Stream.</span></p>",
	})
	console.log("trimis mail");
}



async function trimiteMailBlocat(username, prenume, nume, email){
	var transp1= nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth:{//date login 
			user:"melissa.unal.TW@gmail.com",
			pass:"cisco12345"
		},
		tls:{
			rejectUnauthorized:false
		}
	});
	//genereaza html

	await transp1.sendMail({
		from:"melissa.unal.TW@gmail.com",
		to:email,
		subject:"Te-am blocat, "+username,
		text:"N-ai fost cuminte, "+prenume+" "+nume+", asa ca te-am blocat!",
		html:"<h1>Te-am blocat!</h1> <p> <span style='background-color: lightblue; font-size: 40px'> N-ai fost cuminte, " +prenume+ " " +nume+ ", asa ca te-am blocat!</span></p>",
	})
	console.log("trimis mail blocat");
}


async function trimiteMailSuma(suma, email){
	var transp= nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth:{//date login 
			user:"melissa.unal.TW@gmail.com",
			pass:"cisco12345"
		},
		tls:{
			rejectUnauthorized:false
		}
	});
	//genereaza html
	var datac=new Date()
	await transp.sendMail({
		from:"melissa.unal.TW@gmail.com",
		to:email,
		subject:"Examen",
		text:"Suma: "+suma,
		html:"<p style=\"color:green\"> Numar mail: "+suma+"</p>",
	})
	console.log("trimis mail");
}


var parolaServer="tehniciweb";
app.post("/inreg",function(req, res){
	var username;
	var formular= formidable.IncomingForm()
	console.log("am intrat pe post");
	
	//nr ordine: 4
	formular.parse(req, function(err, campuriText, campuriFisier){//se executa dupa ce a fost primit formularul si parsat
		console.log("parsare")
		var eroare="";
		console.log(campuriText);
		// var lista_username = `select username from utilizatori`;
		// console.log(lista_username)

		//verificari campuri inainte de comanda + sa nu fie campuri necompletate
		if (campuriText.username == "") {
			eroare += "Username nesetat!";
		}
	
		if (campuriText.nume == "")
			eroare += "Nume nesetat!";
		if (campuriText.prenume == "")
			eroare += "Prenume nesetat!";
		if (campuriText.email == "")
			eroare += "Email nesetat!";
		if (campuriText.parola == "")
			eroare += "Parolă nesetată!";
		
		

		//if (campuriText.parola != campuriText.rparola)
		//	eroare += "Parolele nu coincid!"; //verificare doar la client? cum adica
		// if (campuriText.username.value.match(/^[A-z\s\-]+/));
		// verificare daca exista deja username-ul in tabelul de utilizatori

		if(eroare==""){
			//daca nu am erori procesez campurile
			// conexiune.query("select username from utilizatori", function(err, rezultat, campuri){
			// 	console.log(rezultat);})

			if (campuriText.username != "") {
				console.log("	Intra in if si verifica daca username-ul este deja in baza de date");
				var queryString = `select username from utilizatori where username='${campuriText.username}'`;
				console.log(queryString);
				conexiune.query(queryString, function(err, rez, campuri){
							if (err) {
								console.log(err);
								throw err;
								
							}
							console.log(rez)
							if (rez.length > 0) {
								eroare += "Exista deja un utilizator cu acest username";
								res.render("pagini/inregistrare_user",{err:eroare,raspuns:"Completati corect campurile"});
							}
							else {
								var avatarPath;
								if(campuriFisier.poza) {
									var avatarPath = "/resurse/poze_uploadate/" + copie_username + "/" + campuriFisier.poza.name;
								}
								var comanda = `insert into utilizatori (username, nume, prenume, parola, email, cale_imagine) values(${campuriText.username},${campuriText.nume}, ${campuriText.prenume}, ${parolaCriptata}, ${campuriText.email}, '${avatarPath}') `;
								console.log(comanda);
								conexiune.query(comanda, function(err, rez, campuri){
								if (err) {
									console.log(err);
									throw err;
								}
								trimiteMail(campuriText.username, copie_email);
								console.log("ceva");
								res.render("pagini/inregistrare_user",{err:"",raspuns:"Date introduse"});
							}
						)
					}
				})
			}

			var parolaCriptata = mysql.escape(crypto.scryptSync(campuriText.parola, parolaServer, 32).toString("ascii"));
			var copie_email = campuriText.email
			var copie_username = campuriText.username;
            campuriText.username = mysql.escape(campuriText.username);
            campuriText.nume = mysql.escape(campuriText.nume);
            campuriText.prenume = mysql.escape(campuriText.prenume);
			campuriText.email = mysql.escape(campuriText.email);

		
		}
		else{
			res.render("pagini/inregistrare_user",{err:eroare,raspuns:"Completati corect campurile"});
		}
	})
	//nr ordine: 1
	formular.on("field", function(name,field){
		if(name=='username')
			username=field;
		console.log("camp - field:", name)
	});
	
	//nr ordine: 2
	formular.on("fileBegin", function(name,fisier){
		console.log("inceput upload: ", fisier);
		if(fisier && fisier.name!=""){
			//am  fisier transmis
			var cale=__dirname+"/resurse/poze_uploadate/"+username
			if (!fs.existsSync(cale)) {
				fs.mkdirSync(cale);
			}
			fisier.path=cale+"/"+fisier.name;
			console.log(fisier.path);
		}
	});
	
	//nr ordine: 3
	formular.on("file", function(name,field){
		console.log("final upload: ", name);
	});
});


//-------------------------------- logare si delogare utilizator ---------------------------------------


app.post("/login",function(req, res){
	var formular= formidable.IncomingForm()
	console.log("am intrat pe login");
	
	formular.parse(req, function(err, campuriText, campuriFisier) {//se executa dupa ce a fost primit formularul si parsat

		var parolaCriptata=mysql.escape(crypto.scryptSync(campuriText.parola,parolaServer,32).toString("ascii"));
		campuriText.username=mysql.escape(campuriText.username)

		//var nu_e_blocat=`select * from utilizatori where blocat = 0`;
		//conexiune.query(nu_e_blocat, function(err,rez,campuri) {
		//if (nu_e_blocat != null){

		var comanda=`select id, username, nume, prenume, email, parola, data_inregistrare, rol, blocat, cale_imagine from utilizatori where username=${campuriText.username} and parola=${parolaCriptata} and blocat = 0`;
		conexiune.query(comanda, function(err, rez, campuri){
			if (err) {
				console.log(err);
				throw err;
			}
			console.log(comanda);
			if(rez && rez.length==1){
				req.session.utilizator={
					id:rez[0].id,
                    username:campuriText.username,
                    nume:rez[0].nume,
                    prenume:rez[0].prenume,
                    email:rez[0].email,
                    data_inregistrare:rez[0].data_inregistrare,
                    rol:rez[0].rol,
                    blocat:rez[0].blocat,
                    cale_imagine:rez[0].cale_imagine
				}
				res.render("pagini/index",{utilizator:req.session.utilizator});
			} else {
				//res.render("pagini/index");
				res.render("pagini/index",{err:"",raspuns:"Ai introdus credentialele gresit sau esti blocat!"});
			}
		}); //se inchide conexiune query

		// var comanda=`select id, username, nume, prenume, email, parola, data_inregistrare, rol, blocat, cale_imagine from utilizatori where username=${campuriText.username} and parola=${parolaCriptata} and blocat = 1`;
		// conexiune.query(comanda, function(err, rez, campuri){
		// 	res.render("pagini/index",{err:"",raspuns:"Pisi esti blocat"});
		// });
		

		//}//se inchide if-ul facut de mine

		//   else {
		//   	alert("Esti blocat!")
		//   }

		// }); //se inchide conexiune query facut de mine

	});
});

app.get('/logout', function(req, res){
	console.log("logout");
	req.session.destroy();
	res.render("pagini/index");
});


//-------------------------------- actiunile admin-ului: afisare si stergere utilizator ---------------------------------------

app.get('/useri', function(req, res){
	
	if(req.session && req.session.utilizator && req.session.utilizator.rol=="admin"){
        conexiune.query("select * from utilizatori",function(err, rezultat, campuri){
		if(err) throw err;
		console.log(rezultat);
		res.render('pagini/useri',{useri:rezultat, utilizator:getUtiliz(req)});//afisez index-ul in acest caz
	});
	} else{
		res.render('pagini/eroare',{mesaj:"Nu aveti acces", utilizator:req.session.utilizator});
	}

});



app.post("/block_user",function(req, res){
	if(req.session && req.session.utilizator && req.session.utilizator.rol=="admin"){

	var formular= formidable.IncomingForm()
	console.log("am intrat pe login");
	
	formular.parse(req, function(err, campuriText, campuriFisier){

		var comanda=`update utilizatori set blocat = 1 where id='${campuriText.id}' `;
		console.log("Utilizatorul a fost blocat!");
		conexiune.query(comanda, function(err, rez, campuri){
			console.log("Se intra in conexiune!");
			trimiteMailBlocat(campuriText.username,campuriText.prenume,campuriText.nume, campuriText.email);
		});
	});
	}
	res.render("pagini/index",{utilizator:req.session.utilizator});

	
});

app.post("/unblock_user",function(req, res){
	if(req.session && req.session.utilizator && req.session.utilizator.rol=="admin"){
	var formular= formidable.IncomingForm()
	console.log("am intrat pe login");
	
	formular.parse(req, function(err, campuriText, campuriFisier){
		var comanda=`update utilizatori set blocat = 0 where id='${campuriText.id}' `;
		conexiune.query(comanda, function(err, rez, campuri){
		});
	});
	}
	res.render("pagini/index",{utilizator:req.session.utilizator});
	
});


//SIMULARE EXAMEN
app.get('/carti', function(req, res) {

    conexiune.query("select * from carti", function(err, rezultat, campuri) {
        if (err) throw err;
        //console.log(rezultat);
        res.render('pagini/carti', { carti: rezultat }); //afisez index-ul in acest caz
    });

});


//cerere serviciu
app.get('/galerie-statica', function(req, res){
	//res.render('pagini/galerie-statica');
	res.render("pagini/galerie-statica",{utilizator:req.session.utilizator});
});

app.get('/galerie-animata', function(req, res){
	//res.render('pagini/galerie-animata');
	res.render("pagini/galerie-animata",{utilizator:req.session.utilizator});
});


//incercare
app.get('/index', function(req, res){
	//res.render('pagini/galerie-statica');
	res.render("pagini/index",{utilizator:req.session.utilizator});
});



app.post("/trimitemail_model2",function(req, res){
	var formular= formidable.IncomingForm()
	if(!req.session.sumaPretCarti)
		req.session.sumaPretCarti=0;
	else
		
	formular.parse(req, function(err, campuriText, campuriFisier){//se executa dupa ce a fost primit formularul si parsat
		var carte=campuriText.titlu_carte;
		var email=campuriText.email_model2;

		trimiteMailSuma(req.session.sumaPretCarti,email);
		res.redirect("/carti")
	});
});

//aici astept orice tip de cerere (caracterul special * care tine loc de orice sir)
/*app.get('/*', function(req, res){

    res.render('pagini/'+req.url, function(err, rezRandare){
        if(err){//intra doar cand avem eroare
            if(err.message.includes("Failed to lookup view"))
                res.status(404).render('pagini/404');
            else
                throw err;
        }
        else{
            console.log(rezRandare);
            res.send(rezRandare);
        }
    });//afisez pagina ceruta dupa localhost:8080
    //de exemplu pentru localhost:8080/pag2 va afisa fisierul /pag2 din folderul pagini
    console.log(req.url);//afisez in consola url-ul pentru verificare
});*/

app.get('/extraterestri', function(req, res){

    conexiune.query("select * from extraterestri",function(err,rezultat,campuri){
		if(err) throw err;
        res.render('pagini/extraterestri',{extraterestri:rezultat});
    });

});



app.listen(8080);//serverul asculta pe portul 8080
console.log("A pornit serverul pe portul 8080");//afisez in consola un mesaj sa stiu ca nu s-a blocat


//aici astept orice tip de cerere (caracterul special * care tine loc de orice sir)
app.get('/*', function(req, res){

    res.render('pagini/'+req.url, function(err, rezRandare){
        if(err){//intra doar cand avem eroare
            if(err.message.includes("Failed to lookup view"))
                res.status(404).render('pagini/404');
            else
                throw err;
        }
        else{
            console.log(rezRandare);
            res.send(rezRandare);
        }
    });//afisez pagina ceruta dupa localhost:8080
    //de exemplu pentru localhost:8080/pag2 va afisa fisierul /pag2 din folderul pagini
    console.log(req.url);//afisez in consola url-ul pentru verificare
});