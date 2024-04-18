import React , {useState} from 'react'
import img1 from '../images/img1.png'
import { NavLink  } from 'react-router-dom'
import { useCookies } from 'react-cookie';
const Addresearch = () => {
 
    const [user, setUser] = useState({
       teacher_n:"",
        title: "",
        domain: "",
        additional:""
       
        
      });
      const [cookies, setCookie] = useCookies(['teacher_info']);
      const researchData = cookies.teacher_info;
      const { email } = researchData;
      const handleinputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      }
      const postData = async () => {
        try {
          const { teacher_n,teacher_email,title, domain,  additional} = user;
          const res = await fetch('/addr', {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              teacher_n:teacher_n,
              teacher_email:email,
              title:title,
              domain:domain,
              additional:  additional
            })
          });
          
          if(res.status === 400 ){
            window.alert("error");
         
          }
      else {
        window.alert("research added");
       
      
      }
          
        } catch (error) {
          console.error("Error:", error);
        }
      }
  return (
    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h1 className='regnp'>Add research </h1>
    <form method='POST'>
    <div className="form-grou">
        <label htmlFor="exampleInputEmail1">Teacher</label>
        <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='teacher_n' onChange={handleinputs} value={user.teacher_n}/>
      </div>
      
      <div className="form-grou">
        <label htmlFor="exampleInputEmail1">Title</label>
        <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='title' onChange={handleinputs} value={user.title}/>
      </div>
      <div className="form-grou">
        <label htmlFor="exampleInputPassword1">Domain</label>
        <input type="domain" className="form-control" id="exampleInputPassword1"  name='domain' onChange={handleinputs} value={user.domain} />
      </div>
      
      <div className="form-grou">
  <label htmlFor="additionalInfo">Additional Info</label>
  <textarea
    className="form-control"
    id="additionalInfo"
    name="additional" // Name attribute should be here
    onChange={handleinputs} // onChange should be here
    value={user.additional} // value should be here
    rows="4"
    placeholder="Enter additional information here..."
  ></textarea>
</div>
   <br></br>
      <br></br>
      
      <NavLink type="submit" className="login-button"   onClick={postData}>Submit</NavLink>
    </form>
  </div>
  )
}

export default Addresearch
