'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkForm({ user, setBookmarks }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBookmark = async () => {
    if (!title || !url) return
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ title, url, user_id: user.id }])
      .select()
      .single()

    if (error) {
      console.log('Insert Error:', error.message)
      return
    }
    if (data) {
      setBookmarks((prev: any[]) => [data, ...prev])
    }
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');

        .bookmark-form-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #fdfcf8;
          border: 1.5px solid #e8e2d6;
          border-radius: 16px;
          padding: 28px 32px;
          max-width: 540px;
          box-shadow: 0 2px 24px rgba(60, 45, 20, 0.07);
        }

        .bookmark-form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          color: #2b2218;
          margin: 0 0 20px 0;
          letter-spacing: -0.01em;
        }

        .bookmark-form-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bookmark-input {
          width: 100%;
          padding: 11px 15px;
          border: 1.5px solid #ddd6c8;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          color: #2b2218;
          background: #ffffff;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
          box-sizing: border-box;
        }

        .bookmark-input::placeholder {
          color: #b5a898;
        }

        .bookmark-input:focus {
          border-color: #c47b3a;
          box-shadow: 0 0 0 3px rgba(196, 123, 58, 0.1);
        }

        .bookmark-btn {
          margin-top: 4px;
          padding: 11px 28px;
          background: #2b2218;
          color: #fdfcf8;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.18s ease, transform 0.1s ease;
          align-self: flex-start;
        }

        .bookmark-btn:hover {
          background: #c47b3a;
          transform: translateY(-1px);
        }

        .bookmark-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="bookmark-form-wrapper">
        <h2 className="bookmark-form-title">Add Bookmark</h2>
        <div className="bookmark-forms-fields" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bookmark-input"
          />
          <input
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bookmark-input"
          />
          <button onClick={addBookmark} className="bookmark-btn">
            Add
          </button>
        </div>
      </div>
    </>
  )
}