class ZopeJSEnhancerAPI {
    burgerIcon = "https://sol3.diviteldatacenter.com/public/img/32px-Hamburger_icon.svg.png";
    zopeLogo = "https://sol3.diviteldatacenter.com/public/img/zope_logo.jpg";
    static aceConfigLcl = {
        "selectionStyle": "line",
//        "target": document.querySelector("textarea") || document.querySelector("[name='manage_main'] ").contentDocument.querySelector("textarea"),
        "highlightActiveLine": true,
        "highlightSelectedWord": true,
        "readOnly": false,
        "copyWithEmptySelection": false,
        "cursorStyle": "ace",
        "mergeUndoDeltas": true,
        "behavioursEnabled": true,
        "wrapBehavioursEnabled": true,
        "autoScrollEditorIntoView":true,
        "enableAutoIndent": true,
        "keyboardHandler": null,
        "showLineNumbers": true,
        "minLines":2,
        "maxLines":25,
        "hScrollBarAlwaysVisible": false,
        "vScrollBarAlwaysVisible": false,
        "highlightGutterLine": true,
        "animatedScroll": false,
        "showInvisibles": false,
        "showPrintMargin": false,
        "printMarginColumn": 80,
        "printMargin": true,
        "fadeFoldWidgets": false,
        "showFoldWidgets": true,
        "displayIndentGuides": true,
        "showGutter": true,
        "fontSize": "12px",
        "scrollPastEnd": 0,
        "theme": "ace/theme/monokai",
        "maxPixelHeight": 0,
        "useTextareaForIME": true,
        "scrollSpeed": 2,
        "dragDelay": 0,
        "dragEnabled": true,
        "focusTimeout": 0,
        "tooltipFollowsMouse": true,
        "firstLineNumber": 1,
        "overwrite": true,
        "newLineMode": "auto",
        "useWorker": true,
        "useSoftTabs": true,
        "navigateWithinSoftTabs": true,
        "tabSize": 4,
        "wrap": true,
        "indentedSoftWrap": true,
        //"foldStyle": "manual",
        "mode": "ace/mode/python",
        "enableMultiselect": true,
        "enableBlockSelect": true,
        "baseUrl": "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/"
    };
     customMenuConfig = {
        "zopeFrameSet": document.body,
        "triggerAttach": function(){
            ZopeJSEnhancerAPI.mainObjectInit();
        },
        "features":{
//            "codeEditor":{
//                "type":"checkbox",
//                "id":"codeEditor",
//                "data-on":"Code editor on",
//                "data-off":"Code editor off",
//                "onChange":function(){
//                    console.log("codeEditor");
//                }
//            },
            "searchSize":{
                "type":"textWButton",
                "id":"searchSize",
                "onClick":function(){
                    // add batch_size to url with an input field to override it
                    var findButton = ZopeIstance.getCurrentMainSearch();
                    if(findButton){
                        // siamo in una pagina con la ricerca attiva?
                        // ho già aggiunto il parametro nascosto?
                        var hiddenInput = ZopeIstance.getZopeMainDocument().querySelector(".customBatchSize");
                        if(!hiddenInput){
                            // se non è stato abilitato
                            var newBatchSizeInput = document.createElement("input");
                            ZopeJSEnhancerAPI.setAttributes(newBatchSizeInput,{
                                "class":"customBatchSize",
                                "value":this.querySelector("input").value,
                                "name":"batch_size",
                                "type":"hidden"
                            });
                            ZopeIstance.getZopeMainDocument().querySelector("form").append(newBatchSizeInput);
                            //ZopeIstance.getCurrentMainSearch().click()
                        } else {
                            hiddenInput.value = this.querySelector("input").value;
                            ZopeIstance.getCurrentMainSearch().click();
                        }
                    }
                }
            },
            "showAll":{
                "type":"checkbox",
                "id":"codeInline",
                "data-on":"Show results",
                "data-off":"Hide results",
                "onChange":function(){
                    // add batch_size to url with an input field to override it
                    var findButton = ZopeIstance.getCurrentMainSearch();
                    if(findButton){
                        // siamo in una pagina con la ricerca attiva?
                        // cerco tutte le righe che posso aprire e le apro
                        ZopeIstance.getZopeMainDocument().querySelectorAll(".show_hide").forEach(function(item,index){
                            item.closest("a").click();
                        });
                    }
                }
            },
            "codeInline":{
                "type":"checkbox",
                "id":"codeInline",
                "data-on":"Enable spoiler",
                "data-off":"Disable spoiler",
                "onChange":function(event){

                    var isChecked = event.target.checked;
                    ZopeJSEnhancerAPI.enableSpoilerCode(event.target.checked);


                }
            }
        }
    };
     dependencies = [{
            "type":"js",
            "url":"https://code.jquery.com/jquery-3.5.1.js"
        },
        {
            "type":"js",
            "url":"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js"
        },
        {
            "type":"js",
            "url":"https://cdn.jsdelivr.net/npm/table-to-json@1.0.0/lib/jquery.tabletojson.min.js"
        },
        {
          "type":"js",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.bundle.min.js"
        },
        {
          "type":"css",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.min.css"
        },
        {
          "type":"js",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap4-toggle.min.js"
        },
        {
          "type":"css",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap4-toggle.min.css"
        },
        {
          "type":"js",
          "url":"https://unpkg.com/ace-diff@3.0.3/dist/ace-diff.min.js"
        },
        {
          "type":"css",
          "url":"https://unpkg.com/ace-diff@^3.0.3/dist/ace-diff.min.css"
        },
        {
          "type":"css",
          "url":"https://unpkg.com/ace-diff@^3.0.3/dist/ace-diff-dark.min.css"
        },
    ];

