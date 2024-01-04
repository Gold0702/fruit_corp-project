import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './table.css'
export default function App() {
    const [page,setPage]=useState(1)
    const [inform,setinform]=useState([{}])
    const [initial,setInit]=useState(0)
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/fruit/query").then(res=>{
        setinform(res.data)
      })
      },[])
  return (
    <div>
      <Navbar index={page} event1={(page)=>{
        setPage(page)
      }} event2={(inform)=>{
        setinform(inform)
        console.log(inform)
      }}></Navbar>
      {page===1&&<Fruit inform={inform} event={(inform)=>{setinform(inform)}}/>}
      {page===2&&<Member inform={inform} event={(inform)=>{setinform(inform)}}/>}
      {page===3&&<FormerMember inform={inform} event={(inform)=>{setinform(inform)}}/>}
      {page===4&&<Vendor inform={inform} event={(inform)=>{setinform(inform)}}/>}
      {page===5&&<Trade inform={inform} event={(inform)=>{setinform(inform)}}/>}
    </div>
  )
}
function Fruit(props) {
  const [page,setPage]=useState(2)
  const selected={background:"black",color:"white"}
  const [body,setbody]=useState({
  })
  return (
    <div>
    {/*增刪改查功能選擇 */}
      <div>
        <button style={page===1?selected:{}} onClick={()=>{
          setPage(1)
          }
        }>新增</button>
        <button style={page===2?selected:{}} onClick={()=>{
          setPage(2)
        }}>查詢</button>
        <button style={page===3?selected:{}} onClick={()=>{
          setPage(3)
        }}>修改</button>
        <button style={page===4?selected:{}} onClick={()=>{
          setPage(4)
        }}>刪除</button>
      {/* 增刪改查的輸入欄位*/}
      </div>
      {
        page===1 && <FruitAdd event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===2 && <FruitQuery event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===3 && <FruitUpdate event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===4 && <FruitQuery event={(inform)=>{props.event(inform)}}/>
      }
      {/* 水果資料表的數據*/}
      <FruitData page={page} inform={props.inform} event={(inform)=>{props.event(inform)}}/>
    </div>
  )
}
function Member(props) {
  const selected={background:"black",color:"white"}
  const [page,setPage]=useState(2)
  const [object,setObj]=useState([{}])
  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/member/query").then((res)=>{
      setObj(res.data)
    })
  },[])
  var age=0
  object.forEach(element=>{
    age+=element.age
  })
  var avgAge=age/object.length
    return (
      <div>
        <div>
        {/*增刪改查的功能選擇 */}
          <button style={page===1?selected:{}} onClick={()=>{setPage(1)}}>新增</button>
          <button style={page===2?selected:{}} onClick={()=>{setPage(2)}}>查詢</button>
          <button style={page===3?selected:{}} onClick={()=>{setPage(3)}}>修改</button>
          <button style={page===4?selected:{}} onClick={()=>{setPage(4)}}>刪除</button>
        </div>
        {/*增刪改查的輸入欄位*/}
        {
          page===1 && <MemberAdd event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===2 && <MemberQuery event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===3 && <MemberUpdate event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===4 && <MemberQuery event={(inform)=>{props.event(inform)}}/>
        }
        <div>會員人數:{object.length} 會員平均年齡:{object.length===0?"":avgAge.toFixed(2)}</div>
        {/*會員數據 */}
        <MemberData page={page} event={(inform)=>{props.event(inform)}} inform={props.inform}/>
      </div>
    )
  }
