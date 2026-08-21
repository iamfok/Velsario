'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Upload,
  Search,
  Image as ImageIcon,
  Video,
  Trash2,
  Copy,
  X,
  Maximize2,
  FileImage,
  Loader2,
} from 'lucide-react'

type MediaItem = {
  id: string
  name: string
  url: string
  type: 'Image' | 'Video'
  size: number
  width?: number
  height?: number
  createdAt: string
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const MAX_VIDEO_SIZE = 50 * 1024 * 1024

const initialMedia: MediaItem[] = []

export default function MediaPage() {
  const [media, setMedia] =
    useState<MediaItem[]>(initialMedia)

  const [search, setSearch] =
    useState('')

  const [showUpload, setShowUpload] =
    useState(false)

  const [dragActive, setDragActive] =
    useState(false)

  const [processing, setProcessing] =
    useState(false)

  const [processingText, setProcessingText] =
    useState('')

  const [preview, setPreview] =
    useState<MediaItem | null>(null)

  const fileInputRef =
    useRef<HTMLInputElement>(null)


  /* LOAD MEDIA */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          'velsario-media'
        )

      if (saved) {
        setMedia(JSON.parse(saved))
      }
    } catch {
      setMedia([])
    }
  }, [])


  /* SAVE MEDIA */

  const saveMedia = (
    items: MediaItem[]
  ) => {
    setMedia(items)

    try {
      localStorage.setItem(
        'velsario-media',
        JSON.stringify(items)
      )
    } catch {
      /*
       * LocalStorage may become full when
       * large media files are uploaded.
       */
      alert(
        'Storage limit reached. Cloudflare storage will be connected later.'
      )
    }
  }


  /* IMAGE PROCESSING */

  const processImage = (
    file: File
  ): Promise<{
    url: string
    size: number
    width: number
    height: number
  }> => {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader()

        reader.onload = () => {

          const image =
            new Image()

          image.onload = () => {

            const maxDimension = 2400

            let width =
              image.width

            let height =
              image.height

            if (
              width > maxDimension ||
              height > maxDimension
            ) {

              const ratio =
                Math.min(
                  maxDimension / width,
                  maxDimension / height
                )

              width =
                Math.round(
                  width * ratio
                )

              height =
                Math.round(
                  height * ratio
                )

            }

            const canvas =
              document.createElement(
                'canvas'
              )

            canvas.width = width
            canvas.height = height

            const ctx =
              canvas.getContext('2d')

            if (!ctx) {
              reject(
                new Error(
                  'Canvas not supported'
                )
              )

              return
            }

            ctx.drawImage(
              image,
              0,
              0,
              width,
              height
            )

            const quality =
              file.size > 5 * 1024 * 1024
                ? 0.70
                : 0.82

            const outputType =
              file.type === 'image/png'
                ? 'image/png'
                : 'image/jpeg'

            const url =
              canvas.toDataURL(
                outputType,
                quality
              )

            const size =
              Math.round(
                (url.length * 3) / 4
              )

            resolve({
              url,
              size,
              width,
              height,
            })

          }

          image.onerror = () =>
            reject(
              new Error(
                'Unable to read image'
              )
            )

          image.src =
            reader.result as string

        }

        reader.onerror = () =>
          reject(
            new Error(
              'Unable to read file'
            )
          )

        reader.readAsDataURL(file)

      }
    )
  }


  /* VIDEO PROCESSING */

  const processVideo = (
    file: File
  ): Promise<{
    url: string
    size: number
  }> => {

    return new Promise(
      (resolve, reject) => {

        /*
         * Browser-safe approach:
         * create a local object URL.
         *
         * Actual video compression will be
         * moved to Cloudflare/server processing
         * later because reliable browser-side
         * video transcoding needs additional
         * processing.
         */

        try {

          const url =
            URL.createObjectURL(file)

          resolve({
            url,
            size: file.size,
          })

        } catch {

          reject(
            new Error(
              'Unable to process video'
            )
          )

        }

      }
    )
  }


  /* HANDLE FILES */

  const handleFiles = async (
    files: FileList | File[]
  ) => {

    const selectedFiles =
      Array.from(files)

    if (
      selectedFiles.length === 0
    ) {
      return
    }

    setProcessing(true)

    const newItems: MediaItem[] = []

    try {

      for (
        let index = 0;
        index < selectedFiles.length;
        index++
      ) {

        const file =
          selectedFiles[index]

        setProcessingText(
          `Processing ${index + 1} of ${selectedFiles.length}: ${file.name}`
        )


        /* IMAGE */

        if (
          file.type.startsWith(
            'image/'
          )
        ) {

          if (
            file.size >
            MAX_IMAGE_SIZE
          ) {

            setProcessingText(
              `Optimizing image: ${file.name}`
            )

          }

          const processed =
            await processImage(
              file
            )

          newItems.push({
            id:
              `MED-${Date.now()}-${index}`,
            name:
              file.name.replace(
                /\.[^/.]+$/,
                ''
              ),
            url:
              processed.url,
            type:
              'Image',
            size:
              processed.size,
            width:
              processed.width,
            height:
              processed.height,
            createdAt:
              new Date().toISOString(),
          })

        }


        /* VIDEO */

        else if (
          file.type.startsWith(
            'video/'
          )
        ) {

          if (
            file.size >
            MAX_VIDEO_SIZE
          ) {

            setProcessingText(
              `Preparing large video: ${file.name}`
            )

          }

          const processed =
            await processVideo(
              file
            )

          newItems.push({
            id:
              `MED-${Date.now()}-${index}`,
            name:
              file.name.replace(
                /\.[^/.]+$/,
                ''
              ),
            url:
              processed.url,
            type:
              'Video',
            size:
              processed.size,
            createdAt:
              new Date().toISOString(),
          })

        }


        else {

          alert(
            `${file.name} is not a supported image or video file.`
          )

        }

      }

      if (
        newItems.length > 0
      ) {

        saveMedia([
          ...newItems,
          ...media,
        ])

      }

    } catch (error) {

      console.error(error)

      alert(
        'Unable to process the selected media.'
      )

    } finally {

      setProcessing(false)
      setProcessingText('')

      if (fileInputRef.current) {
        fileInputRef.current.value =
          ''
      }

    }

  }


  /* FILE INPUT */

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (event.target.files) {

      handleFiles(
        event.target.files
      )

    }

  }


  /* DRAG & DROP */

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault()

    setDragActive(false)

    if (
      event.dataTransfer.files
    ) {

      handleFiles(
        event.dataTransfer.files
      )

    }

  }


  /* DELETE */

  const deleteMedia = (
    id: string
  ) => {

    if (
      !confirm(
        'Delete this media?'
      )
    ) {
      return
    }

    const updated =
      media.filter(
        item => item.id !== id
      )

    saveMedia(updated)

  }


  /* COPY URL */

  const copyUrl = async (
    value: string
  ) => {

    if (!value) return

    try {

      await navigator.clipboard.writeText(
        value
      )

      alert(
        'Media URL copied'
      )

    } catch {

      alert(
        'Unable to copy URL'
      )

    }

  }


  /* FORMAT SIZE */

  const formatSize = (
    bytes: number
  ) => {

    if (!bytes) {
      return '0 KB'
    }

    if (
      bytes <
      1024 * 1024
    ) {

      return `${(
        bytes / 1024
      ).toFixed(0)} KB`

    }

    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`

  }


  /* FILTER */

  const filtered =
    media.filter(
      item =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    )


  return (

    <div>

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>

          <h1 className="text-2xl font-medium">
            Media Library
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Upload and manage images and videos used across your store.
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            setShowUpload(
              !showUpload
            )
          }
          className="btn-primary flex items-center justify-center gap-2"
        >

          <Upload size={14} />

          Upload Media

        </button>

      </div>


      {/* UPLOAD AREA */}

      {showUpload && (

        <div className="bg-white border border-v-border p-6 mb-6">

          <div
            onDragOver={event => {
              event.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() =>
              setDragActive(false)
            }
            onDrop={handleDrop}
            className={`border-2 border-dashed p-8 md:p-12 text-center transition-colors ${
              dragActive
                ? 'border-black bg-gray-50'
                : 'border-v-border'
            }`}
          >

            {processing ? (

              <div className="flex flex-col items-center">

                <Loader2
                  size={28}
                  className="animate-spin mb-4"
                />

                <p className="text-sm font-medium">
                  Processing media...
                </p>

                <p className="text-xs text-v-gray mt-2">
                  {processingText}
                </p>

              </div>

            ) : (

              <>

                <div className="w-12 h-12 bg-gray-100 mx-auto flex items-center justify-center mb-4">

                  <Upload
                    size={21}
                    className="text-gray-500"
                  />

                </div>


                <p className="text-sm font-medium">
                  Drop your files here
                </p>

                <p className="text-xs text-v-gray mt-2">
                  or select files from your computer
                </p>


                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-5 bg-v-black text-white px-6 py-3 text-xs tracking-wider"
                >
                  Select Files
                </button>


                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                />


                <div className="mt-6 text-[11px] text-gray-400 space-y-1">

                  <p>
                    Images up to 10 MB
                  </p>

                  <p>
                    Videos up to 50 MB
                  </p>

                  <p>
                    Large images are automatically resized and compressed.
                  </p>

                  <p>
                    Large video processing will be handled by Cloudflare later.
                  </p>

                </div>

              </>

            )}

          </div>

        </div>

      )}


      {/* SEARCH */}

      <div className="bg-white border border-v-border p-4 mb-6">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />

          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={event =>
              setSearch(
                event.target.value
              )
            }
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>


      {/* MEDIA COUNT */}

      <div className="flex items-center justify-between mb-4">

        <p className="text-xs text-v-gray">
          {filtered.length} media file
          {filtered.length !== 1
            ? 's'
            : ''}
        </p>

        <p className="text-xs text-gray-400">
          Images & Videos
        </p>

      </div>


      {/* MEDIA GRID */}

      {filtered.length > 0 ? (

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

          {filtered.map(item => (

            <div
              key={item.id}
              className="bg-white border border-v-border overflow-hidden group"
            >

              {/* PREVIEW */}

              <button
                type="button"
                onClick={() =>
                  setPreview(item)
                }
                className="relative w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden"
              >

                {item.type === 'Image' ? (

                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <video
                    src={item.url}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                )}


                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">

                  <Maximize2
                    size={20}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                </div>


                <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1">
                  {item.type}
                </span>

              </button>


              {/* INFO */}

              <div className="p-4">

                <p className="text-sm font-medium truncate">
                  {item.name}
                </p>

                <div className="flex items-center gap-2 mt-1">

                  <p className="text-xs text-v-gray">
                    {formatSize(
                      item.size
                    )}
                  </p>

                  {item.width &&
                    item.height && (
                      <>
                        <span className="text-gray-300">
                          •
                        </span>

                        <p className="text-xs text-v-gray">
                          {item.width} ×{' '}
                          {item.height}
                        </p>
                      </>
                    )}

                </div>


                <div className="flex items-center justify-between mt-4">

                  <button
                    type="button"
                    onClick={() =>
                      copyUrl(
                        item.url
                      )
                    }
                    className="p-2 text-v-gray hover:text-v-black"
                    title="Copy URL"
                  >

                    <Copy size={14} />

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setPreview(item)
                    }
                    className="p-2 text-v-gray hover:text-v-black"
                    title="Preview"
                  >

                    <Maximize2
                      size={14}
                    />

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      deleteMedia(
                        item.id
                      )
                    }
                    className="p-2 text-v-gray hover:text-red-500"
                    title="Delete"
                  >

                    <Trash2
                      size={14}
                    />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white border border-v-border p-16 text-center">

          <FileImage
            size={30}
            className="mx-auto mb-3 text-gray-400"
          />

          <p className="text-sm text-v-gray">
            No media found.
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Upload images or videos to get started.
          </p>

        </div>

      )}


      {/* PREVIEW MODAL */}

      {preview && (

        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() =>
            setPreview(null)
          }
        >

          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={event =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              onClick={() =>
                setPreview(null)
              }
              className="absolute -top-12 right-0 w-10 h-10 bg-white text-black flex items-center justify-center"
            >

              <X size={18} />

            </button>


            {preview.type === 'Image' ? (

              <img
                src={preview.url}
                alt={preview.name}
                className="max-w-full max-h-[80vh] object-contain"
              />

            ) : (

              <video
                src={preview.url}
                controls
                autoPlay
                className="max-w-full max-h-[80vh]"
              />

            )}

          </div>

        </div>

      )}

    </div>

  )
}
