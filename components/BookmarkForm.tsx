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
    <div className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2 rounded"
      />

      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 mr-2 rounded"
      />

      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  )
}
