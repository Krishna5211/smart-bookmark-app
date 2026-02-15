"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [bookmarks, setBookmarks] = useState<any[]>([])

  // 🔹 Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 🔹 Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }
  }

  // 🔹 Realtime subscription
  useEffect(() => {
    if (!user) return

    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
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

  // 🔹 Add bookmark
  const addBookmark = async () => {
    if (!title || !url) return

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle("")
    setUrl("")
  }

  // 🔹 Delete bookmark
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  // 🔹 Login
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  // 🔹 Logout
  const logout = async () => {
    await supabase.auth.signOut()
  }

  // 🔹 Not logged in screen
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl">Smart Bookmark App</h1>
        <button
          onClick={signIn}
          className="bg-blue-500 px-6 py-3 rounded text-lg"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  // 🔹 Logged in screen
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-6">Smart Bookmark App</h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded mb-6"
      >
        Logout
      </button>

      {/* Add Bookmark */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-500 bg-gray-900 text-white p-3 w-1/3 rounded"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-500 bg-gray-900 text-white p-3 w-1/3 rounded"
        />
        <button
          onClick={addBookmark}
          className="bg-blue-500 px-6 py-3 rounded"
        >
          Add
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {bookmark.title}
              </h2>
              <a
                href={bookmark.url}
                target="_blank"
                className="text-blue-400"
              >
                {bookmark.url}
              </a>
            </div>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