    extraDependencies = [

    ];

    zopeMenuDependencies = [{
            "type":"js",
            "url":"https://code.jquery.com/jquery-3.5.1.js"
        },

        {
          "type":"js",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.bundle.min.js"
        },
        {
          "type":"css",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.min.css"
        },
        {
          "type":"js",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap4-toggle.min.js"
        },
        {
          "type":"css",
          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap4-toggle.min.css"
        },
        ];
    /*
        inizializzazione qui, di tutti i riferimenti zope:
        - manage_workspace o manage_main
        - manage_top_frame
        - manage_menu
        - isFirstLoad: variabile usata per verificare se è stato eseguito l'init una volta
        - loadDependency: carica tutte le dipendenze definite in this.dependencies nel contesto "window"
    */
    constructor(window,document,verboseMode){
        this.burger = {
            hasMenu:false,
            hasBurger:false,
            state:false,
        }
        this.verboseMode = verboseMode || false;
        this.isFirstLoad = true;

        this.consoleDebug('|------ ZopeJSEnhancerAPI -------|');
        this.consoleDebug('|**------ INIT -------**|');

        // load all dependencies for the main document
        this.loadDependency(this.dependencies,document,true);

        // bound window to istance
        this._window = window;
        this._document = document;

        // init zope objects
        this._zope = {};
        this.getZopeReferences();

//      eventi a cui attaccarsi come sample
//        this._zope.main.addEventListener('load',function(){
//                // al caricamento del frame con main
//                console.log("init zope main");
//        });
//
//        this._zope.menu.addEventListener('load',function(){
//                // al caricamento del frame con menu
//                console.log("init zope menu");
//        });
//


        this.consoleDebug('|**------ END -------**|');

        return this;
    }
    overrideHeader(){
        var header = this.getZopeHeaderDocument(),
            logoCell = header.querySelectorAll("td")[0],
            zopeLogo = this.createImageEl({
                "src":this.zopeLogo,
                "width":"60px",
                "height":"",
                "style":"mix-blend-mode: lighten;"
            });
        /*
            let's get the hamburger in and the new logo, shall we?
        */

        logoCell.innerHTML = "";
        logoCell.append(zopeLogo);
        header.querySelector("body").setAttribute('bgcolor','#FF66000');

    }
    generateCustomMenu(){
        var newFrameSet = document.createElement('frameset'),
            newFrame = document.createElement('frame'),
            istance = this,
            actualFrameSet = document.body;
        this._zope.extraMenu = this.customMenuConfig;

        // configuring new frameset and new frame
        ZopeJSEnhancerAPI.setAttributes(newFrameSet,{
            'cols':'200,*',
            'id':'customFrameSet'
        });
        newFrame.setAttribute('id','customMenu');

        // appending new menu frame
        newFrameSet.appendChild(newFrame);

        // appending old frameset to the new one, to include zope as a subobject
        newFrameSet.appendChild(this._zope.extraMenu.zopeFrameSet);

        //override current document page
        document.body = newFrameSet;

        // assign object structure
        this._zope.extraMenu.pageFrameSet = document.querySelectorAll("#customFrameSet")[0];
        this._zope.extraMenu.zopeEnhanceMenu = document.querySelectorAll("#customMenu")[0];

        this.getZopeHeaderFrame().addEventListener('load',function(){
                // al caricamento del frame con header
                //console.log("init zope header");
                istance.overrideHeader();
        });
        // trigger to attach to menu generation
        this._zope.extraMenu.triggerAttach();

//		this.addMenuFeatures.call(this,this.getCustomMenuBody());
//		// al caricamento del frame con menù
//		console.log("init custom menu");
//		this.loadDependency.call(this,this.zopeMenuDependencies,this.getCustomMenuDocument(),false);
    }
    createImageEl(props){
        let newImageEl = document.createElement('img');
        ZopeJSEnhancerAPI.setAttributes(newImageEl,props);
        return newImageEl;
    }
    addMenuFeatures(targetToAttach){
        var menuTable = document.createElement("table"),
            menuThead = document.createElement("thead"),
            menuHeader = document.createElement("th"),
            menuHamburger = document.createElement("th"),
            istance = this,
            imageHamburger = this.createImageEl({
                'src':this.burgerIcon,
                'alt':'Hamburger',
                'onclick':function(){
                    istance.handleHamburger();
                },
                'class':'burger',
                'style':'padding:10px;'
            }),
        menuTbody = document.createElement("tbody");


        menuTable.setAttribute('style','padding:10px;');
        menuTable.setAttribute('class','tableCustomFunctions');
        menuThead.setAttribute('scope','col');
        menuHeader.innerHTML = 'Funzioni';

        menuHamburger.append(imageHamburger);

        menuThead.append(menuHeader);
        menuThead.append(menuHamburger);
        menuTable.append(menuThead);

        // adding features button to the body of the table
        for( var featureName in this._zope.extraMenu.features){
            var menuTr = document.createElement("tr"),
                menuTd = document.createElement("td"),
                featureConfig = this._zope.extraMenu.features[featureName];

            // adding features to the actual menu
            this.addMenuFeature(featureConfig['type'],featureConfig,menuTd);
            menuTd.setAttribute('colspan','2');
            menuTr.append(menuTd);
            menuTbody.append(menuTr);
        };
        menuTable.append(menuTbody);
        targetToAttach.append(menuTable);
    }

