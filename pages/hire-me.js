import {
  useEffect,
  useState
} from 'react'
import Toast from '../components/toasts'
import Swal from 'sweetalert2'
export default function HireMe() {

  const [name,
    setName] = useState('');
  const [email,
    setEmail] = useState('');
  const [company,
    setCompany] = useState('');
  const [budget,
    setBudget] = useState('');
  const [job,
    setJob] = useState('');
  const [description,
    setDescription] = useState('')
  const [msg,
    setMsg] = useState('');

  const [showDes,
    setShowDes] = useState('none');
  const [sendBtn,
    setSendBtn] = useState(false);

    const placeJob = (e)=> {
      setJob(e.target.value);
      (e.target.value == "other")? setShowDes('block'): setShowDes('none')
    }
 

    const handleSubmit = async(e)=> {
      e.preventDefault();
      setSendBtn(true);
      if (name.trim().length < 1) {
        setSendBtn(false);
        document.querySelector('#name').focus();
        return Toast("Enter your name", "warning");
      }
      if (email.trim().length < 1) {
        setSendBtn(false);
        document.querySelector('#email').focus(); 
        return Toast("Enter your email", "warning");
      }
      if (job.trim().length < 1) {
        setSendBtn(false);
        document.querySelector('#job').focus();
        return Toast("Select what you need", "warning");
      } else if (job == 'other' && description.trim().length < 1) {
        setSendBtn(false); 
        document.querySelector('#description').focus(); 
        return Toast("Describe what you want", "info");
      } 
      let info = {
        from: email,
        subject: "New job alert",
        msg: `Hello i am ${name} i want you to build a ${(job == 'other')? description: job} for me, my budget is ${budget}\n ${msg}\n ${company}`
      }


      let response = await fetch('/api/mailer', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }});
      let status = await response.json();
      if (status.sent) {
        setSendBtn(false);
        setName('');
        setEmail('');
        setCompany('')
        setJob('');
        setDescription('')
        setMsg('')
        setBudget('');
        return Swal.fire({
          icon: 'success',
          title: 'Request sent',
          html: `<span class="uk-text-muted">Thank you for sending in your request, I hope we can work together soon</span>`
        })
      } else {
        setSendBtn(false);
        return Toast('Request failed please try again', 'error');
      }
    }

    return (
 <div>
  <div className="uk-padding flex-center">
   <form onSubmit={handleSubmit}>
    <legend className="uk-legend uk-padding uk-padding-remove-horizontal">Hire me...</legend> 
    <div className="uk-grid uk-grid-collapse uk-child-width-1-2@m uk-width-expand uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top"> 
     <div className="uk-padding-small">
      <span className="uk-text-muted">Name<span style={ { color: 'red' }}>*</span></span>
      <input id="name" value={name} onChange={(e)=> setName(e.target.value)} className="uk-input uk-input-large" />
     </div>
     <div className="uk-padding-small">
      <span className="uk-text-muted">Email Address<span style={ { color: 'red' }}>*</span></span>
      <input id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="uk-input uk-input-large" />
     </div> 
     <div className="uk-padding-small">
      <span className="uk-text-muted">Company</span>
      <input id="company" value={company} onChange={(e)=> setCompany(e.target.value)} className="uk-input uk-input-large" />
     </div>
     <div className="uk-padding-small">
      <span className="uk-text-muted">What do you need<span style={ { color: 'red' }}>*</span></span>
      <select id="job" className="uk-select uk-input-large" onChange={placeJob} value={job}>
       <option value=''>select an option</option>
       <option value="website">Website</option>
       <option value="blog">Blog</option>
       <option value="store">Online Store</option>
       <option value="landing page">Landing Page</option>
       <option value="business page">Business Page</option>
       <option value="other">other</option>
      </select>
      <div className="uk-padding-small" style={ { display: showDes }}>
       <span className="uk-text-muted">Give a brief description<span style={ { color: 'red' }}>*</span></span>
       <textarea id="description" className="uk-textarea" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
      </div>
     </div>
     <div className="uk-padding-small">
      <span className="uk-text-muted">Budget Amount($)</span>
      <input id="budget" value={budget} type="number" onChange={(e)=> setBudget(e.target.value)} className="uk-input uk-input-large" />
     </div>
     <div className="uk-padding-small">
      <span className="uk-text-muted">Anything else?</span> 
      <textarea id="msg" value={msg} onChange={(e)=> setMsg(e.target.value)} className="uk-textarea uk-large"></textarea>
     </div>
    </div>
    <div className="uk-text-center">
      <button disabled={sendBtn} id="sendBtn" className="uk-button uk-button-large uk-width-expand hire-me-btn uk-border-rounded uk-width-2-3@s uk-width-1-2@m" type="submit">{(!sendBtn)?"Hire Me": "processing..."}</button>
     </div>  
   </form>
  </div> 
 </div>
    )
  } 