'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList({ bookmarks, setBookmarks, user }: any) {

  // 🔥 Edit States
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')

  // 🔥 Fetch Bookmarks
  const fetchBookmarks = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }
  }

  // 🔥 Real-time Subscription
  useEffect(() => {
    if (!user) return

    fetchBookmarks()

    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  // 🔥 Delete Bookmark
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

  // 🔥 Update Bookmark
  const updateBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .update({
        title: editTitle,
        url: editUrl
      })
      .eq('id', id)

    if (!error) {
      setBookmarks((prev: any[]) =>
        prev.map((bm) =>
          bm.id === id
            ? { ...bm, title: editTitle, url: editUrl }
            : bm
        )
      )

      setEditingId(null)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');

        .bookmark-list-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #fdfcf8;
          border: 1.5px solid #e8e2d6;
          border-radius: 16px;
          padding: 28px 32px;
          max-width: 540px;
          box-shadow: 0 2px 24px rgba(60, 45, 20, 0.07);
        }

        .bookmark-list-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          color: #2b2218;
          margin: 0 0 20px 0;
          letter-spacing: -0.01em;
        }

        .bookmark-empty {
          color: #b5a898;
          font-size: 0.92rem;
          text-align: center;
          padding: 24px 0;
        }

        .bookmark-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          margin-bottom: 10px;
          background: #ffffff;
          border: 1.5px solid #e8e2d6;
          border-radius: 10px;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .bookmark-item:last-child {
          margin-bottom: 0;
        }

        .bookmark-item:hover {
          border-color: #c47b3a;
          box-shadow: 0 2px 12px rgba(196, 123, 58, 0.08);
        }

        .bookmark-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: #2b2218;
          text-decoration: none;
          border-bottom: 1.5px solid #c47b3a;
          padding-bottom: 1px;
          transition: color 0.15s ease;
          max-width: 75%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bookmark-link:hover {
          color: #c47b3a;
        }

        .bookmark-delete-btn {
          background: none;
          border: 1.5px solid #e8e2d6;
          color: #b5a898;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .bookmark-delete-btn:hover {
          background: #fff0eb;
          border-color: #e07b50;
          color: #c0441a;
        }
      `}</style>

      <div className="bookmark-list-wrapper">
        <h2 className="bookmark-list-title">Bookmarks</h2>

        {bookmarks.length === 0 && (
          <p className="bookmark-empty">No bookmarks yet.</p>
        )}

        {bookmarks.map((bm: any) => (
          <div key={bm.id} className="bookmark-item">

            {editingId === bm.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginRight: '8px' }}
                />

                <input
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  style={{ marginRight: '8px' }}
                />

                <button
                  onClick={() => updateBookmark(bm.id)}
                  className="bookmark-delete-btn"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <a
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bookmark-link"
                >
                  {bm.title}
                </a>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => {
                      setEditingId(bm.id)
                      setEditTitle(bm.title)
                      setEditUrl(bm.url)
                    }}
                    className="bookmark-delete-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBookmark(bm.id)}
                    className="bookmark-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
    </>
  )
}
