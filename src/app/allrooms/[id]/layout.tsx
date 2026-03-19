// app/allrooms/[id]/layout.tsx

import { Metadata } from "next"

const Base_Url_API = "https://69bbbc634f9a1a6001986497--astonishing-medovik-a8ea1e.netlify.app/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const { id } = await params  // ← await it

    const res = await fetch(`${Base_Url_API}/v2/rooms/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error()

    const hotel = await res.json()
    const firstImage = hotel?.imageUrls?.[0] ?? ""

    return {
      title: hotel.name,
      description: hotel.description,
      openGraph: {
        title: hotel.name,
        description: hotel.description,
        images: firstImage
          ? [{ url: firstImage, width: 1200, height: 627 }]
          : [],
      },
    }
  } catch {
    return {
      title: "Hotel",
      description: "View hotel details",
    }
  }
}

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}