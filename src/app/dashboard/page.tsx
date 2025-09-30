import Link from "next/link";

export default function Dashboard() {
  return (
    <main className=" mt-16  flex items-center justify-center px-4">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-800 mb-20">
          Rivage Cottage Resort Nathia Gali
        </h1>
        <h2 className="text-3xl underline font-extrabold tracking-widest text-gray-800 mb-8">
          Admin Dashboard
        </h2>

        {/* Button Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/addroom"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Hotel➕
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Create a new hotel entry.
            </p>
          </Link>

          <Link
            href="/addheroimage"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Homepage Image📷
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Upload hero images for the home page.
            </p>
          </Link>

          <Link
            href="/crudrooms"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Edit/Delete Rooms🏨
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Manage and edit all listed rooms.
            </p>
          </Link>
          <Link
            href="/allcontactusers"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              All Contacts👥
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              ArcadianResort all listed Contacts.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