    // cycles through each depth level and instantiate elements if needed recursively
    static createElAndSetAttributes(attrs) {
        if(typeof(attrs) == 'object' && 'element' in attrs){
            // create new dom element
            var elementDoc = document.createElement(attrs['element']);
        } else{
            console.log("Nothing to create.");
            console.log(attrs);
            return ;
        }
        // start to assign attributes
        for(var key in attrs) {
            console.log(attrs[key]);
            if(typeof(attrs[key]) == 'object' && 'element' in attrs[key]){
                // create nested element
                var newEl = ZopeJSEnhancerAPI.createElAndSetAttributes(attrs[key]);
                elementDoc.append(newEl);
            } else {
                if(key == 'textContent' && 'element' in attrs && attrs['element'] == 'button'){
                    // assign text to button
                    elementDoc[key] = attrs[key];
                } else {
                    // assigning attribute
                    elementDoc.setAttribute(key, attrs[key]);
                }
            }

        }
        return elementDoc;
    }

    /* default configuration for buttons in the menu*/
    menuDefaultConfig = {
        "checkbox":{
                "element":"input",
                "type":"checkbox",
                "checked":"",
                "data-toggle":"toggle",
                "data-width":"100%",
        },
        "text":{
            "element":"input",
            "type":"text",
            "class":"form-control",
            "placeholder":"Insert some text",
            "aria-label":"",
            "aria-describedby":"basic-addon1"
        },
        "button":{
            "element":"button",
            "type":"button",
            "class":"btn btn-outline-secondary",
            "textContent":"Button"
        },
        "textWButton":{
            "element":"div",
            "class":"input-group mb-3",
            "subDiv":{
                "element":"div",
                "class":"input-group-prepend",
                "subButton":{
                    "element":"button",
                    "type":"button",
                    "class":"btn btn-outline-secondary",
                    "textContent":"Apply"
                },
            },
            "subInput":{
                "element":"input",
                "type":"number",
                "class":"form-control",
                "value":"20",
                "min":"1",
                "max":"9999999",
                "placeholder":"Insert batch size",
                "aria-label":"",
                "aria-describedby":"basic-addon1"
            },
            "placeholder":"Insert some text",
            "aria-label":"",
            "aria-describedby":"basic-addon1"
        }
    };
    addMenuFeature(type,config,targetToAttach){
        // adding new menu toggle
        var type = type || 'checkbox',
            config = config || {},
            targetToAttach = targetToAttach || this.getCustomMenuBody();

        if(typeof(config) !== 'object'){
            console.error('Object wasn\'t config:',typeof(config));
            return false;
        }

        // checking if a default config exists
        if(this.menuDefaultConfig[type]){
            if(type == 'textWButton'){
                var feature = ZopeJSEnhancerAPI.createElAndSetAttributes(this.menuDefaultConfig[type]);
            } else {
                var feature = document.createElement(this.menuDefaultConfig[type]['element']);
                // initializing by loading default config
                ZopeJSEnhancerAPI.setAttributes(feature,this.menuDefaultConfig[type]);
            }

            if(typeof(config.type) !== 'undefined'){
                delete config.type;
                console.warn("Type shouldn't be passed within custom config:",typeof(config.type));
            }

            // then we override with config custom
            ZopeJSEnhancerAPI.setAttributes(feature,config);
        } else {
            console.error('Type not mapped in menuDefaultConfig:',type);
            return false;
        }

        //adds the new object to someother
        targetToAttach.append(feature);
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

    static loadStyles(url,refDocument) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        var head = refDocument.getElementsByTagName("head")[0];
        head.appendChild(link);
        return link;
    }

    static loadJS(url,refDocument) {
		var link = document.createElement("script");
		link.type = "text/javascript";
		link.src = url;
		var head = refDocument.getElementsByTagName("head")[0];
		head.appendChild(link);
        return link;
    }

    loadDependency(dependency,refDocument,postLoad){
        if(dependency == ''){
            return false;
        }
        // carico tutte le dipendenze
        var item = dependency[0],
            istance = this,
            postLoad = postLoad || false,
            scriptLoaded;
        console.log('loadDependency',arguments);
        this.consoleDebug('|**------ loading:' + item.url + '-------**|');
        // lancio il loading delle librerie.
        if(item.type == 'js'){
            scriptLoaded = ZopeJSEnhancerAPI.loadJS(item.url,refDocument);
        } else if(item.type == 'css') {
            scriptLoaded = ZopeJSEnhancerAPI.loadStyles(item.url,refDocument);
        }
        if(dependency.length> 1){
            scriptLoaded.addEventListener(
                "load",
                function() {
                    // loading post functions if there's any
                    console.log(item);
                    if(item.hasOwnProperty("postLoad")){// && typeof(item.postLoad) == 'function'){
                        item.postLoad.call(istance);
                    }
                    // slicing current element which has been processed and going to the next one
                    istance.consoleDebug('|**------ Dependency Loaded,Next one -------**|');
                    istance.loadDependency(dependency.slice(1,),refDocument,postLoad);

                }
            );
        } else if (dependency.length == 1){
            // se sono all'ultima dipendenza, carico "finalmente" lo script principale.
                   //Window.initZopeEnhancer();


                   //this.postLoadOperations();
                   istance.consoleDebug('|**------ All dependencies loaded -------**|');
                   // se false allora non faccio operazioni di post caricamento.
                   if(postLoad){
                    this.postLoadOperations();
                   }

        }
    }
    /* operazioni eseguibili post caricamento delle dipendenze */
    postLoadOperations(){
        // describe what to do
        console.log("postLoadOperations");
    }

