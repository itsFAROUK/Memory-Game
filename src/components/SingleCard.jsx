import cover from '../assets/cover.png'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) handleChoice(card)
  }
  
  const imgStyle = "block w-full border-2 rounded-[6px]"
  return (
    <li className={`relative`}>
      <button aria-label="card">
        <img 
          src={card.src} 
          alt="card front" 
          className={`${imgStyle} absolute transition-all duration-200 ease-in ${flipped ? "rotate-y-0 delay-200" : "rotate-y-90"}`} />
        <img 
          src={cover} 
          alt="card back" 
          className={`${imgStyle} transition-all duration-200 ease-in ${flipped ? "rotate-y-90 delay-0" : "delay-200"}`}       
          onClick={handleClick}/>
      </button>
    </li>
  )
}

export default SingleCard