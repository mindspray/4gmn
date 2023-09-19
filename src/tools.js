import './styles.css';

const isDomDetail = (str) => {
  const domDetails = ['text', 'count', 'ids', 'href', 'src'];

  for(let i = 0; i < domDetails.length; i++){
    if(str === domDetails[i]) return true;
  }
  return false;
}

// const isValidDOMElement = (str)=> {
//   const validDomElements = `a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr`
  
//   let elements = validDomElements.split(',');

//   let result;

//   if (typeof str !== 'string') return;
//   for(let i = 0; i < elements.length; i++){
//     if(str === elements[i]) return true;
//   }
//   return false; 
// } 

function buildFullElement({tag, classes, id} = {}){
  if (typeof tag !== 'string') return;
  if(typeof tag === 'string'){
    let el = document.createElement(tag.toLowerCase());

    const hasCapital = str =>{
      let upper = str.toUpperCase();
      let lower = str.toLowerCase();
      return (str === upper || (!(str === upper) && !(str === lower)));
    }
    function camelToDashCase(str){
      let splits = str.split(/([A-Z])/);
      let assembledClasses = "";
      for(let i = 0; i < splits.length; i++){
        assembledClasses = assembledClasses.concat(splits[i].toLowerCase());

        if (i < splits.length-1){
          if(hasCapital(splits[i+1])){
            assembledClasses = assembledClasses.concat('-');
          }
        }
        
        // if(i != splits.length-1 && (i % 2 === 0)){
        //   assembledClasses = assembledClasses.concat('-');
        // }
      }
      return assembledClasses;
    }
    
    function preppedClassNameAdder(className){
      function prepClassString(str){
        
        if(hasCapital(str)){
          return camelToDashCase(str);
        } else {
          return str;
        }
      }
      
      let preppedClassName = prepClassString(className);
      if (typeof preppedClassName === 'string'){
        el.classList.add(preppedClassName);
      } else if (Array.isArray()){
        preppedClassName.forEach(val=>{
          preppedClassNameAdder(val);
        });
      } else {
        console.error('Please provide classes as a string or array of strings');
      }
    }

    if(classes){
      if(typeof classes !== 'string' && !(Array.isArray(classes))) return;
      if(typeof classes === 'string'){
        preppedClassNameAdder(classes);
      } else {
        classes.forEach(className => {
          preppedClassNameAdder(className);
        })
      }
    }

    if(id){
      if(typeof id[0] !== 'string') return;
      el.id = id;
    }

    return el;
  } else {
    console.error(`wrong html tag type`);
  }
}

function createElements(htmlTag, details = {}, index, classNames, parentBlueprint = {}){
  const {
    ids,
    count = 1,
    text, 
    src: images, 
    href: links 
  } = details;

  const curIndex = index.curIndex || 0;
  const carriedIndex = index.carriedIndex || 0;
  let imagesRoot, imagesPath, imagesThumbPath, hasImages;
  let elements = [];


  if(images && htmlTag === 'img'){
    hasImages = true;
    imagesRoot = details.srcRoot;
    imagesPath = `./images/${imagesRoot}-images/${imagesRoot}-${images[carriedIndex]}`;
    imagesThumbPath = `images/thumb-${curIndex}.png`
  }


  /* IMPORTANT NOTE REGARDING TEMPLATE:
    Be sure the textObjects or hrefObjects use the classNames as the key for the corresponding blueprint object.
  */

  for (let i = 0; i < count; i++){
    let el;

    // Perhaps these if checks innards can be shortened.

    if(ids){
      if(typeof ids === 'string'){
        // el.id = ids;
        el = buildFullElement({tag: htmlTag, classes: classNames, id: ids})
      } else if (Array.isArray(ids) && typeof ids[0] === 'string'){
        el = buildFullElement({tag: htmlTag, classes: classNames, id: ids[curIndex]});
      }
    } else {
      el = buildFullElement({tag: htmlTag, classes: classNames});
    }

    if(text){
      if (typeof text === 'string'){
        el.textContent = text;
      } else if (Array.isArray(text) && typeof text[0] === 'string'){
        el.textContent = text[curIndex];
      } else if (Array.isArray(text) && typeof text[0] === 'object'){
        const textObj = text[curIndex];
        el.textContent = textObj[idName];
      }
    }

    if (hasImages){
      if (typeof images === 'string'){
        el.src = images;
      } else if (Array.isArray(images) && typeof images[0] === 'string') {
        el.src = `${imagesPath}`;
      } else if (Array.isArray(images) && typeof images[0] === 'object'){
        el.src = `${imagesPath}`;
      }
    }

    if (links){
      if (typeof links === 'string'){
        el.src = links;
      } else if (Array.isArray(links) && typeof links[0] === 'string'){
        el.src = links[curIndex];
      } else if (Array.isArray(links) && typeof links[0] === 'object'){
        const linksObj = links[curIndex];
        el.src = linksObj[classNames];
      }
    }
    elements.push(el);
  }

  return elements;
}

function createElementFromBlueprint(blueprint, {containerType = "div", classNames = ""} = {}) {

  function createNestedElements(elementBlueprint,element, curIndex = 0, carriedIndex) {
    Object.keys(elementBlueprint).forEach((key, index) => { 
      const splitKeys = key.split('_')
      let elementName, idName;
      let classNames = [];
      // set first split to elementName
      elementName = splitKeys[0];

      if(isDomDetail(elementName)) return;
      
      // If more than 2 strings come from split
      if (splitKeys.length > 2){
        // from the 2nd to the 2nd to last key, set as classNames
        for(let i = 1; i < splitKeys.length; i++){
          if(i != splitKeys.length){
            classNames.push(splitKeys[i]);
          }
        }
      } else {
        // otherwise if 2 or less strings from split, set 2nd on as classNames
        for(let i = 1; i < splitKeys.length; i++){
          if(i != splitKeys.length){
            classNames.push(splitKeys[i]);
          }
        }

      } 
  
      const elementDetails = elementBlueprint[key];

      let newElementsArray;


      if (carriedIndex != undefined){
        newElementsArray = createElements(elementName, elementDetails, {curIndex, carriedIndex}, classNames, elementBlueprint);
      } else {
        newElementsArray = createElements(elementName, elementDetails, {curIndex}, classNames, elementBlueprint);
      }

      // This should maybe check if the element to create is an element (aka is not a dom detail)
      newElementsArray.forEach((newElement, index)=> {
        if (elementDetails) {
          if (elementDetails.carryParentCount){
            createNestedElements(elementDetails, newElement, index, curIndex);
          } else {
            createNestedElements(elementDetails, newElement, index);
          }
        }
        element.appendChild(newElement);
      })
    })
  }

  let container;
  const createElAndClass = (element, defaultClass) => {
    container = document.createElement(element);
    container.classList.add(classNames || defaultClass)
  }

  if (containerType === "container" || containerType === "div"){
    createElAndClass('div', 'container');
  } else if (containerType === "header"){
    createElAndClass('header', 'header');
  }else if (containerType === "footer"){
    createElAndClass('footer', 'footer');
  }else if (containerType === "section"){
    createElAndClass('section', 'section');
  }

  createNestedElements(blueprint, container);
  return container;
}

export { createElementFromBlueprint };