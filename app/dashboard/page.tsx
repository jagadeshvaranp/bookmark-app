'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default function Dashboard() {
  const [session, setSession] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/')
      } else {
        setSession(data.session)
        fetchBookmarks(data.session.user.id)
      }

      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id, title, url, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!session) return null

  return (
    <div className="p-6">
      <BookmarkForm user={session.user} setBookmarks={setBookmarks} />
      <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </div>
  )
}
