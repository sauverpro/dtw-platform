type EventCardProps = {
    title: string;
    image: string;
  };
  
  function EventCard({ title, image }: EventCardProps) {
    return (
      <div className="bg-[#111827] rounded-3xl overflow-hidden shadow-lg">
  
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover"
        />
  
        {/* CONTENT */}
        <div className="p-6">
  
          <p className="text-yellow-400 uppercase text-sm">
            May 2026
          </p>
  
          <h2 className="text-white text-3xl font-bold mt-3">
            {title}
          </h2>
  
          <p className="text-gray-400 mt-4">
            Join innovators and technology leaders in Kigali.
          </p>
  
          <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-full">
            Register
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default EventCard;