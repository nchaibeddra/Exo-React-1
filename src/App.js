import './App.css';
import {useEffect , useState} from "react";




function  Liste(props) {
    const [pays, setPays] = useState({ hook: [] });
    const { setData, selectData } = props
    let index = 0

    function select (e) {
        const val = e.target.textContent
        const id = e.target.id
        const item = document.getElementById(id)
        let tab = selectData.slice()
        let found = selectData.includes(val)
        let remove = (val) =>{
            const index = tab.indexOf(val);
            if (index > -1) {
                tab.splice(index, 1);
            }
        }
        item.classList.contains('selected') ? item.classList.remove('selected') : item.classList.add('selected')
        found ? remove(val) : tab.push(val)
        setData(tab)

    }

    useEffect(async function () {
        const result = await fetch('https://restcountries.com/v3.1/all').then((res) => {
            return res.json()
        });
        setPays(result);
    }, []);
    let countryList = Object.keys(pays).map(function(key) {
        if(pays[key].name){
            index++
            const name = pays[key]['name']['common']
            return   <li id={index} key={name} state={'false'} className={name + ' ' +'item'} onClick={select}> {name} </li>
        }
    });

    return <ol className="table"> {countryList} </ol>

}


let HashTag = (props) => {
    const { setData, selectData } = props
    const option = selectData.map((e)=> {
        console.log(e)
        return  <span className={'hash m2'} key={e} value={e}> #{e} </span>
    })
    return <div className={'m6 p1 hashTable'}>  {option} </div>

}


let  Input = (props) => {
    const {  selectData } = props
    if(selectData.length >= 1){
        return  <div className={'send'}>
            <input  type={"email"} placeholder={'votre.adresse@mail.com'}/>
        </div>
    }else{
        return null
    }

}


function App() {
    const [selectData, setData] = useState([])

    return (
        <div className="App m12">
            <div className="flexRow m12">
                <Liste className="m6 p5 " selectData={selectData} setData={setData}/>

                <div className={'flexCol m8'}>
                    <Input  selectData={selectData} setData={setData}  />
                    <HashTag selectData={selectData} setData={setData} />
                </div>
            </div>
        </div>
    );
}

export default App;
