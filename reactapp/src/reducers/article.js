export default function(articleWishlist = [], action) {
    if(action.type == 'addArticle') {

      var newlistArticle = [...articleWishlist];

      var Articletrue = false

      for(let i=0;i<newlistArticle.length;i++){
          if(newlistArticle[i].title == action.listArticle.title){
            Articletrue = true
          }
      }

      if(!Articletrue){
        newlistArticle.push(action.listArticle)
      }

      return newlistArticle;
      //}
    }else if(action.type == 'DeleteArticle') {

      //on a dabord initialiser l'action dans le screenMyArticles
      var deletelistArticle = [...articleWishlist];     
      var newtablist = deletelistArticle.filter((e)=>e.title !== action.listArticle.title)
      //console.log(action)

      return newtablist;

    } else {
      return articleWishlist;
    }  
   }