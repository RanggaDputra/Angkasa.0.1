import icon from '../Assets/illustration.png'
import Image from 'next/image';
import apel from '../Assets/apple.png'
import gugel from '../Assets/gogle.png'
import fb from '../Assets/fb.png'
import twit from '../Assets/twitter.png'
import ig from '../Assets/instagram.png'
import yt from '../Assets/youtube.png'


export default function Footer() {
    return (
<>
<div className="container">

<div style={{display:'flex',justifyContent:'center',width:1120,height:270,gap:30,marginTop:120}}>
    <div style={{width:250}}>
    <Image
                        src={icon}
                        width={50}
                        marginRight={10}
                    />
                    <h3 style={{marginLeft:60,marginTop:-35,marginBottom:50}}>Ankasa</h3>
                    <p style={{fontSize:13}}>Find your Flight and explore the</p>
                    <p style={{fontSize:13}}>world with us. We will take care of the rest</p>
                    <p style={{marginTop:80,fontSize:13}}>© Ankasa.  All Rights Reserved.</p>
    </div>
    <div style={{width:200,paddingLeft:80}}>
        <h5 style={{marginBottom:55}}>Features</h5>
        <a>Find Ticket</a><br/>
        <a>My booking</a><br/>
        <a>Chat</a><br/>
        <a>Notification</a><br/>
        
        </div>
    <div style={{width:230}}>
        <h4 style={{fontSize:20}}>Download Angkasa app</h4>
        <div style={{marginLeft:40,marginTop:60}}>

        <Image
                        src={apel}
                        width={150}
                        
                    />
                    <div style={{margin:20}}></div>
                    <Image
                        src={gugel}
                        width={150}
                        
                    />
        </div>
        
        </div>
    <div style={{width:200}}>
        <h4 style={{marginBottom:40,marginLeft:30}}>Follow Us</h4>
        <div style={{display:'flex',justifyContent:'center',gap:20}}>

        <div>

        <Image
                        src={fb}
                        width={15}
                    />
        </div>
        <div>

                    <Image
                        src={twit}
                        width={20}
                        
                    />
        </div>
        <div>

                    <Image
                        src={ig}
                        width={20}
                        
                    />
        </div>
        <div>

                    <Image
                        src={yt}
                        width={20}
                        
                    />
        </div>
        </div>
        </div>
</div>
</div>
</>
    );
  }