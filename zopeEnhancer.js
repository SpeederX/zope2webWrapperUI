class ZopeJSEnhancerAPI {

     dependencies = [{
            "type":"js",
            "url":"https://code.jquery.com/jquery-3.5.1.js"
        },
        {
            "type":"js",
            "url":"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.js"
        },
        {
            "type":"css",
            "url":"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.css"
        },
    ];

    constructor(window,document,verboseMode){
        //this.dependencies = ZopeJSEnhancerAPI.getDependencies();

        this.verboseMode = verboseMode || false;

        this.consoleDebug('|------ ZopeJSEnhancerAPI -------|');
        this.consoleDebug('|**------ INIT -------**|');

        // load all dependencies
        this.loadDependency(this.dependencies);

        // bound window to istance
        this._window = window;
        this._document = document;

        // add istance to window
        //window.ZopeJSEnhancerAPI = this;

        // init zope objects
        this._zope = {};
        this.getZopeReferences();

        this._zope.main.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope main");
        });

        this._zope.menu.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope menu");
        });

        this._zope.header.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope header");
        });

        this.consoleDebug('|**------ END -------**|');

        return this;
    }
    getZopeReferences(){
        // init zope main
        this._zope.main = document.querySelectorAll('frame[name=manage_main]')[0];
        this._zope.main.window = this._zope.main.contentWindow;
        this._zope.main.document = this._zope.main.contentDocument;

        // init top frame
        this._zope.header = document.querySelectorAll('frame[name="manage_top_frame"]')[0];
        this._zope.header.window = this._zope.header.contentWindow;
        this._zope.header.document = this._zope.header.contentDocument;

        // init zope menu
        this._zope.menu = document.querySelectorAll('frame[name=manage_menu]')[0];
        this._zope.menu.window = this._zope.menu.contentWindow;
        this._zope.menu.document = this._zope.menu.contentDocument;
    }
    consoleDebug(message){
        if(this.verboseMode){
            message = message || "some message...";
            console.log(message);
            return true;
        }

    }

    static loadStyles(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(link);
        return link;
    }

    static loadJS(url) {
		var link = document.createElement("script");
		link.type = "text/javascript";
		link.src = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
        return link;
    }

    loadDependency(dependency){
        // carico tutte le dipendenze
        var item = dependency[0],
            istance = this,
            scriptLoaded;

        this.consoleDebug('|**------ loading:' + item.url + '-------**|');
        // lancio il loading delle librerie.
        if(item.type == 'js'){
            scriptLoaded = ZopeJSEnhancerAPI.loadJS(item.url);
        } else if(item.type == 'css') {
            scriptLoaded = ZopeJSEnhancerAPI.loadStyles(item.url);
        }
        if(dependency.length> 1){
            scriptLoaded.addEventListener(
                "load",
                function() {
                    // cancello il penultimo elemento
                    istance.consoleDebug('|**------ Dependency Loaded,Next one -------**|');
                    dependency.shift();
                    istance.loadDependency(dependency);

                }
            );
        } else if (dependency.length == 1){
            // se sono all'ultima dipendenza, carico "finalmente" lo script principale.
                   //Window.initZopeEnhancer();


                   //this.postLoadOperations();
                   istance.consoleDebug('|**------ All dependencies loaded -------**|');
                   this.postLoadOperations();
        }
    }
    /* operazioni eseguibili post caricamento delle dipendenze */
    postLoadOperations(){
        // describe what to do
        console.log("postLoadOperations");
    }

    mainObjectInit(){
        var istance = this;
        if(window.$(this._zope.main.document).find("textarea").length){
            // se c'è un editor
            /*var textArea = $(Window.fileListFrameObjB[0].contentDocument).find("textarea")[0];
        var textEditor = CodeMirror.fromTextArea(textArea, {
            lineNumbers: true
        });*/
        } else {
            // se invece mostriamo la lista dei file
            this._zope.main.addEventListener('load',function(){
                // al caricamento del frame con lista oggetti
                console.log("manage_main loaded");
                istance.getZopeReferences();
                ZopeJSEnhancerAPI.enableSpoilerCode(istance._zope.main.document);
            });
        }

//       this._zope.main.addEventListener('load',function(){
//            // al caricamento del frame con menù
//            console.log("manage_main loaded");
//        });
    }
    /* inizializza il menù e i suoi eventi*/
    menuObjectInit(){
        var istance = this;
//        setTimeout(function(){
//
//            // ogni voce di menù cliccata deve permette di caricare il codice nella lista dei file che mostra
//            istance.getMenuObjects().each((index,item)=>{
//                item.addEventListener("click",function(){
//                    console.log("begin enableSpoilerCode");
//                    istance._zope.main.addEventListener('load',function(){
//                    //setTimeout(function(){
//                        console.log("exec enableSpoilerCode");
//                        ZopeJSEnhancerAPI.enableSpoilerCode(istance._zope.main.document);
//                    //},1000);
//                    });
//                    console.log("end enableSpoilerCode");
//                },false);
//            });
//
//            // per ogni link del menù e voce espandibile devo riattaccare gli eventi.
//            // aspetto 1 secondo dopo il click. il click triggera il reload del frame
//            istance.getMenuExplode().each((index,item)=>{
//                item.addEventListener("click",function(){
//                    console.log("begin handleMenuReload");
//                    istance._zope.main.addEventListener('load',function(){
//                    //setTimeout(function(){
//                        console.log("exec handleMenuReload");
//                        ZopeJSEnhancerAPI.menuObjectInit();
//                    //},1000);
//                    });
//                    console.log("end handleMenuReload");
//                },false);
//            });
//        },500);
    }
    /* abilitazione della funzionalità per spoilerare il codice in riga della lista oggetti */
    static enableSpoilerCode(doc){
        var linkExternalEdit = doc.querySelectorAll(".list-item a[title='Edit using external editor']");
        // selezione di tutti gli oggetti, con riga, all'interno del frame manage_main ( lista dei file ) con titolo che indica che sia un file editabile
        linkExternalEdit.forEach(function(item,index){

            // prendo il riferimento della riga della lista file
            var fileRowTr = item.parentElement.parentElement.parentElement;

            if( 1 == 2){
                var lclTd = $(fileRowTr).find("td:eq(0)")[0];
                //console.log(clonedTd);
                fileRowTr.prepend(lclTd.cloneNode(true));//,fileRowTr.firstChild);

                var newTd = $(fileRowTr).find("td:eq(0)").get(0);
                newTd.innerHTML = '<a id="el-'+index+'" href="#" ><img class="show_hide" src="/p_/pl" alt="+" border="0"></a>';

            } else {
                var newA = document.createElement('a'),
                    newImg = document.createElement('img'),
                    newCell = document.createElement('td');
                newImg.setAttribute('src','/p_/pl');
                newImg.setAttribute('class','show_hide');
                newImg.setAttribute('border','0');
                newImg.setAttribute('alt','+');

                newA.setAttribute('id','el-'+index);
                newA.setAttribute('href','#');
                newA.append(newImg);
                newCell.append(newA);
                // per il primo child element, in cui esiste la checkbox per selezionare il file, vado in override e metto l'immagine con "+" o "-"
                //fileRowTr.firstElementChild.after(newCell);
                fileRowTr.firstElementChild.append(newA);
            }

            // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
            doc.getElementById('el-'+index).addEventListener("click", function(){

                // funzione che permette di fare la chiamata AJAX in funzione dell'url sorgente e poi gestisce il fatto di mostrare all'utente il tutto dentro a una nuova riga
                ZopeJSEnhancerAPI.showCode(''+item.getAttribute('href')+'',fileRowTr);
                // formatto e aggiungo codemirror ;)
                /*setTimeout(function(){
                var editor = CodeMirror.fromTextArea($(fileRowTr.nextElementSibling).find('textarea')[0], {
                    lineNumbers: true
                });
                //editor.setSize(500, 300);
            },500);*/

            }, false);
        })
    }
    /* caricamento del codice dentro a una nuova riga */
    static showCode(url,tr){
        var nextTr = tr.nextElementSibling;

        // due casistiche: classe CSS sourceCode non settata per la riga successiva, significa che non ho inizializzato la riga.
        if(nextTr.className.indexOf('sourceCode') == -1 ){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    tr.after(tr.cloneNode());
                    tr.nextElementSibling.setAttribute('class','sourceCode');

                    var sourceTd = document.createElement('td'),
                        sourceTextArea = document.createElement('textarea'),
                        sourcePre = document.createElement('pre'),
                        sourceCode = document.createElement('code');

                    sourceTd.setAttribute('colspan','5');

                    sourceTextArea.setAttribute('class','codeEditor');
                    sourceCode.innerText = xhttp.responseText; // non necessario se si istanzia l'oggetto "code" --> escapeHtml(xhttp.responseText);
                    sourcePre.append(sourceCode);

                    //sourceTextArea.value = xhttp.responseText; // non necessario se si istanzia l'oggetto "code" --> escapeHtml(xhttp.responseText);
                    sourceTd.append(sourcePre);

                    tr.nextElementSibling.append(sourceTd);
                    /*var editor = CodeMirror.fromTextArea($(tr.nextElementSibling).find('textarea')[0], {
                    lineNumbers: true
                });
                editor.setSize(500, 300);*/
                    tr.nextElementSibling.setAttribute('style','visibility: visible;display:table-row;');
                    var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
                    imgToUpdate.setAttribute('src','/p_/mi');
                    imgToUpdate.setAttribute('alt','-');
                    imgToUpdate.setAttribute('display','block');
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        } else {
            var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
            if(nextTr.style.visibility == 'visible'){
                nextTr.setAttribute('style','visibility: hidden;display:none;');
                imgToUpdate.setAttribute('src','/p_/pl');
                imgToUpdate.setAttribute('alt','+');
            } else {
                nextTr.setAttribute('style','visibility: visible;display:table-row;');
                imgToUpdate.setAttribute('src','/p_/mi');
                imgToUpdate.setAttribute('alt','-');
            }
        }
    }
    /* lista delle voci di menù, espandibili */
    getMenuExplode(){
        return window.$(this._zope.menu.document).find('a[href^="manage_menu"]');
    }
    /* lista delle voci di menù che puntano a aggiornare il manage_main */
    getMenuObjects(){
        console.log(this._zope.menu.document);
        return window.$(this._zope.menu.document).find('a[href$="manage_workspace"][target="manage_main"]');
    }

}



(function() {
    "use strict";

    /* definisco dopo aver inizializzato le dipendenze e il costruttore, che cosa fare */
    ZopeJSEnhancerAPI.prototype.postLoadOperations = function(){
        this.consoleDebug("|------ loading postLoadOperations -------|");
        this._zope.menu.links = this.getMenuObjects();

        // binding eventi al menù
        this.menuObjectInit();

        /* binding eventi alla lista oggetti */
        this.mainObjectInit();
        this.consoleDebug("|------ ended postLoadOperations -------|");
        ZopeJSEnhancerAPI.enableSpoilerCode(this._zope.main.document);
    };

    /*  istanzio la classe */
    window.ZopeIstance = new ZopeJSEnhancerAPI(window,document,true);


})();