import { CardServiceProps } from '../types/types'
const CardService: React.FC<CardServiceProps> = ({ description, image }) => {
  const handleMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    ;(e.target as HTMLImageElement).style.transform = 'scale(1.05)'
  }

  const handleMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    ;(e.target as HTMLImageElement).style.transform = 'scale(1)'
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        width: '25rem',
        height: '30rem',
        margin: '10px',
        position: 'relative',
      }}>
      <img
        src={image}
        className="card-img-top h-auto"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ transition: 'transform 0.2s' }}
        alt="Card image"
      />
      <div
        className="p-2 bg-black text-left text-white position-absolute bottom-0 w-100"
        style={{ maxHeight: '70px', minHeight: '70px' }}>
        <p
          className="text-center nunito-sans-regular"
          style={{ fontSize: '18px' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default CardService
