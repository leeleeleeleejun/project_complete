var mainArticleItem = document.getElementsByClassName("main-article-item");
var randomImg = document.querySelectorAll(".random-img");
var randomContent = document.querySelectorAll(".random-content");
var articleTitle = document.querySelectorAll(".article-title");

function setRandomNumfunc (){
  var RandomNumArray = [];
  for (i=0; i<randomImg.length; i++) {
    randomNum = Math.floor(Math.random() * 8);
    if (RandomNumArray.indexOf(randomNum) === -1){
      RandomNumArray.push(randomNum);
    } else {
      i--;
    }
  }
  return RandomNumArray;
}

window.addEventListener('load',function(){
  var setRandomNum = setRandomNumfunc();
  for( var i = 0; i < randomImg.length; i++){
    randomImg[i].setAttribute('src',`./img/7${setRandomNum[i]+1} (1).jpg`);
    randomContent[i].appendChild(articleTitle[setRandomNum[i]].firstChild.cloneNode());
  }
})

var top = document.getElementById("top");
top.addEventListener('click',function(){
  document.body.scrollIntoView({ behavior: 'smooth' });
})