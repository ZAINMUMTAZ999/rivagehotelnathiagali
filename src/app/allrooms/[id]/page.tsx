import MyHotelsById from "./roomid";
import { getHotelApiBId } from "../../Api";
export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = await getHotelApiBId(params.id);

  if (!room) return { title: "Room Not Found", description: "" };

  return {
    title: `${room.name} – Rivage Cottage NathiaGali`,
    description: room.description.slice(0, 160),
    keywords: ["Rivage Cottage NathiaGali", room.name, "hotel booking"],
    openGraph: {
      title: room.name,
      description: room.description.slice(0, 160),
      images: room.imageUrls.length ? [{ url: room.imageUrls[0] }] : [],
    },
  };
}

export default function Page({ params }: { params: { id: string } }){
    return(
        <MyHotelsById id={params.id}/>
    )
}