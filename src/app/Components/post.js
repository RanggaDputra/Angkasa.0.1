import Image from 'next/image';
import icon from '../Assets/image4.png'
import iconn from '../Assets/image44.png'
import icon6 from '../Assets/vector6.png'
import mask from '../Assets/MaskGroup.png'
import mask2 from '../Assets/MaskGroup2.png'
import over from '../Assets/overlay.png'
import out from '../Assets/outline.png'
import paris from '../Assets/paris.png'
import bali from '../Assets/bali.png'
import mahal from '../Assets/mahal.png'
import singa from '../Assets/singapura.png'
import syd from '../Assets/sydney.png'
import styles from '../style/post.module.css'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft ,faChevronRight} from '@fortawesome/free-solid-svg-icons'


export default function Post() {
    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h2 style={{ marginTop: 50 }}>Find Your <span style={{ color: 'blue' }}>Flight</span></h2><br />
                        <p>and explore the world with us</p>

                    </div>
                    <div style={{ marginLeft: 500 }}>
                        <Image
                            src={icon}
                            width={300}
                        // marginRight={10}
                        />
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: 140 }}>

                        <Image
                            src={iconn}
                            width={700}
                        // marginRight={10}
                        />
                    </div>
                    <div style={{ marginRight: 100, marginTop: 100 }}>

                        <Image
                            backgroundColor={'red'}
                            src={icon6}
                            width={200}
                        />
                    </div>
                </div>
                <div>
                    <br />
                    <p>T R E N D I N G</p>
                    <h2>Trending destinations</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>

                    <div style={{ width: 150 }}>
                        <Image

                            src={mask}
                            width={150}
                        />
                        <div style={{ color: 'black', marginTop: -190 }}>
                            <Image

                                src={over}
                                width={150}
                            />
                            <h4 style={{ marginTop: -70, color: 'white' }}>Tokyo,<br />Japan<span>~</span></h4>
                        </div>
                    </div>
                    <div style={{ width: 150 }}><Image
                        backgroundColor={'black'}
                        src={mask2}
                        width={150}
                    />
                        <div style={{ color: 'black', marginTop: -190 }}>
                            <Image

                                src={over}
                                width={150}
                            />
                            <h4 style={{ marginTop: -70, color: 'white' }}>Barcelona,<br />Spain<span>~</span></h4></div>

                    </div>
                    <div style={{ width: 150 }}><Image
                        src={mask}
                        width={150}
                    />
                        <div style={{ color: 'black', marginTop: -190 }}>
                            <Image

                                src={over}
                                width={150}
                            />
                            <h4 style={{ marginTop: -70, color: 'white' }}>Tokyo,<br />Japan<span>~</span></h4></div>
                    </div>
                    <div style={{ width: 150 }}><Image
                        backgroundColor={'black'}
                        src={mask2}
                        width={150}
                    />
                        <div style={{ color: 'black', marginTop: -190 }}>
                            <Image

                                src={over}
                                width={150}
                            />
                            <h4 style={{ marginTop: -70, color: 'white' }}>Barcelona,<br />Spain<span>~</span></h4></div>
                    </div>
                    <div style={{ width: 150 }}><Image
                        src={mask}
                        width={150}
                    />
                        <div style={{ color: 'black', marginTop: -190 }}>
                            <Image

                                src={over}
                                width={150}
                            />
                            <h4 style={{ marginTop: -70, color: 'white' }}>Tokyo,<br />Japan<span>~</span></h4></div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#2395FF', width: 800, height: 400, marginLeft: 'auto', marginRight: 'auto', marginTop: 50, borderRadius: 40 }}>
                    <h4 style={{ textAlign: 'center', paddingTop: 30, color: 'white' }}>T O P 1 0</h4>
                    <h4 style={{ textAlign: 'center', color: 'white' }}>Top 10 Destination</h4>
                    <div style={{ display: 'flex', justifyContent: 'center',gap:20}}>
                        <div style={{width: 100, height: 100 }}>
                            <div>
                                <Image
                                    
                                    src={out}
                                    width={100}
                                />
                                <div style={{marginTop:-90,marginLeft:10}}>
                                    <Image
                                        
                                        src={paris}
                                        width={80}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign:'center',marginTop:30,color:'white',fontSize:18}}>Paris</h3>
                        </div>
                        <div style={{ width: 100 }}>
                        <div>
                                <Image
                                    
                                    src={out}
                                    width={100}
                                />
                                <div style={{marginTop:-90,marginLeft:10}}>
                                    <Image
                                        
                                        src={bali}
                                        width={80}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign:'center',marginTop:30,color:'white',fontSize:18}}>Paris</h3>
                        </div>
                        <div style={{ width: 100 }}>
                        <div>
                                <Image
                                    
                                    src={out}
                                    width={100}
                                />
                                <div style={{marginTop:-90,marginLeft:10}}>
                                    <Image
                                        
                                        src={singa}
                                        width={80}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign:'center',marginTop:30,color:'white',fontSize:18}}>Paris</h3>
                        </div>
                        <div style={{ width: 100 }}>
                        <div>
                                <Image
                                    
                                    src={out}
                                    width={100}
                                />
                                <div style={{marginTop:-90,marginLeft:10}}>
                                    <Image
                                        
                                        src={mahal}
                                        width={80}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign:'center',marginTop:30,color:'white',fontSize:18}}>Paris</h3>
                        </div>
                        <div style={{ width: 100 }}>
                        <div>
                                <Image
                                    
                                    src={out}
                                    width={100}
                                />
                                <div style={{marginTop:-90,marginLeft:10}}>
                                    <Image
                                        
                                        src={syd}
                                        width={80}
                                    />
                                </div>
                            </div>
                            <h3 style={{textAlign:'center',marginTop:30,color:'white',fontSize:18}}>Paris</h3>
                        </div>


                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:40,gap:55}}>
                    <div className={styles['input-post']}><FontAwesomeIcon icon={faChevronLeft} style={{color:'white',width:20,marginLeft:'18',marginTop:'15'}}/></div>
                    <div className={styles['input-poster']}><FontAwesomeIcon icon={faChevronRight} style={{color:'#2395FF',width:20,marginLeft:'18',marginTop:'15'}}/></div>
                </div>
                </div>
                

            </div>


        </>

    );
}
