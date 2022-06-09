export const pageName = (router) =>{
    let pages = ''
    if(router.route.length === 1){
      return 'Home'
    } else{
      for(let i =0; i < router.route.length; i++){
        if( router.route[i] === '/'){
          pages = ''
        }else {
          if(pages.length>0){
            pages += router.route[i]
          } else{
            pages = router.route[i].toUpperCase()
          }
        }
      }
      return pages
    }
  }