    static mainObjectInit(){
            // lista dei file
            ZopeIstance._zope.main.addEventListener('load',function(){
                // al caricamento del frame con lista oggetti
                console.log("manage_main loaded");
                console.log(this);
                // getting the instance updated and edit the references about the object in the main
                ZopeIstance.getZopeReferences();
                ZopeIstance.getFileListAsJSON();
                ZopeJSEnhancerAPI.enableSpoilerCode(ZopeIstance._zope.main.document);
                ZopeIstance.initTabSessionManager();
                ZopeIstance.addNewSession(ZopeIstance.getZopeHeaderDocument(),'File list');
            });
    }
    /* inizializza il menù e i suoi eventi*/
//    menuObjectInit(){
//        var istance = this;
//    }
    static setAttributes(el, attrs) {
        try{
              for(var key in attrs) {
                if(typeof(attrs[key]) == 'function'){
                    el[key.toLowerCase()] = attrs[key];
                } else {
                    el.setAttribute(key, attrs[key]);
                }
              }
        } catch( DOMException )   {
            console.log('setAttributes',attrs,key,attrs[key]);
            console.log(DOMException);
        }
    }
    addSpoilerCell(rowRef,idLink){
        var newA = document.createElement('a'),
            newImg = document.createElement('img'),
            newCell = document.createElement('td');

        ZopeJSEnhancerAPI.setAttributes(newImg,{
                                                    'src':'/p_/pl',
                                                    'class':'show_hide',
                                                    'alt':'+',
                                                    'border':'0',
                                                });

        newA.setAttribute('id',idLink);
        newA.setAttribute('href','#');
        newA.append(newImg);
        newCell.className = "spoiler_cell";
        newCell.append(newA);
        // per il primo child element, in cui esiste la checkbox per selezionare il file, vado in override e metto l'immagine con "+" o "-"
        rowRef.firstElementChild.after(newCell);
    }
    /* abilitazione della funzionalità per spoilerare il codice in riga della lista oggetti */
    static enableSpoilerCode(toEnable){
        var docInst = ZopeIstance.getZopeMainDocument(),
            winInst = ZopeIstance.getZopeMainWindow(),
            //linkExternalEdit = docInst.querySelectorAll(".list-item a[title='Edit using external editor']");
            linkExternalEdit = Object.values(ZopeIstance._zope.mainObjectlist);
        // selezione di tutti gli oggetti, con riga, all'interno del frame manage_main ( lista dei file ) con titolo che indica che sia un file editabile
        linkExternalEdit.forEach(function(item,index){

            // prendo il riferimento della riga della lista file
            var rowRef = item.trRef[0],
                alreadyCreated = (rowRef.querySelector(".show_hide"))?true:false,
                idLink = 'el-' + index,
                fileUrl = item.loadUrl || '',
                selectionCell = rowRef.firstElementChild;
            if(!alreadyCreated){
                ZopeIstance.addSpoilerCell(rowRef,idLink);
            }

            var showButton = rowRef.querySelector(".spoiler_cell");
            if(toEnable){
//                selectionCell.style = "display: none";
//                showButton.style = "display: inline";
                ZopeJSEnhancerAPI.setCssRule(selectionCell,'display','none');
                ZopeJSEnhancerAPI.setCssRule(showButton,'display','inline');
                // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
                docInst.getElementById(idLink).addEventListener("click",function(){
                        ZopeJSEnhancerAPI.showCode(fileUrl,rowRef);
                    },
                false);
            } else {
                ZopeJSEnhancerAPI.setCssRule(selectionCell,'display','inline');
                ZopeJSEnhancerAPI.setCssRule(showButton,'display','none');
//                selectionCell.style = "display: inline";
//                showButton.style = "display: none";
                // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
                docInst.getElementById(idLink).removeEventListener("click",function(){
                        ZopeJSEnhancerAPI.showCode(fileUrl,rowRef);},
                false);
            }
        });
    }
    static setCssRule(el,ruleToSet,value){
        let rules = Object.values(el.style),
            ruleOrig = rules.filter(rule=>(rule==ruleToSet?ZopeJSEnhancerAPI.replaceCssRule(el,ruleToSet,value):false));
        if(!ruleOrig || ruleOrig.length == 0){
            el.style[ruleToSet] = value;
            return true;
        } else {
            return false;
        }
    }
    static replaceCssRule(el,ruleToChange,newValue){
        let rules = Object.values(el.style),
            ruleOrig = rules.filter(rule=>(rule==ruleToChange?true:false));
        if(ruleOrig){
            el.style[ruleToChange] = newValue;
            return true;
        } else {
            return false;
        }
    }
    static aceAsyncLoadfunction(path, callback) {
            // getting the object to append ace source
            var head = doc.querySelector('head') || doc.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            // loading ace source
            s.src = options.baseUrl + "/" + path;
            head.appendChild(s);
            //catching the load of the library
            s.onload = s.onreadystatechange = function(_, isAbort) {
                if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") {
                    s = s.onload = s.onreadystatechange = null;
                    if (!isAbort) callback();
                }
            };
    }
    static divEditorBase = `overflow-y: hidden;
                    overflow-y: hidden;
                    border: 5px solid #777;
                    color: #f00;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    padding: 5px;
                    background-color: darkgray;
                    border-radius: 25px;`;
    static divEditorActive = `overflow-y: hidden;
                    overflow-y: hidden;
                    border: 5px solid red;
                    color: #f00;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    padding: 5px;
                    background-color: orange;
                    border-radius: 25px;`;
    static loadAcefunction(win,doc,textArea,options, callback) {
        var w = win;

        var pending = [textArea];
        var transform = function(el) {
            pending.push(el)
        };
        // carica ace e poi il module
//        ZopeJSEnhancerAPI.aceAsyncLoadfunction("ace.js", function() {
        window.ace.config.loadModule("ace/ext/textarea", function(m) {
            transform = function(el) {
                if (!el.ace) el.ace = m.transformTextarea(el, options);
            };
            pending = pending.forEach(transform);
//            callback && setTimeout(callback);
        });
//        });
//        if (options.target) return transform(options.target);
//        window.addEventListener("click", function(e) {
//            if (e.detail == 3 && e.target.localName == "textarea") transform(e.target);
//        });
    }
    /* caricamento del codice dentro a una nuova riga */
    static showCode(url,tr){
        var nextTr = tr.nextElementSibling,
            toLoad = (nextTr == null || nextTr.className.indexOf('sourceCode') == -1)?true:false;

        // due casistiche: classe CSS sourceCode non settata per la riga successiva, significa che non ho inizializzato la riga.
        if(toLoad){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    tr.after(tr.cloneNode());
                    tr.nextElementSibling.setAttribute('class','sourceCode');

                    var sourceTd = document.createElement('td'),
                        sourceTextArea = document.createElement('textarea'),
                        sourceDivEditor = document.createElement('div'),
                        sourceCode = document.createElement('code');

                    sourceTd.setAttribute('colspan','5');

                    sourceTextArea.setAttribute('id','codeEditor');
//                    sourceDivEditor.innerText = "placeholder";
//                    var divEditorStyles = '';
//                    divEditorStyles += 'overflow-y: hidden;';
//                    // divEditorStyles += 'height: 700px;';
//                    divEditorStyles += 'overflow-y: hidden;';
//                    divEditorStyles += 'border: 5px solid #777;';
//                    divEditorStyles += 'color: #f00;';
//                    divEditorStyles += 'align-items: center;';
//                    divEditorStyles += 'display: flex;';
//                    divEditorStyles += 'flex-direction: column;';
//                    divEditorStyles += 'flex-wrap: wrap;';
//                    divEditorStyles += 'padding: 5px;';
//                    divEditorStyles += 'background-color: darkgray;';
//                    divEditorStyles += 'border-radius: 25px;';
//                    sourceDivEditor.setAttribute('style',ZopeJSEnhancerAPI.divEditorActive);

                    var generatedId = parseInt(Math.random()*1000000);
                    sourceDivEditor.setAttribute('class','codeEditor-' + generatedId + ' divEditor');
                    sourceTd.append(sourceDivEditor);

                    var saveBtn = document.createElement("button"),
                        showDiff = document.createElement("button"),
                        rollbackModification = document.createElement("button"),
                        aceDiffDiv = document.createElement("div");


//                    aceDiffDiv.setAttribute('class','codeDiff-'+generatedId);

//                    saveBtn.innerText = 'Salva';
//                    showDiff.innerText = 'Diff';
//                    showDiff.onclick = function(ev){
//                    debugger;
//                        new AceDiff({
//                            ace: window.ace, // You Ace Editor instance
//                            element: this.className,
//                            left: {
//                                content: 'your first file content here',
//                            },
//                            right: {
//                                content: 'your second file content here',
//                            },
//                        });
//                    };
//                    rollbackModification.innerText = 'Ripristina';

//                    sourceTd.append(aceDiffDiv);
//                    sourceTd.append(saveBtn);
//                    sourceTd.append(showDiff);
//                    sourceTd.append(rollbackModification);

                    tr.nextElementSibling.append(sourceTd);

                    tr.nextElementSibling.setAttribute('style','visibility: visible;display:table-row;');
                    var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
                    imgToUpdate.setAttribute('src','/p_/mi');
                    imgToUpdate.setAttribute('alt','-');
                    imgToUpdate.setAttribute('display','block');



                    // finally creating the text area with ace and assigning to global istance.

//                    window.$(aceDiffDiv).html(xhttp.responseText);
                    //window.$(sourceDivEditor).html(xhttp.responseText);
                    var respBody = xhttp.responseText.split("</head>")[1].split("</html>")[0];

                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(respBody,"text/html"),
                        htmlBody = htmlDoc[2],
                        sourceCodeRes = htmlDoc.body.querySelector("textarea").innerText,
                        titleSpan = document.createElement('span'),
                        fileName = tr.querySelectorAll("a").item(2).innerText.trim(),
                        divEditorContainer = tr.nextElementSibling.querySelector('.codeEditor-'+generatedId),
                        itemList = divEditorContainer.closest('[name="objectItems"]'),
                        openedEditorContainers = itemList.querySelectorAll('.sourceCode div');

                    // init
                    ZopeIstance.divActiveSessions = ZopeIstance.divActiveSessions || [];
                    ZopeIstance.divActiveSessions.push(divEditorContainer);

                    divEditorContainer.innerHTML = htmlDoc.body.innerHTML;
                    titleSpan.setAttribute('style','font-size: 20px;color: #fff;background-color: #f00;');
                    titleSpan.innerText = fileName;


                    divEditorContainer.prepend(titleSpan);

                    ZopeIstance.setStyleEditors(ZopeJSEnhancerAPI.divEditorBase);
                    divEditorContainer.setAttribute('style',ZopeJSEnhancerAPI.divEditorActive);

//                    var formEditor
//                    ZopeJSEnhancerAPI.setAttributes(formEditor,{
//                    "action":"manage_edit",
//                    "method":"post"
//                    });
//                    var formEditor = tr.nextElementSibling.querySelector('form [action="manage_edit"]'),
                    var textEditor = tr.nextElementSibling.querySelector("textarea"),
                        textParent = textEditor.parentElement,
                        ta = document.createElement("textarea");
                    textParent.setAttribute('class','text_container');
                    textEditor.remove();
                    textParent.append(ta);
//                    sourceTextArea.setAttribute('name','data:text');
//                    formEditor.append(sourceTextArea);
                    var newAceIstance = window.ace.edit(ta,ZopeJSEnhancerAPI.aceConfigLcl);
                    newAceIstance.setValue(sourceCodeRes);
                    if(!ZopeIstance.aceSession){
                        ZopeIstance.aceSession = {}
                    }
                    ZopeIstance.aceSession[generatedId] = newAceIstance;
                    /* handling when the user does focus the editor. Set class "active editor" to current */
                    newAceIstance.on('focus',function(event){
                        var aceEditor = event.target,
                            editorContainer = aceEditor.closest('div.divEditor'),
                            itemList = editorContainer.closest('[name="objectItems"]'),
                            openedEditorContainers = itemList.querySelectorAll('.sourceCode div');


                        ZopeIstance.setStyleEditors(ZopeJSEnhancerAPI.divEditorBase);

                        editorContainer.setAttribute('style',ZopeJSEnhancerAPI.divEditorActive);
                    });

                    // important fix to handle frames in zope manage
                    // Ace does adds inline defined CSS in the main doc <head>
                    // whilst we access and style the editor inside another frame
                    // which doesn't have the styling defined
                    // locally. Which implies we will have problems unless we add
                    // the corresponding global styling which Ace expects
                    ZopeIstance.addAceCSStoMainHeader();

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
    getSessionManager(){
        var sessionManager = ZopeIstance.getZopeMainDocument().querySelector('body .tabSessionManager') || null;
        return ZopeIstance.getZopeMainDocument().querySelector('body .tabSessionManager');
    }
    countActiveSessions(){
        var sessionManager = ZopeIstance.getSessionManager();
        if(sessionManager == null){
           return 0;
        }
        return ZopeIstance.sessionManager.sessionIstances.length;
    }
    initTabSessionManager(){
        ZopeIstance.sessionManager = {
            sessionIstances:[],
            sessionTabActive:null,
            sessionNotSaved:[]
        }
        var sessionManager = document.createElement('div');
        sessionManager.setAttribute('class','tabSessionManager');
        sessionManager.setAttribute('style','display: flex;flex-direction: row;');
        ZopeIstance.getZopeMainDocument().querySelector('body').prepend(sessionManager);
    }
    addNewSession(objref,sessionTitle){
        var sessionManager = ZopeIstance.getSessionManager(),
            objref = objref || null,
            sessionTitle = sessionTitle || 'Session ' + ( ZopeIstance.countActiveSessions() + 1 ) || 'Session',
            sessionCurrent = document.createElement('div');

        if(sessionManager == null){
            ZopeIstance.initTabSessionManager();
        }

        // creating new session and storaging information about it on the parent
        sessionCurrent.setAttribute('style','height: 30px;background-color: #777;border-radius: 25px;padding: 10px;width: 75px;');
        sessionCurrent.innerText = sessionTitle;

        sessionManager.append(sessionCurrent);
//        sessionManager.prepend(sessionManager);

        ZopeIstance.sessionManager.sessionIstances.push({
            "sessionIstance":sessionCurrent,
            "sessionTitle":sessionTitle
        });
        ZopeIstance.sessionManager.sessionTabActive = sessionCurrent;

    }

    setStyleEditors(style){
        //var openedEditors = ZopeIstance.getZopeMainDocument().querySelectorAll('.sourceCode div');
        ZopeIstance.divActiveSessions.forEach(function(item,index){
            item.setAttribute('style',style);
        });
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
    /* adding css to frame */
    addAceCSStoMainHeader(){
        var doc = this.getZopeMainDocument(),
            docHead = doc.querySelector("head");
        if(!this.checkCssInjection(doc)){
            docHead.append(this.getAceInlineCSS().cloneNode(true));
            return true;
        }
        return false;
    }
    compareFormatting(){
        var tab = document.querySelectorAll('table')[3];
        tab.border = 0;
        tab.style = 'border:1px solid #777;';
        tab.querySelectorAll('td').forEach(function(item,index){
            if(index%2==0){
                var t = item.innerText.split('\n');
                t.pop();
                if(t.length > 0){
                    item.parentElement.setAttribute('class','parsedTR');
                    item.parentElement.setAttribute('style','border: 1px solid #F00;');
                }
                t.forEach(function(item,index){
                    if(item == '-') {
                        t[index] = '<span style="color:#F00;background-color:#f77;">' + item + '</span>';
                    } else {
                        t[index] = '<span style="color:#0F0;background-color:#7f7;">' + item + '</span>';
                    }
                });
                item.innerHTML = t.join('\n');
                item.setAttribute('class','diffCell-'+item.parentElement.rowIndex);
            } else {
                item.setAttribute('class','codeCell-'+item.parentElement.rowIndex);
            }
        });
    }
    checkCssInjection(doc){
        return ((this.getAceInlineCSS(doc))?true:false);
    }
    getAceInlineCSS(extDoc){
        var doc = extDoc || document;
        return doc.querySelector('style[id="ace_editor.css"]');
    }
    searchName(filename){
        window.$.ajax({
            url:`manage_findResult?searchtype=simple&obj_metatypes:list=all&obj_ids:tokens=&obj_searchterm=${filename}&obj_mspec=<&obj_mtime=&search_sub:int=1&btn_submit=Find`
        })
        .done(function(data, textStatus, jqXHR){

            var html = window.$.parseHTML(data),
                htmlTables = html.filter(item=>(item.tagName)?item.tagName.toLowerCase() == 'table':false),
                fileListResult = htmlTables[3];
            window.$(fileListResult).tableToJSON({
                extractor: function(cellIndex, $cell){
                    var obj = null,
                        mappedImg = {
                            "pyscript.gif":"python",
                            "Folder_icon.gif":"folder",
                            "dtmldoc.gif":"dtmldoc",
                            "dtmlmethod.gif":"dtmlmethod",
                        };
                    /* reading if the image is mapped and there's a type defined for it.*/
                    if($cell.find('img').length > 0){
                        for(var image in mappedImg){
                            if($cell.find('img').attr('src').indexOf(image) !== -1){
                                obj = {
                                   "Type":{
                                        "fileType": mappedImg[image],
                                        "imageName": $cell.find('img').attr('src')
                                   }
                                };
                                break;
                            }
                        }
                    }

                    if($cell.find('a').length > 0){
                        var getResourcePath = $cell.find('a').attr("href").split("/");
                        // take off the method call
                        getResourcePath.pop();
                        obj = {
                            "Name":
                            {
                                "href":$cell.find('a').attr("href"),
                                "label":$cell.text(),
                                "loadUrl": ZopeIstance.getResourceURL(getResourcePath.join('/')),
                                "saveUrl": ZopeIstance.getResourceURL(getResourcePath.join('/')),
                            }
                        }
                    }

                    return obj || $cell.text();
                }
            });
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {

        })
        .always(function( data, textStatus, jqXHR ) {

        })
        .then(function( data, textStatus, jqXHR ) {}, function( jqXHR, textStatus, errorThrown ) {

        });
    }
    getFileListAsJSON(){
        var tableToProcess =  ((this.getCurrentMainSearch())?this.getZopeMainDocument().querySelectorAll("table")[3]:this.getZopeMainDocument().querySelector('[name="objectItems"] table'));
        return window.$(tableToProcess).tableToJSON({
            extractor: function(cellIndex, $cell){
                    var obj = null,
                        rowIndex = $cell.closest("tr").index(),
                        hasSpoilerClass = ($cell.attr("class")?$cell.attr("class").indexOf("spoiler_cell") !== -1:false),
                        mappedImg = {
                            "pyscript.gif":"python",
                            "Folder_icon.gif":"folder",
                            "dtmldoc.gif":"dtmldoc",
                            "dtmlmethod.gif":"dtmlmethod",
                        };
                    if(!hasSpoilerClass){
                        /* reading if the image is mapped and there's a type defined for it.*/
                        if($cell.find('img').length > 0){
                            for(var image in mappedImg){
                                if($cell.find('img').attr('src').indexOf(image) !== -1){
                                    obj = {
                                            "fileType": mappedImg[image],
                                            "imageName": $cell.find('img').attr('src')
                                    };
                                    break;
                                }
                            }
                        }

                        if($cell.find('a').length > 0 && obj == null){
                            var getResourcePath = $cell.find('a').attr("href").split("/");
                            // take off the method call
                            getResourcePath.pop();
                            obj = {
                                    "href":$cell.find('a').attr("href"),
                                    "label":$cell.text(),
                                    "loadUrl": ZopeIstance.getResourceWorkspace(getResourcePath.join('/')),
                                    "saveUrl": ZopeIstance.getResourceWorkspace(getResourcePath.join('/')),
                            }
                        }
                        // init and merge obj
                        if(!ZopeIstance._zope.mainObjectlist){
                            ZopeIstance._zope.mainObjectlist = {};
                        }
                        if(!ZopeIstance._zope.mainObjectlist[rowIndex]){
                            ZopeIstance._zope.mainObjectlist[rowIndex] = {};
                        }
                        Object.assign(ZopeIstance._zope.mainObjectlist[rowIndex],{
                            "trRef":$cell.closest("tr")
                        });
                        Object.assign(ZopeIstance._zope.mainObjectlist[rowIndex],obj);
                        return obj || $cell.text();
                    } else {
                        return;
                    }

                }
            });
    }
    handleHamburger(){
        var menuBody = this.getCustomMenuBody(),
            frameset = this.getCustomFrameset(),
            istance = this,
            imageHamburger = this.createImageEl({
                'src':this.burgerIcon,
                'alt':'Hamburger',
                'onclick': function(){
                    istance.handleHamburger();
                },
                'class':'magicBurger',
                "style":"width:100%;padding: 9px;"
            }),
            showHide = function(val){
                return val?'inline':'none';
            };

        if(!this.getBurgerIcon()){
            menuBody.append(imageHamburger);
        }
        if(!this.getCustomFunctionsTable()){
            this.addMenuFeatures(menuBody);
        }

        if(this.burger.state){
            this.getBurgerIcon().setAttribute("style",`display:${showHide(!this.burger.state)};`+'padding:9px;');
            this.getCustomFunctionsTable().setAttribute("style",`display:${showHide(this.burger.state)};`);
            frameset.cols = "200,*";
            this.burger.state = false;
        } else {
            this.getBurgerIcon().setAttribute("style",`display:${showHide(!this.burger.state)};`+'padding:9px;');
            this.getCustomFunctionsTable().setAttribute("style",`display:${showHide(this.burger.state)};`);
            frameset.cols = "50,*";
            this.burger.state = true;
        }
    }
    getCustomFunctionsTable(){
        return this.getCustomMenuBody().querySelector(".tableCustomFunctions");
    }
    getBurgerIcon(){
        return this.getCustomMenuBody().querySelector(".magicBurger");
    }
    getCurrRelPath(doc){
        var path = doc.baseURI.split("/");
            // get last name off
            path.pop();
            //reconstruct url
            return path.join("/");
    }
    getResourceURL(resource){
        return this.getCurrRelPath(this.getZopeMainDocument()) + "/" + resource ;
    }
    getResourceWorkspace(resource){
        return this.getCurrRelPath(this.getZopeMainDocument()) + "/" + resource + "/manage_main";
    }
    getLastArrEl(arr){
        return arr.slice(-1)[0];
    }
    getZopeHeaderFrame(){
        return this._zope.header;
    }
    getZopeHeaderDocument(){
        return this._zope.header.contentDocument;
    }
    getZopeMainFrame(){
        return this._zope.main;
    }
    getZopeMainDocument(){
        return this._zope.main.contentDocument;
    }
    getZopeMainWindow(){
        return this._zope.main.contentWindow;
    }
    getCurrentMainSearch(){
        var context = this._zope.main.contentDocument;
        return ((context.querySelectorAll('[value="Find"]').length > 0)?context.querySelector('[value="Find"]'):false);
    }
    getCustomMenuDocument(){
        return this._zope.extraMenu.zopeEnhanceMenu.contentDocument;
    }
    getCustomMenuDocument(){
        return this._zope.extraMenu.zopeEnhanceMenu.contentDocument;
    }
    getCustomMenuBody(){
        return this._zope.extraMenu.zopeEnhanceMenu.contentDocument.body;
    }
    getCustomMenu(){
        return this._zope.extraMenu.zopeEnhanceMenu;
    }
    getCustomFrameset(){
        return this._zope.extraMenu.pageFrameSet;
    }
    features = {
    };
    customMenuInit(){
        var body = this.getCustomMenuBody();

        //create a table which contains all the features available
    }
}




(function() {
    "use strict";
    var get_cookie_status = function() {
        return getCookie('ccm_enabled');
    };
    var set_cookie_status = function(status) {
        setCookie('ccm_enabled', status, 10, '/');
    };
    /* definisco dopo aver inizializzato le dipendenze e il costruttore, che cosa fare */
    ZopeJSEnhancerAPI.prototype.postLoadOperations = function(){
        var istance = this;
        if(this.isFirstLoad){
            this.isFirstLoad = false;
            this.postLoadOperationsCounter = 1;
            this.consoleDebug("|------ loading postLoadOperations -------|");
            this._zope.menu.links = this.getMenuObjects();

            // binding eventi al menù
//            this.menuObjectInit();
            this.generateCustomMenu();
            //this.getFileListAsJSON();
            /*
            quando il menù viene caricato, allora inizializzo il suo contenuto:
            - corpo
            - dipendenze nell'head
            */
            this.getCustomMenu().addEventListener('load',function(){
                    istance.handleHamburger.call(istance);
                    // al caricamento del frame con menù
                    console.log("init custom menu");
                    istance.loadDependency.call(istance,istance.zopeMenuDependencies,istance.getCustomMenuDocument(),true);

                    //stance.getFileListAsJSON();
            });


        } else {
            this.postLoadOperationsCounter++;
//            if(!this._zope.mainObjectlist){
//            //debugger;
//                this.getFileListAsJSON();
//            }
        }

    };

    /*  istanzio la classe */
    window.ZopeIstance = new ZopeJSEnhancerAPI(window,document,true);
})();