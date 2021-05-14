class ZopeJSEnhancerAPI {
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
            ZopeJSEnhancerAPI.mainObjectInit(this);
        },
        "features":{
            "codeEditor":{
                "type":"checkbox",
                "id":"codeEditor",
                "data-on":"Code editor on",
                "data-off":"Code editor off",
                "onChange":function(){
                    console.log("codeEditor");
                }
            },
            "searchSize":{
                "type":"textWButton",
                "id":"searchSize",
                "onClick":function(){
                    // add batch_size to url with an input field to override it
                    console.log("searchSize");
                }
            },
            "codeInline":{
                "type":"checkbox",
                "id":"codeInline",
                "data-on":"Code spoiler on",
                "data-off":"Code spoiler off",
                "onChange":function(event){

                    var isChecked = event.target.checked;
                    ZopeJSEnhancerAPI.enableSpoilerCode(ZopeIstance,event.target.checked);


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
          "url":"https://unpkg.com/ace-diff@^3.0.0"
        },
        {
          "type":"css",
          "url":"https://unpkg.com/ace-diff@^3.0.0/dist/ace-diff.min.css"
        },
        {
          "type":"css",
          "url":"https://unpkg.com/ace-diff@^3.0.0/dist/ace-diff-dark.min.css"
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
    constructor(window,document,verboseMode){
        //this.dependencies = ZopeJSEnhancerAPI.getDependencies();

        this.verboseMode = verboseMode || false;
        this.isFirstLoad = true;
        this.customFirstLoad = true;

        this.consoleDebug('|------ ZopeJSEnhancerAPI -------|');
        this.consoleDebug('|**------ INIT -------**|');

        // load all dependencies for the main document
        this.loadDependency(this.dependencies,document,true);

        // bound window to istance
        this._window = window;
        this._document = document;

        // add istance to window

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

		this.addMenuFeatures.call(this,this.getCustomMenuBody());
		// al caricamento del frame con menù
		console.log("init custom menu");
		this.loadDependency.call(this,this.zopeMenuDependencies,this.getCustomMenuDocument(),false);
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
            imageHamburger = this.createImageEl({
                'src':'https://sol3.diviteldatacenter.com/public/32px-Hamburger_icon.svg.png',
                'alt':'Hamburger',
                'onclick':'alert("test");',
                'class':'burger'
            }),
        menuTbody = document.createElement("tbody");


        menuTable.setAttribute('class','table');
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
                "type":"text",
                "class":"form-control",
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

    static mainObjectInit(istance){
            // se invece mostriamo la lista dei file
            istance = istance._zope.main.addEventListener('load',function(){
                // al caricamento del frame con lista oggetti
                console.log("manage_main loaded");
                console.log(this);
                istance.getZopeReferences();
                ZopeJSEnhancerAPI.enableSpoilerCode(istance._zope.main.document);
            });
    }
    /* inizializza il menù e i suoi eventi*/
    menuObjectInit(){
        var istance = this;
    }
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
    /* abilitazione della funzionalità per spoilerare il codice in riga della lista oggetti */
    static enableSpoilerCode(self,toEnable){
        var docInst = self.getZopeMainDocument(),
            winInst = self.getZopeMainWindow(),
            linkExternalEdit = docInst.querySelectorAll(".list-item a[title='Edit using external editor']");
        // selezione di tutti gli oggetti, con riga, all'interno del frame manage_main ( lista dei file ) con titolo che indica che sia un file editabile
        linkExternalEdit.forEach(function(item,index){

            // prendo il riferimento della riga della lista file
            var fileRowTr = item.parentElement.parentElement.parentElement,
                alreadyCreated = (fileRowTr.querySelector(".show_hide"))?true:false,
                selectionCell = fileRowTr.firstElementChild;
            if(!alreadyCreated){
                var newA = document.createElement('a'),
                    newImg = document.createElement('img'),
                    newCell = document.createElement('td');

                ZopeJSEnhancerAPI.setAttributes(newImg,{
                                                            'src':'/p_/pl',
                                                            'class':'show_hide',
                                                            'alt':'+',
                                                            'border':'0',
                                                        });

                newA.setAttribute('id','el-'+index);
                newA.setAttribute('href','#');
                newA.append(newImg);
                newCell.className = "spoiler_cell";
                newCell.append(newA);
                // per il primo child element, in cui esiste la checkbox per selezionare il file, vado in override e metto l'immagine con "+" o "-"
                fileRowTr.firstElementChild.after(newCell);
            }


            var showButton = fileRowTr.querySelector(".spoiler_cell");
            if(toEnable){
                selectionCell.style = "display: none";
                showButton.style = "display: inline";

                // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
                docInst.getElementById('el-'+index).addEventListener("click",function(){
                        ZopeJSEnhancerAPI.showCode(''+item.getAttribute('href')+'',fileRowTr);
//                        var nextRow = fileRowTr.nextElementSibling;
//                        if(nextRow){
//                            ZopeJSEnhancerAPI.loadAcefunction(winInst,docInst,nextRow.querySelector("codeEditor"),self.aceConfigLcl,function(){ console.log(arguments)});
//                        }
                    },
                false);
            } else {
                selectionCell.style = "display: inline";
                showButton.style = "display: none";
                // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
                docInst.getElementById('el-'+index).removeEventListener("click",function(){
                        ZopeJSEnhancerAPI.showCode(''+item.getAttribute('href')+'',fileRowTr);
//                        var nextRow = fileRowTr.nextElementSibling;
//                        if(nextRow){
//                            ZopeJSEnhancerAPI.loadAcefunction(winInst,docInst,nextRow.querySelector("codeEditor"),self.aceConfigLcl,function(){ console.log(arguments)});
//                        }
                        //ZopeJSEnhancerAPI.loadAcefunction(winInst,docInst,fileRowTr.nextSibling.querySelector("codeEditor"),self.aceConfigLcl,function(){ console.log(arguments)});
                    },
                false);
            }



        })
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
                        sourcePre = document.createElement('pre'),
                        sourceCode = document.createElement('code');

                    sourceTd.setAttribute('colspan','5');

                    sourceTextArea.setAttribute('id','codeEditor');
                    sourcePre.innerText = "placeholder";
                    sourcePre.setAttribute('style','overflow-y: scroll;height: 500px');

                    var generatedId = parseInt(Math.random()*1000000);
                    sourcePre.setAttribute('class','codeEditor-'+generatedId);

                    sourceTd.append(sourcePre);

                    var saveBtn = document.createElement("button"),
                        showDiff = document.createElement("button"),
                        rollbackModification = document.createElement("button"),
                        aceDiffDiv = document.createElement("div");


                    aceDiffDiv.setAttribute('class','codeDiff-'+generatedId);

                    saveBtn.innerText = 'Salva';
                    showDiff.innerText = 'Diff';
                    showDiff.onclick = function(ev){
                    debugger;
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
                    };
                    rollbackModification.innerText = 'Ripristina';

                    sourceTd.append(aceDiffDiv);
                    sourceTd.append(saveBtn);
                    sourceTd.append(showDiff);
                    sourceTd.append(rollbackModification);

                    tr.nextElementSibling.append(sourceTd);

                    tr.nextElementSibling.setAttribute('style','visibility: visible;display:table-row;');
                    var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
                    imgToUpdate.setAttribute('src','/p_/mi');
                    imgToUpdate.setAttribute('alt','-');
                    imgToUpdate.setAttribute('display','block');

                    // finally creating the text area with ace and assigning to global istance.
                    var newAceIstance = window.ace.edit(sourcePre,ZopeJSEnhancerAPI.aceConfigLcl);

                    newAceIstance.setValue(xhttp.responseText);
                    if(!ZopeIstance.aceSession){
                        ZopeIstance.aceSession = {}
                    }
                    ZopeIstance.aceSession[generatedId] = newAceIstance;

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
    checkCssInjection(doc){
        return ((this.getAceInlineCSS(doc))?true:false);
    }
    getAceInlineCSS(extDoc){
        var doc = extDoc || document;
        return doc.querySelector('style[id="ace_editor.css"]');
    }
    getFileListAsJSON(){
        return window.$(this.getZopeMainDocument().querySelector('[name="objectItems"] table')).tableToJSON({
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
                            if(imgObj.attr('src').indexOf(image) !== -1){
                                obj = {
                                   "Type":{
                                        "fileType": mappedImg[image],
                                        "imageName": imgObj.attr('src')
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
                                "loadUrl": getResourceURL(getResourcePath.join('/')),
                                "saveUrl": getResourceURL(getResourcePath.join('/')),
                            }
                        }
                    }

                    return obj || $cell.text();
                }
            });
    }
    getResourceURL(resource){
        return window.location.origin + "/" + resource ;
    }
    getLastArrEl(arr){
        return arr.slice(-1)[0];
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
    currentMainSearch(){
        return (this._zope.main.contentDocument.querySelectorAll('[value="Find"]').length > 0);
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
            this.menuObjectInit();
            this.generateCustomMenu();



            this.getCustomMenu().addEventListener('load',function(){

                    istance.addMenuFeatures.call(istance,istance.getCustomMenuBody());
                    // al caricamento del frame con menù
                    console.log("init custom menu");
                    istance.loadDependency.call(istance,istance.zopeMenuDependencies,istance.getCustomMenuDocument(),false);
            });

        } else {
            this.postLoadOperationsCounter++;
        }

    };

    /*  istanzio la classe */
    window.ZopeIstance = new ZopeJSEnhancerAPI(window,document,true);
})();