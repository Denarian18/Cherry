
      
      const Hero = ( {text, backdrop}) => {
            return (
                <div className="bg-dark text-white p-5 hero-container"  style={backdrop ? { backgroundImage: `url(${backdrop})` } : {}}>
                     <h1 className='hero-text'>{text}</h1>
                     
                     
                </div>
               
            )
        }

    export default Hero;