import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title }) => {

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list">
                {cards_data.map((card, index) => {
                    return <div className="card" key={index}>
                        <img src={card.image} alt="" />
                        <p>{card.name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TitleCards