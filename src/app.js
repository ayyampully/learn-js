(function(){
    console.log('init');
    
    net('/rest2')
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
    }
    

})();