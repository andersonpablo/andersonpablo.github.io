	function arredonda(a) {
	return Math.floor(a*100)/100;
}

	function CalculaMedia(){
 
				 var Nota1_Tamanho = document.form.nota1.value.length;
				 var Nota2_Tamanho = document.form.nota2.value.length;
				 var Nota3_Tamanho = document.form.nota3.value.length;
 
						if (Nota1_Tamanho > 0 && Nota2_Tamanho > 0 && Nota3_Tamanho > 0) {
							  var n1 = document.form.nota1.value;
							  var n2 = document.form.nota2.value;
							  var n3 = document.form.nota3.value;
							  var media = arredonda((2*n1+3*n2+4*n3)/9);
			  
								document.getElementById("label1").innerHTML="<h3> <center>A média parcial é: "+media+" </center></h3>"; 
			  
									if (media < 3.5) {
									
									document.getElementById("label2").innerHTML="<h1><center>Reprovado.</center></h1>"; 
						  }
 
												else if (media >= 3.5 && media < 7.0) {
												var n4nec = arredonda((50-7*media)/3);
												document.getElementById("label2").innerHTML="<h3><center>Precisando de " + n4nec + " na 4º prova.</center></h3>";  
									  } 			else if (media >= 7.0) {
												document.getElementById("label2").innerHTML="<h1><center>Aprovado.</center></h1>"; 
									  }
 }
}

	function calculaNotaNecessaria(){
	
		 var n1 = document.form.nota1.value;
		 var n2 = document.form.nota2.value;
		 var n3 = document.form.nota3.value;
		 var Nota1_Tamanho = document.form.nota1.value.length;
		 var Nota2_Tamanho = document.form.nota2.value.length;
		 var Nota3_Tamanho = document.form.nota3.value.length;

			if (Nota1_Tamanho == 0 && Nota2_Tamanho > 0 && Nota3_Tamanho > 0) {
				n1nec = arredonda((63-3*n2-4*n3)/2);
				
					document.getElementById("label1").innerHTML="<h3> <center>Você precisa de " + n1nec + " </center></h3>";
					document.getElementById("label2").innerHTML="";
 }						 else if (Nota1_Tamanho > 0 && Nota2_Tamanho == 0 && Nota3_Tamanho > 0) {
							n2nec = arredonda((63-2*n1-4*n3)/3);

							document.getElementById("label1").innerHTML="<h3> <center>Você precisa de " + n2nec + " </center></h3>";
							document.getElementById("label2").innerHTML="";
 }
							else if (Nota1_Tamanho > 0 && Nota2_Tamanho > 0 && Nota3_Tamanho == 0) {
							  n3nec= arredonda((63-2*n1-3*n2)/4);
							  document.getElementById("label1").innerHTML="<h3><center>Você precisa de " + n3nec + "</center></h3>";
							  document.getElementById("label2").innerHTML="";
 } 									else if (Nota1_Tamanho > 0 && Nota2_Tamanho > 0 && Nota3_Tamanho > 0) {
									 document.getElementById("label1").innerHTML="<h4><center>Deixe pelo menos um campo vazio</center></h4>";
									 document.getElementById("label2").innerHTML="";

										  } else {
											
												document.getElementById("label1").innerHTML="<h4><center>Deixe pelo menos um campo vazio</center></h4>";
												document.getElementById("label2").innerHTML="";
 }
}