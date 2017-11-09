module.exports=function(text,callback){

}

var parser=function(text){
    

}

var counter=function(words){
    var results=[];
    words.forEach(function(word){
        var found=false;
        results.forEach(function(result){
            if(results.word==word){
                found=true;
                results.count++;
                break;
            }
        })
        if(!found){
            results.push({word:word,count:1});
        }
    });
    return results;
}