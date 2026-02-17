'use client'

import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList({ bookmarks, setBookmarks }: any) {

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (!error) {
      setBookmarks((prev: any[]) =>
        prev.filter((bm) => bm.id !== id)
      )
    }
  }

  return (
    <div>
      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}

      {bookmarks.map((bm: any) => (
        <div
          key={bm.id}
          className="flex justify-between items-center border p-2 mb-2 rounded"
        >
          <a
            href={bm.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {bm.title}
          </a>

          <button
            onClick={() => deleteBookmark(bm.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
