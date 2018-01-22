

(function(){
    console.log('init');
   /* class MyClass {
        get prop() {
            return 'getter';
        }
        set prop(value) {
            console.log('setter: '+value);
        }
    }
    const myClass = new MyClass();
    myClass.prop = 123;
    console.log(myClass.prop)*/
    
    function getDashboardView(id){
        var div = document.createElement('div');
        div.setAttribute('class', 'dashboard');
        div.setAttribute('id', id);
        return div;
    }
    function getDashboardCol(id, className){
        var div = document.createElement('div');
        div.setAttribute('class', 'dashboard-col '+className);
        div.setAttribute('id', 'col-'+id);
        return div;
    }
    function getWidgetView(id){
        var div = document.createElement('div');
        div.setAttribute('class', 'widget');
        div.setAttribute('id', 'widget-'+id);
        var temp = `<div class="widget-actions"><div>[]</div><div>x</div></div>
            <div class="widget-content">test</div>`;
        div.innerHTML = temp;
        return div;
    }
    
class Layout{
    constructor(name, options = {}){
        this.name = name;
        this.elm = getDashboardView(name);
        this.options = options;
        this.layout = 'two-col';
        this.cols = [];
    }
}
class Widget{
    constructor(name, options = {}){
        this.name = name;
        this.elm = getWidgetView(name);
        this.options = options;
    }
    init(cols){
        this.cols = cols || [];
        this.setWidgets();
        this.elm.setAttribute('draggable', true);
        this.elm.addEventListener('dragstart', this.onDrag.bind(this))
        //this.elm.addEventListener('dragend', this.onDrag.bind(this))
    }
    setWidgets(){
       let widgets = 1;
       for(let i = 0; i<widgets; i++){
           this.cols[i%2].appendChild(this.elm)
       }
    }
    onDrag(e){
        e.dataTransfer.setData("text/plain", e.target.id);
        e.effectAllowed = "copyMove";
        console.log(e)
    }
}


class MultiWindow extends Layout{
    constructor(name, options){
        super(name, options)
        this.init()
    }
    init(){
        console.log('MultiWindow')
        document.getElementById('container').appendChild(this.elm);
        this.setColumns();
        for(let col of this.cols){
            col.addEventListener('dragover', this.onDragover.bind(this))
            col.addEventListener('drop', this.onDrop.bind(this))
        }
       // this.col.addEventListener('dragover', this.onDragover.bind(this))
       // this.col.addEventListener('drop', this.onDrop.bind(this))
    }
    setColumns(){
       let col = 2;
       for(let i = 0; i<col; i++){
           var item = getDashboardCol(i, this.layout)
           this.cols.push(item)
           this.elm.appendChild(item)
       }
       
    }
    
    get dashboardCol(){
        return this.cols;
    }
    set dashboardCol(val){}
    
    onDragover(ev){
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move"
    }
    onDrop(ev){
        ev.preventDefault();
         // Get the id of the target and add the moved element to the target's DOM
         var data = ev.dataTransfer.getData("text");
         ev.target.appendChild(document.getElementById(data));
    }
}
const multiWindow = new MultiWindow('d1');
const widget = new Widget('w1');
widget.init(multiWindow.dashboardCol)

    
    /*net('/rest2')
        .then(resp1 => {
            console.log('then 1', resp1)
            return net('/rest1')
        })
        .then(resp2 => {
            console.log('then 2',resp2)
            return net('/rest3')
        })
        .then(function(resp3){
            console.log('then 3',resp3)
            //throw new Error('blah')
        })
        .catch(err => {
            console.error(err)
        })
    console.log('stuffs after')

    Promise.all([
        net('/rest2'),
        net('/rest1'),
        net('/rest3')
    ])
    .then((...r)=>{
        console.log(['promise all-->',r].join(''));
    });
    
    f();
    async function f(){
        const r1 = await net('/rest1')
        const r2 = await net('/rest3')
        console.log('async -->',r1, r2)
    }
    
    f2().then((...x)=>{
        console.log('async all -->', x.toString())
    });
    async function f2(){
        return await Promise.all([
            net('/rest1'),
            net('/rest3')
        ])
    }
    
    function net(url){
        return new Promise((resolve, reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = ()=>{
                if(xhr.status === 200) resolve(xhr.responseText);
            };
            xhr.onerror = ()=>{
               reject(xhr.statusText);
            };
            xhr.send();
        })
    }*/
    

})();