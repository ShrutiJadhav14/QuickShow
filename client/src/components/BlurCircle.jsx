
const BlurCircle = ({top="auto",left="auto",bottom="auto",right="auto"}) => {
  return (
    <div className="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-red-500/30 blur-3xl" 
    style={{top:top,left:left,bottom:bottom,right:right}}>
      
    </div>
  )
}

export default BlurCircle
