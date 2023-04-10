
import { useState } from 'react';
import styles from './App.module.css'
import poweredImage from './assets/powered.png'//importando as imagens do assets
import { levels,calculateImc,Level } from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'
const App=()=> {
  const [heightField,setheightField] = useState<number>(0);
  const [weightField, setWeightField]= useState<number>(0);
  const [toShow,setShow]= useState<Level|null>(null);
  const handleCalculeteButton=()=>{
    if(heightField && weightField){
      setShow(calculateImc(heightField,weightField))
    }else{
      alert("Digite todos os campos.");
    }
  }
  const handleBackButton =()=>{
    setShow(null)
    setWeightField(0)
    setheightField(0)
  }
  return (
    <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} alt="" width={150}/>
          </div>
        </header>
        {/**Essa modelo é feito para ficar rsponsivo quando estivr sendo acessado no celular ficará um abaixo do outro*/}
        <div className={styles.container}>
          <div className={styles.leftSide}>{/**Para o conteúdo ficar do lado esquerdo */}
            <h1>Calcule o seu IMC</h1>
            <p>IMC é uma sigla para Índice de Massa Corpória, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
            <input
            type='number'
            placeholder='Digite a sua altura. Ex:1.5 (em metros)'
            value={heightField>0?heightField:''}
            onChange={e=>setheightField(parseFloat(e.target.value))}
            disabled={toShow?true:false}
            />
            <input
            type='number'
            placeholder='Digite o seu peso. Ex:75.3 (em kg)'
            value={weightField>0?weightField:''}
            onChange={e=>setWeightField(parseFloat(e.target.value))}
            disabled={toShow?true:false}
            />
            <button
            onClick={handleCalculeteButton}
            disabled={toShow?true:false}

            >
              Calcular
            </button>         
          </div>
          <div className={styles.rightSide}>{/**Para o conteúdo ficar do lado direto */}
            {!toShow &&
            <div className={styles.grid}>
              {levels.map((item,key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width={25}/>
                </div>
                <GridItem item={toShow}/>
              </div>
            }
          </div>
        </div>
    </div>
  );
}

export default App;
