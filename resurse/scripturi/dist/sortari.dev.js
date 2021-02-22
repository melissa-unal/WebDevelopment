"use strict";

window.addEventListener("load", function () {
  document.getElementById("filtrare").onclick = function () {
    var produse = document.querySelectorAll("article");
    var durataMin = document.getElementById("i_range").value;
    var nume_melodie_input = document.getElementById("i_text").value; //PRIMUL INPUT

    var compozitor_input = document.getElementById("i_sel_simplu").value; //SEL SIMPLU

    var sex_artist1 = document.getElementById("i_bool1").checked;
    var sex_artist0 = document.getElementById("i_bool0").checked;
    var optiuni = document.getElementById("i_sel_multiplu").options;
    var gen_muzical_input = document.getElementsByName("gr_rad");
    var descriere_input = document.getElementById("i_textarea").value; //radio check

    radio_checked = "";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = gen_muzical_input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var gen = _step.value;

        if (gen.checked) {
          radio_checked = gen.value;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log(radio_checked); //sel multiplu

    var lista = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = optiuni[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var opt = _step2.value;
        if (opt.selected) lista.push(opt.value);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = produse[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var prod = _step3.value;
        prod.style.display = "block";
        var nume_melodie = prod.getElementsByClassName("nume_melodie")[0];
        var conditie1 = 1;

        if (nume_melodie != "") {
          conditie1 = nume_melodie.innerHTML.toLowerCase().includes(nume_melodie_input.toLowerCase());
        }

        var gen_muzical = prod.getElementsByClassName("gen_muzical")[0];
        var conditie3 = radio_checked == gen_muzical.innerHTML || radio_checked == "nimic";
        var durata_melodiei = prod.getElementsByClassName("durata_melodiei")[0].textContent;
        var conditie2 = parseInt(durata_melodiei) <= parseInt(durataMin);
        var val_sex_artist = prod.getElementsByClassName("sex_artist")[0];
        var conditie4_feminin = sex_artist1 && val_sex_artist.innerHTML == 1;
        var conditie4_masculin = sex_artist0 && val_sex_artist.innerHTML == 0;
        var descriere = prod.getElementsByClassName("descriere")[0];
        var conditie5 = 1;

        if (descriere_input != "") {
          conditie5 = descriere.innerHTML.toLowerCase().includes(descriere_input.toLowerCase());
        }

        var compozitor = prod.getElementsByClassName("nume_artist")[0];
        var conditie6 = compozitor_input == compozitor.innerHTML || compozitor_input == "Nimic";
        var instrumente = prod.getElementsByClassName("instrumente")[0];
        var instrumente_split = instrumente.innerHTML.split(", "); //console.log(luna);

        var conditie7 = false;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = lista[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            elem = _step4.value;

            if (instrumente_split.includes(elem)) {
              conditie7 = true;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var conditie_totala = conditie5 && conditie6 && conditie7 && conditie1 && conditie2 && conditie3 && (conditie4_feminin || conditie4_masculin);
        console.log(conditie_totala);

        if (conditie_totala == false) {
          prod.style.display = "none";
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    console.log("\n");
  };

  document.getElementById("i_range").onchange = function () {
    document.getElementById("info_range").innerHTML = this.value;
  }; //SORTAREA CARE NU MERGE


  document.getElementById("sort_asc").onclick = function () {
    var container = document.getElementById("gr-prod"); //var hotels = container.getElementsByClassName("hotel")

    var nume_artist1 = container.children;
    console.log(nume_artist1);
    var nume_artist_array = Array.from(nume_artist1);
    console.log(document.getElementsByClassName("nume_artist")[0].textContent); //console.log(hotels_array)

    nume_artist_array.sort(function (a, b) {
      if (a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == -1) {
        console.log("primul if");
        return -1;
      }

      if (a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == 1) {
        console.log("al doilea if");
        return 1;
      } else {
        var a_durata = a.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0];
        var b_durata = b.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0];
        console.log("COMPARARE:a=" + a_durata);
        console.log("COMPARARE:b=" + b_durata);
        return a_durata - b_durata;
      }
    });

    for (var i = 0; i < nume_artist_array.length; i++) {
      var aux = nume_artist_array[i];
      console.log(aux);
      container.appendChild(aux);
    }
  };

  document.getElementById("sort_desc").onclick = function () {
    var container = document.getElementById("gr-prod"); //var hotels = container.getElementsByClassName("hotel")

    var nume_artist1 = container.children;
    console.log(nume_artist1);
    var nume_artist_array = Array.from(nume_artist1);
    console.log(document.getElementsByClassName("nume_artist")[0].textContent); //console.log(hotels_array)

    nume_artist_array.sort(function (a, b) {
      if (a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == -1) {
        console.log("primul if");
        return 1;
      }

      if (a.getElementsByClassName("nume_artist")[0].textContent.localeCompare(b.getElementsByClassName("nume_artist")[0].textContent) == 1) {
        console.log("al doilea if");
        return -1;
      } else {
        var a_durata = a.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0];
        var b_durata = b.getElementsByClassName("durata_melodiei")[0].textContent.trim()[0];
        console.log("COMPARARE:a=" + a_durata);
        console.log("COMPARARE:b=" + b_durata);
        return b_durata - a_durata;
      }
    });

    for (var i = 0; i < nume_artist_array.length; i++) {
      var aux = nume_artist_array[i];
      console.log(aux);
      container.appendChild(aux);
    }
  }; //AVERAGE


  document.getElementById("average").onclick = function () {
    var average = 0;
    var count = 0;
    var container = document.getElementById("gr-prod");
    var melodii = container.children;
    var melodii_array = [];
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = melodii[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var melodie = _step5.value;
        console.log(melodii);

        if (melodie.style.display != "none") {
          melodii_array[count] = melodie;
          count = count + 1;
          var melodie_curenta = melodie.getElementsByClassName("durata_melodiei")[0].textContent.split(" ")[0];
          average = average + Number(melodie_curenta);
          console.log("SE ADAUGA PRETUL:" + melodie_curenta);
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    if (count > 0) {
      average = Number(average / count);
      alert("The average starting price calculated from the selected hotels is: " + average + " RON");
    } else {
      alert("You need to select some hotels in order to find out the average starting price!");
    }
  };

  document.getElementById("reset_filter").onclick = function () {
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
    var options = document.getElementById("i_sel_multiplu").options;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = options[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var opt = _step6.value;
        opt.selected = true;
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  };
});