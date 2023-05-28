import React,{useState} from 'react';
import './alumniChat.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export default function AlumniChat() {
    const alumniDet = [
        {
            id:0,
            name: "Aaditya Raj Sharma",
            company: "Capgemini",
            position: "Backend",
            passoutYear: "2022-23",
            linkedIn: "sdhfsafjd"
        },
        {
            id:1,
            name:"Garima Kushwaha",
            company: "Amantya",
            position: "Testing",
            passoutYear: "2022-23",
            linkedIn:"dfweff"
        }
    ];

   const [ToName,setToName] = useState('');
    const chatMsg=(event)=>{
        const name = event.target.getAttribute('data-name');
        if(name != null)
        setToName(name);
    }
  return (

    
    <div className='alumniPortal'>
        <div className='alumniCard'  onMouseOver={chatMsg}>
            {alumniDet.map(({id,name,company,position,passoutYear,linkedIn}) =>(
                <div className= "alumniDetails" key={id} data-name={name} >
                    <h4 className = "name">{name}</h4> 
                    <div className='detailKeyValue' >
                        <div className='alumniKey'>
                            <p><b>Company :</b></p>
                            <p><b>Position :</b> </p>
                            <p><b>Passout Year :</b> </p>
                            <p><b>-&gt; <a href={linkedIn}>LinkedIn</a> &lt;-</b></p>
                        </div>
                        <div className='alumniValue'>
                            <p>{company}</p>
                            <p>{position}</p>
                            <p>{passoutYear}</p> 
                        </div>
                    </div>    
                    <Link to = "/students" state={{Name : ToName}}><button id = "chat" >Chat</button></Link>
                </div>
            ))}
        </div>
    </div>
  )
}