function FormerMember(props) {
  const selected={background:"black",color:"white"}
  const [page,setPage]=useState(2)
  const [object,setObj]=useState([{}])
  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/former_member/query").then(res=>{
      setObj(res.data)
    })
  },[])
  var age=0
  object.forEach(element=>{
    age+=element.age
  })
  var avgAge=age/object.length
  return (
      <div>
        <div>
          {/*增刪改查功能選擇 */}
          <button style={page===2?selected:{}} onClick={()=>{setPage(2)}}>查詢</button>
          <button style={page===3?selected:{}} onClick={()=>{setPage(3)}}>修改</button>
          <button style={page===4?selected:{}} onClick={()=>{setPage(4)}}>移轉</button>
        </div>
        {/*增刪改查的輸入欄位*/}
        {
          page===2 && <FormerMemberQuery event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===3 && <FormerMemberUpdate event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===4 && <FormerMemberQuery event={(inform)=>{props.event(inform)}}/>
        }
        <div>靜止會員人數:{object.length} 靜止會員平均年齡:{object.length===0?"":avgAge.toFixed(2)}</div>
        {/*靜止會員數據 */}
        <FormerMemberData page={page} inform={props.inform} event={(inform)=>{props.event(inform)}}/>
      </div>
  )
}
function Vendor(props) {
  const selected={background:"black",color:"white"}
  const [page,setPage]=useState(2)
  const [object,setobj]=useState([{}])
  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/vendor/query").then((res)=>{
      setobj(res.data.filter(item=>item.status==="正常"))
    })
  },[])
    return (
      <div>
        {/*增刪改查的功能選擇 */}
        <div>
          <button style={page===1?selected:{}} onClick={()=>{setPage(1)}}>新增</button>
          <button style={page===2?selected:{}} onClick={()=>{setPage(2)}}>查詢</button>
          <button style={page===3?selected:{}} onClick={()=>{setPage(3)}}>修改</button>
          <button style={page===4?selected:{}} onClick={()=>{setPage(4)}}>刪除</button>
        </div>
        {/*增刪改查輸入欄位 */}
        {
          page===1 && <VendorAdd event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===2 && <VendorQuery event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===3 && <VendorUpdate event={(inform)=>{props.event(inform)}}/>
        }
        {
          page===4 && <VendorQuery event={(inform)=>{props.event(inform)}}/>
        }
        <div>共有{object.length}位供應商</div>
        {/*供應商數據 */}
        <VendorData page={page} inform={props.inform} event={(inform)=>{props.event(inform)}}/>
      </div>
    )
  }
