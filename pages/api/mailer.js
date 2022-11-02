import nodemailer from 'nodemailer'


export default async function main(req,res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  
  
  let body = JSON.parse(JSON.stringify(req.body))
  
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'edna32@ethereal.email',
        pass: 'NnWfvFzhhsazMsY9ZC', 
    },
  });

  // send mail with defined transport object
try {
  let info = await transporter.sendMail({
    from: body.from,//'"Fred Foo 👻" <foo@example.com>', // sender address
    to: "josiahadeniyi1@gmail.com", // list of receivers
    subject: body.subject || 'New message from jossycodes', // Subject line
    text: body.msg, // plain text body
    replyTo: body.from,   
  });  

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
 return res.json({sent:true});  
 
} catch(err) {
  console.log(err); 
  return res.json({sent: false,message: "message not sent"})
  
}
  return res.json({sent: false,message: "message not sent"}) 
} 

//main().catch(console.error);
 