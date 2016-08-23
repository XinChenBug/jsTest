/**
 * Created by xinchen on 8/23/2016.
 */


// 函数addloadevent  在页面加载时调用函数
function addLoadEvent(func)
{
    var oldonload=window.onload;
    if(typeof window.onload !="function")
    {
        window.onload=func;
    }

    else{

        window.onload=function()
        {
            oldonload();
            func();
        }
    }
}

//函数insertAfter(新元素，目标元素)  在某元素后面插入新元素
function insertAfter(newElement,targetElement)
{
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement)
    {
        parent.appendChild(newElement);
    }
    else
    {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }

}


//函数 addClass(元素名称，类名称) 为某元素添加新的属性
function addClass(element,value)
{
    if(!element.className)    //如果classname本来还没有值，则直接将value赋值给classname
    {
        element.className=value;
    }
else                       //如果classname本来存在属性值，则将一个空格和新的class设置值追加到classname属性上
    {
       newClassName=element.className;
        newClassName+="";
        newClassName+=value;
        element.className=newClassName;
    }
}

function highlightPage()
{
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName("header"); //字符串要加双引号或者单引号；
    if(headers.length==0)return false;
      var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
      var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++)
    {
        linkurl=links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1)
        {
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();   //将文本转换成小写形式
            document.body.setAttribute("id",linktext);   //将id设置为链接文本的小写形式

        }
    }
}

//函数 moveElement(元素ID，X移动像素，Y移动像素，间隔0移动图片 ,该函数被prepareSliedeshow()调用
function moveElement(elementID,final_x,final_y,interval)
{
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    if(elem.movement)                        //创建一个元素的属性，名字为movement
    {
        clearTimeout(elem.movement);        // clearTimeout函数，清除积累在setTimeout参数里的事件，
    }
if(!elem.style.left)
{
    elem.style.left="0px";
}
    if(!elem.style.top)
    {
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x&&ypos==final_y)
    {
        return true;
    }
    if(xpos<final_x)
    {
       var dist=Math.ceil((final_x-xpos)/10);    //函数 Math.ceil(数值)  返回一个不小鱼某值的一个整数
        xpos+=dist;                                //移动步伐与距离成正比，越远移动越大
    }
    if(xpos>final_x)
    {
        var dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(ypos<final_y)
    {
        var dist=Math.ceil((final_y-ypos)/10);
        ypos+=dist;
    }
    if(ypos>final_y)
    {
        var dist=Math.ceil((ypos-final_y)/10);
        ypos-=dist;
    }

    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);  //每隔interval时间，重复repeat事件
}



//函数
function  prepareSliedeshow()
{
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("intro"))return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");  //创建图片显示空间区域DIV
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");   //创建图片显示空间区域IMG
    preview.setAttribute("src","images/slideshow.jpg");
    preview.setAttribute("alt","图片等待切换");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);//将图片插在DIV中
    insertAfter(slideshow,intro);   //将DIV 放在段落 intro后面

var links=document.getElementsByTagName("a");
var destination;
for (var i=0;i<links.length;i++)
{
    links[i].onmouseover=function()    //onmouseover事件，当用户把鼠标指针悬停在某个链接上方时
    {
        destination=this.getAttribute("href");
        if(destination.indexOf("index.html")!=-1)
        {
            moveElement("preview",0,0,5);
        }
        if(destination.indexOf("about.html")!=-1)
        {
            moveElement("preview",-180,0,5);
        }
        if(destination.indexOf("photos.html")!=-1)
        {
            moveElement("preview",-360,0,5);
        }
        if(destination.indexOf("live.html")!=-1)
        {
            moveElement("preview",-600,0,5);
        }

        if(destination.indexOf("contact.html")!=-1)
        {
            moveElement("preview",-800,0,5);
        }
    }
}
}


//函数 showSection(id) 能够根据制定的ID显示相应的section，同时隐藏其他部分
function showSection(id)
{
    var sections=document.getElementsByTagName("section");
   for(var i=0;i<sections.length;i++)
    {
        if(sections[i].getAttribute("id")==id)
        {
            sections[i].style.display="block";
        }
        else
        {
            sections[i].style.display="none";
        }
    }
}


function  prepareInternalnav()
{
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById)return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName("a");
      for(var i= 0; i<links.length;i++)
      {
        var sectionId=links[i].getAttribute("href").split("#")[1];  //获取href中#后面的文字
          if(!document.getElementById(sectionId)) continue;
          document.getElementById(sectionId).style.display="none";

          links[i].destination=sectionId; //创建Link 的一个属性为destination
          links[i].onclick=function()
          {
              showSection( this.destination);
              return false;
          }

      }

}

//函数 图片占位显示
function preparePlaceholder()
{
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;

    //创造图片元素
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/place.jpg");
    placeholder.setAttribute("alt","my image gallery");

    //创建段落
    var description=document.createElement("p");
    description.setAttribute("id","description");
    //创建文本内容
    var desctext=document.createTextNode("choose am image");
    //将文本内容作为段落的子节点
    description.appendChild(desctext);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}


//函数 图片切换显示

function  showPic(whichpic)
{
    if (!document.getElementById("placeholder")) return false;
    if (!document.getElementById("description")) return false;
    //获取图片的链接地址
    var source=whichpic.getAttribute("href");
    //使placeholder的显示地址为图片链接地址
     var placeholder=document.getElementById(placeholder);
    placeholder.setAttribute("src",source);

    if(whichpic.getAttribute("title"))
    {
        var text=whichpic.getAttribute("title");
    }
    else
    {
        var text="";
    }
    var description=document.getElementById("description");
    if (description.firstChild.nodeType==3)
    {
        description.firstChild.nodeValue=text;
    }
    return false;
}


addLoadEvent(highlightPage);
addLoadEvent(prepareSliedeshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);