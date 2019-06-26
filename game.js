    var gameOver;
    var pontos = 0;
    var velPer1 = 7;
    var velPer2 = -5;
    var velPer3 = 10;
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");

    function desenhaFundo () {
        //preenche o fundo com cinza escuro
        contexto.fillStyle = "dimgray";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        //calçada superior
        contexto.fillStyle = "lightgray";
        contexto.fillRect(0, 0, canvas.width, 80);

        //paralelepipedo
        contexto.fillStyle = "darkgray";
        contexto.fillRect(0, 75, canvas.width, 10);

        //calçada inferior
        contexto.fillStyle = "lightgray";
        contexto.fillRect(0, 380, canvas.width, 100);

        //faixas da rua
        contexto.fillStyle = "yellow";
        for(var i =0; i < 35; i++) {
            //faixa superior
            contexto.fillRect(i*30-5, 185, 20, 4);

            //faixa inferior
            contexto.fillRect(i*29-5, 280, 20, 4);
        }
    }
    
    function desenhaPontos() {
        contexto.fillStyle = "black";
        contexto.font = "12pt Monospace";
        contexto.fillText(pontos, 5, 20);
    }

    function desenhaImagem() {
        contexto.drawImage(imagem, x, y, imagem.width, imagem.height);
    }

    function Sprite(caminhoDaImagem, xInicial, yInicial) {
        this.x = xInicial;
        this.y = yInicial;

        this.imagem = new Image();
        this.imagem.src = caminhoDaImagem;

        var that = this;
        this.imagem.onload = function() {
            that.largura = that.imagem.width;
            that.altura = that.imagem.height;
            that.desenhaImagem();
        }

        this.desenhaImagem = function() {
            contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
        }

        this.move = function(dx, dy) {
            this.x += dx;
            this.y += dy;

            //limites
            if(this.x > canvas.width) {
                this.x = -this.largura;
            } else if(this.x < -this.largura){
                this.x = canvas.width;
            }
            if(this.y > canvas.height - this.altra + 5) {
                this.y -= dy;
            } else if (this.y <= -5) {
                this.y = canvas.height - this.altura;
            }
        }

        this.colidiu = function(outro){
            var colidiuNoXTopo = outro.x >= this.x && outro.x <= (this.x + this.largura);
            var colidiuNoYTopo = outro.y >= this.y && outro.y <= (this.y + this.altura);
            var colidiuNoXBase = (outro.x + outro.largura) >= this.x && (outro.x + outro.largura) <= (this.x + this.largura);
            var colidiuNoYBase = (outro.y + outro.altura) >= this.y && (outro.y + outro.altura) <= (this.y + this.altura);
            return (colidiuNoXTopo && colidiuNoYTopo) || (colidiuNoXBase && colidiuNoYBase);
        }
    }

    var guga = new Sprite("guga.png", 400, 400);
    guga.passou = function() {
        if(this.y <= 0) {
            this.y = canvas.height - this.altura;
            return true;
        } else {
            return false;
        }
        
    };
    var personagem1 = new Sprite("personagem1.png", -10, 290);
    var personagem2 = new Sprite("personagem2.png", 560, 190);
    var personagem3 = new Sprite("personagem3.png", 10, 90);
    
    document.onkeydown = function(event) {
        if (gameOver) {
            return;
        }
        switch(event.which) {
            case 37: //move para esquerda
                guga.move(-100, 0);
            break;
            case 38: // move para cima
                guga.move(0, -100);
            break;
            case 39: // move para direita
                guga.move(100, 0);
            break;
            case 40: // move para baixo
                guga.move(0, 100);
            break;
        }
        if(guga.passou()){
            pontos++;
            velPer1++;
            velPer2--;
            velPer3++;
        }
    }

    setInterval(function(){
        desenhaFundo();
        desenhaPontos();
        guga.desenhaImagem();
        personagem1.desenhaImagem();
        personagem2.desenhaImagem();
        personagem3.desenhaImagem();

        if (gameOver) {
            contexto.fillStyle = "black";
            contexto.font = "Bold 80px Sans";   
            contexto.fillText("GAME OVER", canvas.width/6, canvas.height/2+18);
            contexto.fillStyle = "red";
            contexto.fillText("GAME OVER", canvas.width/6, canvas.height/2+20);
            return;
        }

        personagem1.move(velPer1, 0);
        personagem2.move(velPer2, 0);
        personagem3.move(velPer3, 0);

        if(personagem1.colidiu(guga)
            || personagem2.colidiu(guga)
            || personagem3.colidiu(guga)){
            gameOver = true;
        }
    }, 50);