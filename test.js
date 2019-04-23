

let rect;

class Rect{

    constructor(number1, number2){
        this.number1 = number1;
        this.number2 = number2;
        this.numbers = new Array();
    }

    get size(){
        return this.number1 * this.number2;
    }

    get numb1(){
        return this.number1;
    }
}

function test1(){
    var numb = 8545;

    document.getElementById("test").innerHTML = numb;
    rect = new Rect(40,50);
 
    document.getElementById("rectTest").innerHTML = rect.size;
}

function array(){
    document.getElementById("array").innerHTML = "Testar Array";
    console.log("Started");    
}

function clicks(){
    document.getElementById("click").innerHTML = rect.size;
    console.log("Clicked the button");
}

function createElements(){
    var id = "1";
    var containerdiv = document.createElement('div'),
    nwtag = document.createElement("namn");
    nwtag.id = id;
    containerdiv.appendChild(nwtag);
    return containerdiv.innerHTML;
}

function createhtml(){
var html = "";
html += "<a id='" + "1" +"'>link</a>";
html += "<div id='" + "1" +"'>div</div>";
return html;
}

function table(){
    /*
var tree = document.createDocumentFragment();
var link = document.createElement("a");
link.setAttribute("id", "id1");
link.setAttribute("href", "http://site.com");
link.appendChild(document.createTextNode("texten"));

var div = document.createElement("div");
div.setAttribute("id", "id2");
div.appendChild(document.createTextNode("texten"));

tree.appendChild(link);
tree.appendChild(div);
document.getElementById("table").appendChild(tree);
*/

}

