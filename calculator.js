window.onload = function() {
	let makeMatrixBtn = document.getElementById('makeMatrixBtn'); //생성하기 버튼
	let madeMatrix = document.getElementById('madeMatrix'); //생성된 행렬 나오는 박스
	let Bank=[]; //공배열
	let alertBox = document.getElementById('alertBox'); //알림창
	let inAlertBox = document.getElementById('inAlertBox'); //알림창 내 알림 내용 들어갈 박스
	let closeAlert = document.getElementById('closeAlert'); //알림창 내 닫기 버튼
	//알림창 함수
	let displayAlert = inAlert => {
		alertBox.style.display="block";
		inAlertBox.innerHTML = inAlert;
		closeAlert.addEventListener('click',function() {
			alertBox.style.display="none";
		});
	}
	//행렬 개체
	function makeMatrixBox(matrixX, matrixY, matrixNum) {
		this.matrixX = matrixX; //행의 값
		this.matrixY = matrixY; //열의 값
		this.matrixNum = matrixNum; //행렬 번호A=0, B=1
		this.temporaryArray=[];
		this.matrixArray=[];
		//행렬 생성
		this.makeMatrixV = function() {
			madeMatrix.innerHTML += '<div class="inMatrixBox"></div>';
			let inMatrixBox = document.getElementsByClassName('inMatrixBox')[this.matrixNum];
			i=0;
			while(i<this.matrixX) {
				j=0;	
       		  		while(j<this.matrixY) {
					document.getElementsByClassName('inMatrixBox')[this.matrixNum].innerHTML += '<input class="inMatrixValue" type="number" value="0">';
					j++;
            			}	
        			inMatrixBox.innerHTML += "<br>";
            			i++;	    
    			}
    		}
		//만든 A,B 행렬의 값 배열에 담기
		this.tempArray = function() {
			let inMatrixValue = document.getElementsByClassName('inMatrixValue');
			i=0;
			while(i<inMatrixValue.length) {
				Bank[i] = inMatrixValue[i].value;
				i++;
       			}
		}
		this.makeArray = function() {
			//임시배열에 행렬값 담기
     			i=0;
       		 	while(i<(this.matrixX*this.matrixY)) {
       		     		this.temporaryArray.push(Bank.shift());
       		     		i++;
        		}
			//matrixArray[i]에 값 담기
			i=0;
			while(i<this.matrixX) {
				this.matrixArray[i]=[];
				j=0;
        			while(j<this.matrixY) {
					this.matrixArray[i][j] = this.temporaryArray[0];
					this.temporaryArray.shift();
       			     		j++;
       				}
				i++;
			}
			return(this.matrixArray);
		}
	}
	//행과 열 입력받을 변수 선언
		let matrixAX = document.makeMatrix.matrixAX;
		let matrixAY = document.makeMatrix.matrixAY;
		let matrixBX = document.makeMatrix.matrixBX;
		let matrixBY = document.makeMatrix.matrixBY;
	//행렬 생성 버튼 실행
		makeMatrixBtn.addEventListener('click',function() {
			madeMatrix.innerHTML = "";
			let matrixA = new makeMatrixBox(matrixAX.value, matrixAY.value, 0);
			matrixA.makeMatrixV();
			let matrixB = new makeMatrixBox(matrixBX.value, matrixBY.value, 1);
			matrixB.makeMatrixV();
			let buttonBox = document.getElementById('buttonBox');
			buttonBox.style.display="block";
	    	});

	//계산기 객체
	function matrixCalculator(mA, mB) {
		this.mA = mA;
		this.mB = mB;
		this.plus=[];
		this.minus=[];
		this.multi=[];
		//덧셈 계산기
		this.plusmAB = function() {
			i=0;
			while(i<this.mA.length){
				j=0;
				this.plus[i]=[];
				while(j<this.mA[0].length) {
					this.plus[i][j] =parseInt(this.mA[i][j])+parseInt(this.mB[i][j]);
					j++;
				}
				i++;
			}
			return(this.plus);
		}
		//뺄셈 계산기
		this.minusmAB = function() {
			i=0;
			while(i<this.mA.length){
				j=0;
				this.minus[i]=[];
				while(j<this.mA[0].length) {
					this.minus[i][j] = parseInt(this.mA[i][j])-parseInt(this.mB[i][j]);
					j++;
				}
				i++;
			}
			return(this.minus);
		}
		//AB 곱셈 계산기
		let myA = [], myV=0;
		this.multimAB = function() {
			i=0;
			while(i<this.mA.length) {
				j=0;
				while(j<this.mB[0].length){
					k=0;
					while(k<this.mA[0].length) {
						myV += parseInt(this.mA[i][k]*this.mB[k][j]);
						k++;
					}
					myA.push(myV);
					myV=0;
					j++;
				}
				i++;
			}
			i=0;
			while(i<this.mA.length) {
				j=0;
				this.multi[i]=[];
				while(j<this.mB[0].length) {
					this.multi[i][j]=myA[0];
					myA.shift();
					j++;
				}
				i++;	
			}
			return(this.multi);
		}
		//resultBox에 값 입력하기
		let resultBox = document.getElementById('resultBox'); //결과값 입력할 박스
		//덧셈, 뺄셈 계산값 입력
		this.resultPMAB = function(res) {
			resultBox.innerHTML = "";
			resultBox.innerHTML += '<div class="inResultBox" id="inResultBox"></div>';
			let inResultBox = document.getElementById('inResultBox');
			i=0;
			while(i<this.mA.length) {
				j=0;
       		  		while(j<this.mA[0].length) {
					inResultBox.innerHTML += '<div class="inResultM type="number">'+res[i][j]+'</div>';
                	        	j++;
                	        }
                       	i++;
			inResultBox.innerHTML += "<br>";
 			}
		}
		//곱셈 계산값 입력
		this.resultAB = function(res) {
			resultBox.innerHTML = "";
			resultBox.innerHTML += '<div class="inResultBox" id="inResultBox"></div>';
			let inResultBox = document.getElementById('inResultBox');
			i=0;
			while(i<this.mA.length) {
				j=0;
       		  		while(j<this.mB[0].length) {
					inResultBox.innerHTML += '<div class="inResultM">'+res[i][j]+'</div>';
                	        	j++;
                	        }
                	        i++;
				inResultBox.innerHTML += "<br>";
 			}
		}
	}
	let plusAB = document.getElementById('plusAB'); //덧셈 버튼
	let minusAB = document.getElementById('minusAB'); //뺄셈 버튼
	let multiAB = document.getElementById('multiAB'); //곱셈 버튼
	let randomAB = document.getElementById('randomAB'); //random값 입력 버튼
	//계산 실행
	this.addEventListener('click',function(e) {
		switch(e.target.id){
			//덧셈 버튼 실행
			case "plusAB":
			 	if (matrixAX.value==matrixBX.value && matrixAY.value==matrixBY.value) {
					let matrixA = new makeMatrixBox(matrixAX.value, matrixAY.value, 0);
					let matrixB = new makeMatrixBox(matrixBX.value, matrixBY.value, 1);
					matrixA.tempArray();
					let resultmA = matrixA.makeArray();
					let resultmB = matrixB.makeArray();
					let plusmAmB = new matrixCalculator(resultmA, resultmB);
					let resultPlus =  plusmAmB.plusmAB();
					plusmAmB.resultPMAB(resultPlus);
				} else{
					displayAlert('계산할 수 없습니다. <br/>행렬A와 행렬B의 행의 값과 열의 값이 각각 동일해야 합니다. <br/>예시: 행렬A(3X2), 행렬B(3X2)');}
				break;
			//뺄셈 버튼 실행
			case "minusAB":
				if (matrixAX.value==matrixBX.value && matrixAY.value==matrixBY.value) {
					let matrixA = new makeMatrixBox(matrixAX.value, matrixAY.value, 0);
					let matrixB = new makeMatrixBox(matrixBX.value, matrixBY.value, 1);
					matrixA.tempArray();
					let resultmA = matrixA.makeArray();
					let resultmB = matrixB.makeArray();
					let minusmAmB = new matrixCalculator(resultmA, resultmB);
					let resultMinus = minusmAmB.minusmAB();
					minusmAmB.resultPMAB(resultMinus);
       				}else{
					displayAlert('계산할 수 없습니다. <br/>행렬A와 행렬B의 행의 값과 열의 값이 각각 동일해야 합니다. <br/>예시: 행렬A(3X2), 행렬B(3X2)');
       				}
				break;
			//곱셈 버튼 실행
			case "multiAB":
				if (matrixBX.value == matrixAY.value) {
					let matrixA = new makeMatrixBox(matrixAX.value, matrixAY.value, 0);
					let matrixB = new makeMatrixBox(matrixBX.value, matrixBY.value, 1);
					matrixA.tempArray();
					let resultmA = matrixA.makeArray();
					let resultmB = matrixB.makeArray();
					let multimAmB = new matrixCalculator(resultmA, resultmB);
					let resultMultiAB = multimAmB.multimAB();
					multimAmB.resultAB(resultMultiAB);
			       	}else{
					displayAlert('계산할 수 없습니다. <br/>행렬A의 열의 값과 행렬B의 행의 값이 동일해야 합니다. <br/>예시: 행렬A(3X4), 행렬B(4X2)');
       				}
				break;	
			//랜덤 버튼 실행
			let inMatrixValue = document.getElementsByClassName('inMatrixValue');
			case "randomAB":
				i=0;
				while(i<(matrixAX.value*matrixAY.value)+(matrixBX.value*matrixBY.value)){
					document.getElementsByClassName('inMatrixValue')[i].value = parseInt((Math.random()*50)-(Math.random()*50));
				i++;
				}
			break;
		}
	});
}