function Trade(props) {
  const selected={background:"black",color:"white"}
  const [page,setPage]=useState(2)
return (
    <div>
      {/*增刪改查的功能選擇 */}
      <div>
        <button style={page===1?selected:{}} onClick={()=>{setPage(1)}}>新增</button>
        <button style={page===2?selected:{}} onClick={()=>{setPage(2)}}>查詢</button>
        <button style={page===3?selected:{}} onClick={()=>{setPage(3)}}>修改</button>
        <button style={page===4?selected:{}} onClick={()=>{setPage(4)}}>刪除</button>
      </div>
      {/*增刪改查的輸入欄位 */}
      {
        page===1 && <TradeAdd event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===2 && <TradeQuery event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===3 && <TradeUpdate event={(inform)=>{props.event(inform)}}/>
      }
      {
        page===4 && <TradeQuery event={(inform)=>{props.event(inform)}}/>
      }
      {/*交易數據 */}
    <TradeData page={page} inform={props.inform} event={(inform)=>{props.event(inform)}}/>
    </div>
)
}
function Navbar(props){
  const selected={background:"black",color:"white"}
    return(
        <div>
            <button style={props.index===1?selected:{}} onClick={()=>{
              props.event1(1)
              axios.get('http://127.0.0.1:5000/fruit/query').then((res)=>{
                props.event2(res.data)
              })
            }}>水果資料表介面</button>
            <button style={props.index===2?selected:{}} onClick={()=>{
              props.event1(2)
              axios.get('http://127.0.0.1:5000/member/query').then((res)=>{
                props.event2(res.data)
              })
            }}>會員資料表介面</button>
            <button style={props.index===3?selected:{}} onClick={()=>{
              props.event1(3)
              axios.get('http://127.0.0.1:5000/former_member/query').then((res)=>{
                props.event2(res.data)
              })
            }}>靜止會員資料表介面</button>
            <button style={props.index===4?selected:{}} onClick={()=>{
              props.event1(4)
              axios.get('http://127.0.0.1:5000/vendor/query').then((res)=>{
                props.event2(res.data)
              })
            }}>供應商資料表介面</button>
            <button style={props.index===5?selected:{}} onClick={()=>{
              props.event1(5)
              axios.get('http://127.0.0.1:5000/trade/query').then((res)=>{
                props.event2(res.data)
              })
            }}>水果交易資料表介面</button>
        </div>
    )
}
function FruitAdd(props){
  const [body,setbody]=useState({
    fruit_id:"",
    fruit_name:"",
    vendor_name:"",
    current_number:0,
    unit:"",
    unit_price:0.0 ,
    current_price:0.0,
    position:"",
    arrival_date:null,
    promotion_date:null,
    discard_date:null
  })
  return(
    <div>
      <table>
        <tr>
          <td>水果編號</td>
          <td>水果名稱</td>
          <td>水果供應商名稱</td>
          <td>公司內現有數量</td>
          <td>單位</td>
          <td>進貨單價</td>
        </tr>
        <tr>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.vendor_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='number' onChange={(evt)=>{
            var obj=body
            var value=parseInt(evt.target.value,10)
            obj.current_number=value
            obj.current_price=parseFloat(evt.target.value)*parseFloat(body.unit_price)
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.unit=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='number' step="0.01" onChange={(evt)=>{
            var obj=body
            var value=parseFloat(evt.target.value)
            obj.unit_price=value
            obj.current_price=parseFloat(evt.target.value)*parseFloat(body.current_number)
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>公司內存放位置</td>
          <td>進貨日期</td>
          <td>開始促銷日期</td>
          <td>該丟棄之日期</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.position=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='date' onChange={(evt)=>{
            var obj=body
            obj.arrival_date=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='date' onChange={(evt)=>{
            var obj=body
            obj.promotion_date=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='date' onChange={(evt)=>{
            var obj=body
            obj.discard_date=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onClick={()=>{
        axios.post("http://127.0.0.1:5000/fruit/add",{body:body}).then((res)=>{
          alert(res.data)
          axios.get("http://127.0.0.1:5000/fruit/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>新增</button>
    </div>
  )
}
function FruitQuery(props){
  const [fruit_id,setID]=useState("")
  const [fruit_name,setName]=useState("")
  const [value,setValue]=useState(0.0)
  const[number,setNum]=useState(0)
  return(<div>
      水果編號 <input onChange={(evt)=>{
        setID(evt.target.value)
      }}></input><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/fruit/query",{body:{fruit_id:fruit_id,fruit_name:""}}).then((res)=>{
          console.log(res.data)
          props.event([res.data])
        })
      }}>查詢</button> 水果名稱 <input onChange={(evt)=>{
        setName(evt.target.value)
      }}></input>
      <button onClick={()=>{
        axios.post("http://127.0.0.1:5000/fruit/query",{body:{fruit_id:"",fruit_name:fruit_name}}).then((res)=>{
          props.event(res.data)
          var value=0.0
          var Number=0
          res.data.forEach(element => {
            if(element.status==="正常"){
              value+=parseFloat(element.current_price)
              Number+=element.current_number
              setValue(value)
              setNum(Number)
            }
          })
        })
      }}>查詢</button>
      <div>公司內現有數量:{number} 現有價值小計:{value}</div>
    </div>)
}
function FruitUpdate(props){
  const [body,setbody]=useState({
    fruit_id:null,
    fruit_name:null,
    vendor_name:null,
    current_number:null,
    unit:null,
    unit_price:null,
    current_price:null,
    position:null,
    arrival_date:null,
    promotion_date:null,
    discard_date:null
  })
  
  return(
    <div>
      <table>
        <tr>
          <td>水果編號</td>
          <td>水果名稱</td>
          <td>水果供應商名稱</td>
          <td>公司內現有數量</td>
          <td>單位</td>
          <td>進貨單價</td>
        </tr>
        <tr>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.vendor_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.current_number=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>現有價值小計</td>
          <td>公司內存放位置</td>
          <td>進貨日期</td>
          <td>開始促銷日期</td>
          <td>該丟棄之日期</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.current_price=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.position=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.arrival_date=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.promotion_date=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.discard_date=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onclick={()=>{
        axios.post("http://127.0.0.1:5000/fruit/update",{body:{body}}).then((res)=>{

        })
      }}>修改</button>
    </div>
  )
}
function MemberAdd(props){
  const [body,setbody]=useState({
    member_id:"",
    member_name:"",
    telephone:"",
    cellphone:"",
    email:"",
    haveLine:"",
    address:"",
    age:0,
    member_discount:0.0,
    status:'正常'
  })
  return(<div>
      <table>
        <tr> 
          <td>會員身分證字號</td>
          <td>會員姓名</td>
          <td>電話</td>
          <td>手機號碼</td>
          <td>email</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.telephone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.cellphone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type="email" onChange={(evt)=>{
            var obj=body
            obj.email=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>是否加入東海水果公司之Line</td>
          <td>住址</td>
          <td>年齡</td>
          <td>會員折扣</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.haveLine=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.address=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type='number' onChange={(evt)=>{
            var obj=body
            obj.age=parseInt(evt.target.value,10)
            setbody(obj)
          }}></input></td>
          <td><input type='number' step="0.01" onChange={(evt)=>{
            var obj=body
            obj.member_discount=parseFloat(evt.target.value)
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onClick={()=>{
        axios.post("http://127.0.0.1:5000/member/add",{body:body}).then((res)=>{
          axios.get("http://127.0.0.1:5000/member/query").then((res)=>{
            props.event(res.data)
          })
          alert(res.data)
        })
      }}>新增</button>
    </div>)
}
function MemberQuery(props){
  const [member_id,setID]=useState("")
  const [member_name,setName]=useState("")
   return(<div>
    會員身分證字號 <input onChange={(evt)=>{
      setID(evt.target.value)
    }}></input> <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/member/query",{body:{member_id:member_id,member_name:""}}).then((res)=>{
        props.event([res.data])
      })
    }}>查詢</button> 會員姓名<input onChange={(evt)=>{
      setName(evt.target.value)
    }}></input>
    <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/member/query",{body:{member_id:"",member_name:member_name}}).then((res)=>{
        props.event(res.data)
      })
    }}>查詢</button>
    </div>)
}
function MemberUpdate(){
  const [body,setbody]=useState({
    member_id:null,
    member_name:null,
    telephone:null,
    cellphone:null,
    email:null,
    haveLine:null,
    address:null,
    age:null,
    member_discount:null
  })
  return(<div>
      <table>
        <tr>
          <td>會員身分證字號</td>
          <td>會員姓名</td>
          <td>電話</td>
          <td>手機號碼</td>
          <td>email</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.telephone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.cellphone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.email=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>是否加入東海水果公司之Line</td>
          <td>住址</td>
          <td>年齡</td>
          <td>會員折扣</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.haveLine=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.address=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.age=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_discount=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onclick={()=>{
        axios.post("http://127.0.0.1:5000/member/update",{body:body}).then((res)=>{

        })
      }}>修改</button>
    </div>)
}
function FormerMemberQuery(props){
  const [member_id,setID]=useState("")
  const [member_name,setName]=useState("")
   return(<div>
    會員身分證字號 <input onChange={(evt)=>{
      setID(evt.target.value)
    }}></input> <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/former_member/query",{body:{member_id:member_id,member_name:""}}).then((res)=>{
        props.event([res.data])
      })
    }}>查詢</button> 會員姓名<input onChange={(evt)=>{
      setName(evt.target.value)
    }}></input>
    <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/former_member/query",{body:{member_id:"",member_name:member_name}}).then((res)=>{
        props.event(res.data)
      })
    }}>查詢</button>
    </div>)
}
function FormerMemberUpdate(){
  const [body,setbody]=useState({
    member_id:null,
    member_name:null,
    telephone:null,
    cellphone:null,
    email:null,
    haveLine:null,
    address:null,
    age:null,
    member_discount:null
  })
  return(<div>
      <table>
        <tr>
          <td>會員身分證字號</td>
          <td>會員姓名</td>
          <td>電話</td>
          <td>手機號碼</td>
          <td>email</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.telephone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.cellphone=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.email=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>是否加入東海水果公司之Line</td>
          <td>住址</td>
          <td>年齡</td>
          <td>會員折扣</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=body
            obj.haveLine=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.address=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.age=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_discount=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onclick={()=>{
        axios.post("http://127.0.0.1:5000/former_member/update",{body:body}).then((res)=>{

        })
      }}>修改</button>
    </div>)
}
function VendorAdd(props){
  const [object,setObject]=useState({
    vendor_id:null,
    vendor_name:null,
    telephone:null,
    email:null,
    address:null,
    host:null
  })
  return(
    <div>
      <table>
        <tr>
          <td>供應商統一編號</td>
          <td>水果供應商名稱</td>
          <td>電話</td>
          <td>email</td>
          <td>住址</td>
          <td>負責人姓名</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.vendor_id=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.vendor_name=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.telephone=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.email=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.address=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.host=value
            setObject(obj)
          }}></input></td>
        </tr>
      </table>
      <button onClick={()=>{
        axios.post("http://127.0.0.1:5000/vendor/add",{body:object}).then((res)=>{
          axios.get("http://127.0.0.1:5000/vendor/query").then((res)=>{
            props.event(res.data)
          })
          alert(res.data)
        })
      }}>新增</button>
    </div>
  )
}
function VendorUpdate(){
  const [object,setObject]=useState({
    vendor_id:null,
    vendor_name:null,
    telephone:null,
    email:null,
    address:null,
    host:null
  })
  return(
    <div>
      <table>
        <tr>
          <td>供應商統一編號</td>
          <td>水果供應商名稱</td>
          <td>電話</td>
          <td>email</td>
          <td>住址</td>
          <td>負責人姓名</td>
        </tr>
        <tr> 
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.vendor_id=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.vendor_name=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.telephone=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.email=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.address=value
            setObject(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=object
            var value=evt.target.value
            obj.host=value
            setObject(obj)
          }}></input></td>
        </tr>
      </table>
      <button onclick={()=>{
        axios.post("http://127.0.0.1:5000/vendor/update",{body:object}).then((res)=>{

        })
      }}>修改</button>
    </div>
  )
}
function VendorQuery(props){
  const[vendor_id,setID]=useState("")
  const[vendor_name,setName]=useState("")
  return(<div>
    供應商統一編號<input onChange={(evt)=>{
      setID(evt.target.value)
    }}></input><button onClick={()=>{
      axios.post("http://127.0.0.1:5000/vendor/query",{body:{vendor_id:vendor_id,vendor_name:""}}).then((res)=>{
        props.event([res.data])
      })
    }}>查詢</button> 供應商名稱<input onChange={(evt)=>{
      setName(evt.target.value)
    }}></input>
    <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/vendor/query",{body:{vendor_id:"",vendor_name:vendor_name}}).then((res)=>{
        props.event(res.data)
      })
    }}>查詢</button>
    </div>)
}
function TradeAdd(props){
  const [body,setbody]=useState({
    fruit_id:"",
    member_id:"",
    quantity:0,
    unitPrice:0.0,
    totalPrice:0.0,
    TradeDate:"",
    predictedDate:"",
    actualDate:""
  })
  return(
    <div>
      <table>
        <tr>
          <td>水果編號</td>
          <td>會員身分證字號</td>
          <td>購買數量</td>
          <td>出售單價</td>
          <td>交易日期</td>
          <td>預計交運日期</td>
          <td>實際交運日期</td>
        </tr>
        <tr>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type="number" onChange={(evt)=>{
            var obj=body
            obj.quantity=parseInt(evt.target.value)
            obj.totalPrice=parseFloat(evt.target.value)*parseFloat(obj.unitPrice)
            setbody(obj)
          }}></input></td>
          <td><input type="number" step="0.01" onChange={(evt)=>{
            var obj=body
            obj.unitPrice=parseFloat(evt.target.value)
            obj.totalPrice=parseFloat(evt.target.value)*parseFloat(obj.quantity)
            setbody(obj)
          }}></input></td>
          <td><input type="date" onChange={(evt)=>{
            var obj=body
            obj.TradeDate=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type="date" onChange={(evt)=>{
            var obj=body
            obj.predictedDate=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input type="date" onChange={(evt)=>{
            var obj=body
            obj.actualDate=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onClick={()=>{
        axios.post("http://127.0.0.1:5000/trade/add",{body:body}).then((res)=>{
          alert(res.data)
          axios.get("http://127.0.0.1:5000/trade/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>新增</button>
    </div>
  )
}
function TradeUpdate(){
  const [body,setbody]=useState({
    fruit_id:null,
    member_id:null,
    fruit_name:null,
    vendor_name:null,
    quantity:null,
    unitPrice:null,
    totalPrice:null,
    PriceWithDiscount:null,
    TradeDate:null,
    predictedDate:null,
    actualDate:null
  })
  return(
    <div>
      <table>
        <tr>
          <td>水果編號</td>
          <td>會員身分證字號</td> 
          <td>購買數量</td>
          <td>出售單價</td>
        </tr>
        <tr>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.member_id=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.fruit_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.vendor_name=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.quantity=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.unitPrice=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
        <tr>
          <td>總金額</td>
          <td>折扣後金額</td>
          <td>交易日期</td>
          <td>預計交運日期</td>
          <td>實際交運日期</td>
        </tr>
        <tr>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.totalPrice=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.PriceWithDiscount=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.TradeDate=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.predictedDate=evt.target.value
            setbody(obj)
          }}></input></td>
          <td><input onChange={(evt)=>{
            var obj=body
            obj.actualDate=evt.target.value
            setbody(obj)
          }}></input></td>
        </tr>
      </table>
      <button onclick={()=>{
        axios.post("http://127.0.0.1:5000/trade/update",{body:body}).then((res)=>{
          
        })
      }}>修改</button>
    </div>
  )
}
function TradeQuery(props){
  const [fruit_id,setFID]=useState("")
  const [member_id,setMID]=useState("")
  return(<div>
    水果編號<input onChange={(evt)=>{
      setFID(evt.target.value)
    }}></input> <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/trade/query",{body:{fruit_id:fruit_id,member_id:""}}).then((res)=>{
        props.event(res.data)
      })
    }}>查詢</button> 會員身分證字號<input onChange={(evt)=>{
      setMID(evt.target.value)
    }}></input> <button onClick={()=>{
      axios.post("http://127.0.0.1:5000/trade/query",{body:{fruit_id:"",member_id:member_id}}).then((res)=>{
        props.event(res.data)
      })
    }}>查詢</button>
    </div>)
}
function FruitData(props){
  return(<table>
    <tr>
      <td>水果編號</td>
      <td>水果名稱</td>
      <td>供應商名稱</td>
      <td>公司內現有數量</td>
      <td>單位</td>
      <td>進貨單價</td>
      <td>現有價值小計</td>
      <td>公司內存放位置</td>
      <td>進貨日期</td>
      <td>開始促銷日期</td>
      <td>該丟棄之日期</td>
    </tr>
    {props.inform.filter(item=>item.status==="正常").map((item)=>(<tr>
      <td>{item.fruit_id}</td>
      <td>{item.fruit_name}</td>
      <td>{item.vendor_name}</td>
      <td>{item.current_number}</td>
      <td>{item.unit}</td>
      <td>{item.unitPrice}</td>
      <td>{item.current_price}</td>
      <td>{item.position}</td>
      <td>{item.ArrivalDate}</td>
      <td>{item.promotionDate}</td>
      <td>{item.discardDate}</td>
      {props.page===4&&<td><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/fruit/delete",{body:{fruit_id:item.fruit_id}}).then((res)=>{
          if(res.data.ok==="1"){
            axios.get("http://127.0.0.1:5000/fruit/query").then((res)=>{
              props.event(res.data)
            })
          }
        })
      }}>刪除</button></td>}
      </tr>
      ))}
    </table>)
}
function MemberData(props){
  return(<table>
    <tr>
      <td>會員身分證字號</td>
      <td>會員名字</td>
      <td>電話</td>
      <td>手機號碼</td>
      <td>email</td>
      <td>是否有東海水果公司之Line</td>
      <td>住址</td>
      <td>年齡</td>
      <td>會員折扣</td>
    </tr>
    {props.inform.filter(item=>item.status==="正常").map((item)=>(<tr>
      <td>{item.member_id}</td>
      <td>{item.member_name}</td>
      <td>{item.telephone}</td>
      <td>{item.cellphone}</td>
      <td>{item.email}</td>
      <td>{item.haveLine}</td>
      <td>{item.address}</td>
      <td>{item.age}</td>
      <td>{item.member_discount}</td>
      {props.page===4&&<td><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/member/delete",{body:{member_id:item.member_id}}).then((res)=>{
          axios.get("http://127.0.0.1:5000/member/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>停權</button></td>}
      </tr>
      ))}
    </table>)
}
function FormerMemberData(props){
  return(<table>
    <tr>
      <td>會員身分證字號</td>
      <td>會員名字</td>
      <td>電話</td>
      <td>手機號碼</td>
      <td>email</td>
      <td>是否有東海水果公司之Line</td>
      <td>住址</td>
      <td>年齡</td>
      <td>會員折扣</td>
    </tr>
    {props.inform.filter(item=>item.status==="已停止").map((item)=>(<tr>
      <td>{item.member_id}</td>
      <td>{item.member_name}</td>
      <td>{item.telephone}</td>
      <td>{item.cellphone}</td>
      <td>{item.email}</td>
      <td>{item.haveLine}</td>
      <td>{item.address}</td>
      <td>{item.age}</td>
      <td>{item.member_discount}</td>
      {props.page===4&&<td><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/former_member/delete",{body:{member_id:item.member_id}}).then((res)=>{
          axios.get("http://127.0.0.1:5000/former_member/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>移轉</button></td>}
      </tr>
      ))}
    </table>)
}
function VendorData(props){
  return(<table>
    <tr>
      <td>供應商統一編號</td>
      <td>水果供應商名稱</td>
      <td>電話</td>
      <td>email</td>
      <td>住址</td>
      <td>負責人姓名</td>
    </tr>
    {props.inform.filter(item=>item.status==="正常").map((item)=>(<tr>
      <td>{item.vendor_id}</td>
      <td>{item.vendor_name}</td>
      <td>{item.telephone}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.host}</td>
      {props.page===4&&<td><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/vendor/delete",{body:{vendor_id:item.vendor_id}}).then((res)=>{
          axios.get("http://127.0.0.1:5000/vendor/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>刪除</button></td>}
      </tr>
    ))}
    </table>)
}
function TradeData(props){
  return(<table>
    <tr>
      <td>水果編號</td>
      <td>會員身分證字號</td>
      <td>水果名稱</td>
      <td>供應商名稱</td>
      <td>購買數量</td>
      <td>單價</td>
      <td>總金額</td>
      <td>折扣後金額</td>
      <td>交易日期</td>
      <td>預計交運日期</td>
      <td>實際交運日期</td>
    </tr>
    {props.inform.filter(item=>item.status==="正常").map((item)=>(<tr>
      <td>{item.fruit_id}</td>
      <td>{item.member_id}</td>
      <td>{item.fruit_name}</td>
      <td>{item.vendor_name}</td>
      <td>{item.quantity}</td>
      <td>{item.unitPrice}</td>
      <td>{item.totalPrice}</td>
      <td>{item.PriceWithDiscount}</td>
      <td>{item.TradeDate}</td>
      <td>{item.predictedDate}</td>
      <td>{item.actualDate}</td>
      {props.page===4&&<td><button onClick={()=>{
        axios.post("http://127.0.0.1:5000/trade/delete",{body:{trade_id:item.trade_id}}).then((res)=>{
          axios.get("http://127.0.0.1:5000/trade/query").then((res)=>{
            props.event(res.data)
          })
        })
      }}>刪除</button></td>}
      </tr>
    ))}
    </table>)
}