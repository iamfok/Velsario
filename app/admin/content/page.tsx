'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, ExternalLink, CheckCircle, Clock } from 'lucide-react'

const SHEET_API = 'https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec'

export default function AdminContentPage() {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchContent = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${SHEET_API}?action=getAllContent`)
      const data = await res.json()
      setContent(data.items || [])
    } catch (e) {
      setContent([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContent() }, [])

  const approveContent = async (row: number) => {
    await fetch(`${SHEET_API}?action=approveContent&row=${row}`)
    fetchContent()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">Social Media</p>
          <h1 className="text-2xl font-medium">Content Approval</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchContent} className="flex items-center gap-2 text-xs tracking-wider uppercase border border-v-border px-4 py-2 hover:bg-v-light transition-colors">
            <RefreshCw size={14} /> Refresh
          </button>
          <a href="https://docs.google.com/spreadsheets/d/1sdNaV27bRID-L9e999uffWOgzA4Z8xJEzB4VYBZFZxs"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-wider uppercase btn-primary">
            <ExternalLink size={14} /> Open Sheet
          </a>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 mb-6 text-sm text-blue-700">
        <strong>How it works:</strong> Content is generated weekly. Set Status to "Approved" in Google Sheets, or click Approve below. Approved content posts automatically at 11 AM daily.
      </div>

      {loading ? (
        <div className="text-center py-20 text-v-gray text-sm">Loading content...</div>
      ) : content.length === 0 ? (
        <div className="bg-white border border-v-border p-12 text-center">
          <p className="text-v-gray mb-4 text-sm">No content yet. Content is generated every Thursday.</p>
          <p className="text-xs text-v-gray">You can also add content manually in Google Sheets → Content tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, i) => (
            <div key={i} className="bg-white border border-v-border overflow-hidden">
              {item.imageUrl && (
                <div className="aspect-square bg-v-light">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-wider uppercase text-v-gray">{item.platform}</span>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 ${
                    item.status === 'Approved' ? 'bg-green-50 text-green-600' :
                    item.status === 'Posted' ? 'bg-blue-50 text-blue-600' :
                    'bg-yellow-50 text-yellow-600'
                  }`}>
                    {item.status === 'Approved' ? <CheckCircle size={10} /> : <Clock size={10} />}
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-v-gray font-light line-clamp-3 mb-4">{item.caption}</p>
                {item.status === 'Pending' && (
                  <button
                    onClick={() => approveContent(item.row)}
                    className="w-full btn-primary text-xs py-2"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
