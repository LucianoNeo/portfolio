function mudaTema() {
  document.body.classList.toggle("dark");
}


var imagens = document.querySelectorAll('.descricao');

for(var x=0; x<imagens.length; x++){
   imagens[x].onmouseenter = function(){
   
      this.querySelector('span').style.display = 'inline-block';
   
   }

   imagens[x].onmouseleave = function(){
   
      this.querySelector('span').style.display = 'none';
   
   }
}