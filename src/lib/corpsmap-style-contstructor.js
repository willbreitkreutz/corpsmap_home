
const CorpsmapStyleConstructor = {
  polygon:{
    singleStyle(fillcolor, outlinecolor, outlinewidth){
      return [{
        className: 'single-style',
        expression: null,
        style:{
          color: fillcolor,
          outlinecolor: outlinecolor,
          outlinewidth: outlinewidth
        }
      }]
    }
  }
}
