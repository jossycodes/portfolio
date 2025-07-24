import Head from 'next/head'
import Image from 'next/future/image'
import Link from 'next/link'  
import {useEffect,useState} from 'react'
import aos from 'aos'
import uikit from 'uikit'
import Toast from '../components/toasts'
import Typed from 'react-typed' 

  
export default function Home() {
  
const [mailBtn,setMailBtn] = useState(false);
  
useEffect(() => {
aos.init({once: true});   

const elms = document.querySelectorAll(".sticky"); 
const observer = new IntersectionObserver(
 ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1), { threshold: [1] }    
);   
 
for (let i = 0; i < elms.length; i++) {
 observer.observe(elms[i]);
}
},[])

 const handleSubmit = async(e)=> {
  e.preventDefault(); 
  
  let msg = document.querySelector('#msg');
  let from = document.querySelector('#from');
  
  const data = {
   msg: msg.value,
   from: from.value
  }
  
  if(msg.value.length < 1){
   msg.focus(); 
    return Toast("Enter a message to send","warning")
  }
  if(from.value.length < 1) {
  from.focus(); 
    return Toast("Enter an email address","warning")
  }
  
  setMailBtn(true);  
 
  let response = await fetch('/api/mailer',{method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }}); 
  let status = await response.json();
  if(status.sent) {
    msg.value = ""
    from.value = ""  
    setMailBtn(false);
   return Toast("Message sent successfully","success");
  } else {
    setMailBtn(false);
   return Toast("Message not sent, try again", "error");
  }
}  
 
