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
            <a
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bookmark-link"
            >
              {bm.title}
            </a>

            <button
              onClick={() => deleteBookmark(bm.id)}
              className="bookmark-delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}