return (   
 <div>
  <Head>
   <title>Jossycodes</title>  
  </Head> 
  <div id="profile">  
   <div id="me" className="uk-grid uk-grid-collapse">
   
   <div id="pic-2" className="uk-width-2-5 uk-visible@s">
   <div id="pic-2-sus">
    <div  className="img-cover uk-box-shadow-medium">
      <Image src="/images/me.png" alt="my picture" width="230" height="230"/>
    </div> 
    </div>
   </div>    
   
   <div id="details" className="uk-width-expand"> 
    <div id="pic" className="uk-hidden@s img-cover"> 
     <Image src="/images/me.png" alt="my picture" width="100" height="100"/>         
    </div> 
    <div id="bio"> 
    <h1>
     <Typed strings={['Hi, I am Josiah.','I build.','I  design.','I  develop.']}  typeSpeed={100} loop={true} startDelay={700} backSpeed={100}  />        
      </h1>      
    </div> 
    <div id="btns" data-uk-grid className="uk-grid">     
     <div className="uk-width-3-5@m uk-padding-small">    
      <Link href="hire-me"><a><button className="uk-button hire-me-btn uk-border-rounded uk-button-large uk-width-expand"><big>hire me <b><i className="bi-chevron-double-right"></i></b></big></button></a></Link>         
     </div>       
     <div className="uk-width-expand uk-padding-small">   
      <button className="uk-button uk-button-large uk-border-rounded uk-width-expand msg-me-btn" onClick={(()=> {document.querySelector('#msg').focus()})}>message me <i className="bi-chevron-down"></i></button>
     </div>   
    </div>
    <div id="space" className="uk-hidden@s"></div> 
    </div>
    
    <div className="area">
    <ul className="circles">
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
    </ul> 
   </div>   
    
   </div>
   
  </div> 
  <div id="main">
   <div id="info" className="uk-grid">
    <div className="uk-width-expand@m">
     <div className="">
      <h2 className="uk-text-cente sticky">About Me</h2>
      <p className="uk-text-muted uk-padding uk-padding-remove-top">
      Hello <big className="uk-text-large">👋</big>, I am a fullstack web developer.<br />
        I am passionate about my work, a problem solver who is willing to learn, a team player, I always want to be part of something greater. i like to think that i can rise to any challenge when given a chance.
       <br />I am well rounded, but javascript is my wheelhouse.
      </p>   
     </div> 
     <div id="experience" className="">
      <h2 className="sticky">Experience</h2> 
      <p className="uk-padding uk-text-muted uk-padding-remove-top">Fullstack developer with 4+ years experience on the frontend working with technologies like reactjs, 3+ years of experience working on the backend with technologies like Nodejs and Laravel. <p>Experience with database management systems, using technologies like MongoDB and MySQL</p></p>
      {/*<div className="uk-padding uk-padding-remove-top">
       <h4>
        <span>junior developer</span>
        <span className="uk-float-right">2019 - 2020</span>
       </h4>
       <div className="uk-text-muted">
        i worked with a team to bring an idea to life that would help guide high school leavers on the choice of university they would choose by providing useful data about such schools. it was powered by jtech
       </div>
       <ul className="uk-text-muted">
        <li>i assisted the development manager in all design task.</li>
        <li>i was involved the backend development of the project</li>
        <li>i was involved in project management tasks</li>
       </ul>
      </div>*/}
     </div> 
    </div>
    <div className="uk-width-1-3@m">
     <div id="skills" className="">
      <h2 className="sticky">Stack</h2>
      <p className="uk-padding uk-text-muted uk-padding-remove-top">In the past few years and up until now, i have worked with a couple of technologies some of which are outlined below <big className="uk-text-large">👇.</big></p>  
      <h4 className="uk-text-muted uk-text-center">Front End</h4>
      <div className="uk-padding">
       <div uk-grid className="skills uk-grid uk-child-width-1-2  uk-child-width-1-3@s">
        <div data-aos="zoom-in" className="uk-padding-small"> 
       
         <Image src="/images/html-icon.png" height="50" width="50"  layout="intrinsic" alt="html5 logo"/>  
         
         <span  className="">html5</span>      
        </div> 
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/css-icon.png" height="50" width="50" alt="css logo"/> <span>css3</span>
        </div>
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/javascript-icon.png" height="50" width="50" alt="js logo"/> <span>javascript</span> 
        </div>
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/react-icon.png" height="50" width="50"  alt="react logo"/> <span>react.js</span>
        </div>
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/material-ui-icon.png" height="50" width="50" alt="mui logo"/><span> mui</span>   
        </div>
       </div>
       <h4 className="uk-text-muted uk-text-center">Back End</h4>
       <div uk-grid className="skills uk-grid uk-child-width-1-2 uk-child-width-1-3@s"> 
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/nodejs-icon.png" height="50" width="50"  alt="nodejs logo"/>&nbsp;<span> node.js</span>
        </div>
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/next.js-icon.png" height="50" width="50" alt="nextjs logo"/>&nbsp;<span>next.js</span>
        </div>
        <div data-aos="zoom-in" className="uk-padding-small">
         <Image src="/images/mongodb-icon.png" height="50" width="50" alt="mongodb logo"/>&nbsp;<span>mongodb</span>    
        </div> 
       </div>
      </div>   
      
     </div>
    </div>
   </div> 
   
   <div id="services">
    <h2 className="sticky">Services</h2>
    {/*<h5 className="uk-padding uk-text-muted uk-padding-remove-top">Here is a range of services i offer for my clients</h5>*/} 
    <div className="uk-padding">
     <ul className="uk-grid uk-child-width-1-3@s">    
      <li><span className="uk-card uk-padding-small service" data-aos="zoom-out-up">Web Development</span></li>  
      <li><span className="uk-card uk-padding-small service" data-aos="zoom-out-up">Search Engine Optimization</span></li>
      <li><span className="uk-card uk-padding-small service" data-aos="zoom-out-up">Graphic Designs</span></li>
      <li><span className="uk-card uk-padding-small service" data-aos="zoom-out-up">UI UX design</span></li>
      <li><span className="uk-card uk-padding-small service" data-aos="zoom-out-up">Web Templates</span></li>
      </ul>
    </div>
   </div>  
   
   <div id="projects">
    <h2 className="sticky">My Works</h2>
    <h5 className="uk-padding uk-text-muted uk-padding-remove-top">Checkout some projects i have built personally, just swipe and tap to view them.</h5> 
    <div className="uk-padding">
     <div>
      <div className="uk-slider-container-offset" data-uk-slider>
       <div className="uk-position-relative uk-visible-toggle uk-light" data-tabindex="-1">
        <ul className="uk-slider-items uk-child-width-3-4 uk-child-width-1-2@m uk-grid"> 
         <li> 
          <div className="uk-card uk-card-default uk-grid uk-grid-collapse uk-child-width-1-2@s">    
           <div className="uk-card-media-left uk-border-rounded">
          <Image src="/images/gomyweather.jpg"  width="400" height="400" className="card-img" alt="gomyweather"/>  
          </div>    
           <div className="uk-card-body uk-padding-small">
            <h3 className="uk-card-title">Gomyweather</h3>
            <p>Using an api this app provides useful data about the weather conditions of over 200,000 cites in the world.</p>
            <div className="uk-text-right"><a href="https://gomyweather.netlify.app"> <button className="card-btn">check it out  <i className="bi-chevron-right"></i></button></a></div>       
           </div> 
          </div>
         </li>
         <li>
          <div className="uk-card uk-card-default uk-grid uk-grid-collapse uk-child-width-1-2@s">    
           <div className="uk-card-media-left uk-border-rounded">
          <Image src="/images/jefi.jpg"  width="400" height="400" className="card-img" alt="jefi"/>   
          </div>
           <div className="uk-card-body uk-padding-small">
            <h3 className="uk-card-title">Jefi</h3>
            <p>An online shop.
             <br />order  a product and get it delivered to you(demonstration purposes only).</p> 
             <div className="uk-text-right"><a href="#"><button className="card-btn">check it out  <i className="bi-chevron-right"></i></button></a></div> 
           </div>
          </div>
         </li> 
         <li>
          <div className="uk-card uk-card-default uk-grid uk-grid-collapse uk-child-width-1-2@s">    
           <div className="uk-card-media-left uk-border-rounded">
          <Image src="/images/payfum.jpg"  width="400" height="400" className="card-img" alt="payfum"/>   
          </div>
           <div className="uk-card-body uk-padding-small">
            <h3 className="uk-card-title">Payfum</h3> 
            <p>Expolore the landing page of a newly launched mobile money app (demonstration purposes only).</p> 
            <div className="uk-text-right"><a href="#"><button className="card-btn">check it out  <i className="bi-chevron-right"></i></button></a></div> 
           </div>
          </div>
         </li>
         <li>
          <div className="uk-card uk-card-default uk-grid uk-grid-collapse uk-child-width-1-2@s">    
           <div className="uk-card-media-left uk-border-rounded">
          <Image src="/images/smat.jpg"  width="400" height="400" className="card-img" alt="smat"/>   
          </div>
           <div className="uk-card-body  uk-padding-small">  
            <h3 className="uk-card-title">Smat</h3>
            <p>Connect with work, friends and family. built on nextjs and socket.io.</p>   
            <div className="uk-text-right"><a href="#"><button className="card-btn">check it out  <i className="bi-chevron-right"></i></button></a></div> 
           </div> 
          </div>
         </li>
         <li>
          <div className="uk-card uk-card-default uk-grid uk-grid-collapse uk-child-width-1-2@s">    
           <div className="uk-card-media-left uk-border-rounded">
          <Image src="/images/blup.jpg"  width="400" height="400" className="card-img" alt="blup"/>   
          </div> 
           <div className="uk-card-body uk-padding-small"> 
            <h3 className="uk-card-title">Blup</h3>
            <p>Play a fun game, pop some balls and relax.</p>
            <div className="uk-text-right"><a href="#"><button className="card-btn">check it out  <i className="bi-chevron-right"></i></button></a></div> 
           </div>
          </div>
         </li> 
        </ul>  
        <a className="uk-position-center-left uk-position-small project-nav-arrows uk-box-shadow-medium uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"><i className="bi-arrow-left"></i></a>   
        <a className="uk-position-center-right uk-position-small uk-hidden-hover project-nav-arrows uk-box-shadow-medium" href="#" uk-slidenav-next uk-slider-item="next"><i className="bi-arrow-right"></i></a> 
       </div>
       {/*<ul className="uk-slider-nav uk-dotnav  uk-flex-center uk-margin"></ul>*/} 
      </div>
     </div>
    </div>
   </div>
   
   <div className="uk-grid uk-grid-collapse  uk-child-width-1-2@s"> 
   <div className="flex-center uk-hidden@s"><Image src="/images/lightbulb.png" height="300" width="300" alt="what's the big idea"/></div>   
   <div>  
   <h3 className="uk-padding uk-text-muted uk-padding-remove-top">Got an ideea?<br/>Dont sleep on it, lets build together now!</h3>       
    <div className="uk-padding uk-text-center">   
       <Link href="hire-me"><a><button className="uk-button  uk-border-rounded hire-me-btn uk-width-expand uk-button-large">hire me now</button></a></Link>    
      </div>
      </div>
      <div className="flex-center uk-visible@s"><Image src="/images/lightbulb.png" height="300" width="300" alt="what's the big ideal"/></div>  
     </div> 
  </div>
  <div id="footer">
  <form onSubmit={handleSubmit}>
   <div className="uk-padding-small uk-light flex-center socials"> 
    <textarea id="msg" className="uk-width-1-2@m" placeholder="Go on write something..."></textarea>
   </div>
   <div className="uk-padding-small uk-text-center">
    <input id="from" className="uk-input uk-border-rounded uk-width-1-2@m" placeholder="your email address..."></input>  
   </div>
   <div className="uk-text-center uk-padding-small">
    <button disabled={mailBtn} type="submit" className="uk-button uk-border-rounded uk-button-large uk-width-1-2@m">send <i className="bi-send-fill  send-btn"></i></button>   
   </div> 
  </form> 
   
   <div className="socials uk-padding-large">
    <!--<a href="mailto: josiahadeniy1@gmail.com"><span className="bi-envelope-fill"></span></a>-->
    <a href="https://github.com/jossycodes"><span className="bi-github"></span></a>
    <a href="https://www.linkedin.com/in/josiah-adeniyi-329168240"><span className="bi-linkedin"></span></a>
    <a href="https://www.fiverr.com/s/0bGvDDL"><span className="bi-fiverr"></span></a>
   </div>
  </div>
 </div>    
 )
} 
