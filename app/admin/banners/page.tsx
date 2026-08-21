'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  Eye,
  X,
  Upload,
  Copy,
  Loader2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

type Banner = {
  id: string
  title: string
  description: string
  type: 'Image' | 'Video'
  desktopImage: string
  mobileImage: string
  video: string
  position: string
  sizePreset: string
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
  buttonText: string
  buttonLink: string
  startDate: string
  endDate: string
  status: 'Active' | 'Inactive'
  order: number
  createdAt: string
}

const bannerPresets = {
  'Homepage Hero': {
    desktopWidth: 1920,
    desktopHeight: 800,
    mobileWidth: 1080,
    mobileHeight: 1350,
  },
  'Homepage Secondary': {
    desktopWidth: 1600,
    desktopHeight: 700,
    mobileWidth: 1080,
    mobileHeight: 1080,
  },
  'Shop Banner': {
    desktopWidth: 1920,
    desktopHeight: 600,
    mobileWidth: 1080,
    mobileHeight: 700,
  },
  'Category Banner': {
    desktopWidth: 1600,
    desktopHeight: 600,
    mobileWidth: 1080,
    mobileHeight: 700,
  },
  'Promotional Banner': {
    desktopWidth: 1600,
    desktopHeight: 900,
    mobileWidth: 1080,
    mobileHeight: 1080,
  },
}

const emptyBanner: Omit<
  Banner,
  'id' | 'createdAt' | 'order'
> = {
  title: '',
  description: '',
  type: 'Image',
  desktopImage: '',
  mobileImage: '',
  video: '',
  position: 'Homepage Hero',
  sizePreset: 'Homepage Hero',
  desktopWidth: 1920,
  desktopHeight: 800,
  mobileWidth: 1080,
  mobileHeight: 1350,
  buttonText: '',
  buttonLink: '',
  startDate: '',
  endDate: '',
  status: 'Active',
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [preview, setPreview] = useState<Banner | null>(null)

  const [form, setForm] = useState(emptyBanner)

  const [processing, setProcessing] = useState(false)
  const [processingText, setProcessingText] = useState('')

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  /* LOAD */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        'velsario-banners'
      )

      if (saved) {
        setBanners(JSON.parse(saved))
      }
    } catch {
      setBanners([])
    }
  }, [])

  /* SAVE */

  const saveBanners = (items: Banner[]) => {
    setBanners(items)

    try {
      localStorage.setItem(
        'velsario-banners',
        JSON.stringify(items)
      )
    } catch {
      alert(
        'Storage limit reached. Cloudflare storage will be connected later.'
      )
    }
  }

  /* IMAGE PROCESSOR */

  const processImage = (
    file: File,
    targetWidth: number,
    targetHeight: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()

        image.onload = () => {
          const canvas = document.createElement('canvas')

          /*
           * Keep the banner aspect ratio.
           * Do not stretch the image.
           */
          const targetRatio =
            targetWidth / targetHeight

          const sourceRatio =
            image.width / image.height

          let cropWidth = image.width
          let cropHeight = image.height
          let cropX = 0
          let cropY = 0

          if (sourceRatio > targetRatio) {
            cropWidth =
              image.height * targetRatio

            cropX =
              (image.width - cropWidth) / 2
          } else {
            cropHeight =
              image.width / targetRatio

            cropY =
              (image.height - cropHeight) / 2
          }

          canvas.width = targetWidth
          canvas.height = targetHeight

          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(
              new Error('Canvas unavailable')
            )
            return
          }

          ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            targetWidth,
            targetHeight
          )

          const output =
            file.type === 'image/png'
              ? 'image/png'
              : 'image/jpeg'

          const quality =
            file.size > 5 * 1024 * 1024
              ? 0.70
              : 0.82

          resolve(
            canvas.toDataURL(
              output,
              quality
            )
          )
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
    })
  }

  /* DESKTOP IMAGE */

  const handleDesktopImage = async (
    file: File
  ) => {
    setProcessing(true)

    try {
      setProcessingText(
        'Optimizing desktop banner...'
      )

      const image = await processImage(
        file,
        form.desktopWidth,
        form.desktopHeight
      )

      setForm(prev => ({
        ...prev,
        desktopImage: image,
      }))
    } catch {
      alert(
        'Unable to process desktop image.'
      )
    } finally {
      setProcessing(false)
      setProcessingText('')
    }
  }

  /* MOBILE IMAGE */

  const handleMobileImage = async (
    file: File
  ) => {
    setProcessing(true)

    try {
      setProcessingText(
        'Optimizing mobile banner...'
      )

      const image = await processImage(
        file,
        form.mobileWidth,
        form.mobileHeight
      )

      setForm(prev => ({
        ...prev,
        mobileImage: image,
      }))
    } catch {
      alert(
        'Unable to process mobile image.'
      )
    } finally {
      setProcessing(false)
      setProcessingText('')
    }
  }

  /* VIDEO */

  const handleVideo = (
    file: File
  ) => {
    if (
      !file.type.startsWith('video/')
    ) {
      alert(
        'Please select a valid video file.'
      )
      return
    }

    setProcessing(true)
    setProcessingText(
      'Preparing video banner...'
    )

    try {
      const url =
        URL.createObjectURL(file)

      setForm(prev => ({
        ...prev,
        video: url,
      }))
    } catch {
      alert(
        'Unable to load video.'
      )
    } finally {
      setProcessing(false)
      setProcessingText('')
    }
  }

  /* PRESET */

  const changePreset = (
    value: string
  ) => {
    const preset =
      bannerPresets[
        value as keyof typeof bannerPresets
      ]

    if (!preset) return

    setForm(prev => ({
      ...prev,
      position: value,
      sizePreset: value,
      desktopWidth:
        preset.desktopWidth,
      desktopHeight:
        preset.desktopHeight,
      mobileWidth:
        preset.mobileWidth,
      mobileHeight:
        preset.mobileHeight,
    }))
  }

  /* OPEN NEW */

  const openNewBanner = () => {
    setEditingId(null)
    setForm(emptyBanner)
    setShowForm(true)
  }

  /* EDIT */

  const editBanner = (
    banner: Banner
  ) => {
    setEditingId(banner.id)

    setForm({
      title: banner.title,
      description: banner.description,
      type: banner.type,
      desktopImage:
        banner.desktopImage,
      mobileImage:
        banner.mobileImage,
      video: banner.video,
      position: banner.position,
      sizePreset:
        banner.sizePreset,
      desktopWidth:
        banner.desktopWidth,
      desktopHeight:
        banner.desktopHeight,
      mobileWidth:
        banner.mobileWidth,
      mobileHeight:
        banner.mobileHeight,
      buttonText:
        banner.buttonText,
      buttonLink:
        banner.buttonLink,
      startDate:
        banner.startDate,
      endDate:
        banner.endDate,
      status:
        banner.status,
    })

    setShowForm(true)
  }

  /* SAVE BANNER */

  const saveBanner = () => {
    if (!form.title.trim()) {
      alert(
        'Please enter a banner title.'
      )
      return
    }

    if (
      form.type === 'Image' &&
      !form.desktopImage
    ) {
      alert(
        'Please upload a desktop banner image.'
      )
      return
    }

    if (form.type === 'Video' && !form.video) {
      alert(
        'Please upload a video banner.'
      )
      return
    }

    if (editingId) {
      const updated =
        banners.map(banner =>
          banner.id === editingId
            ? {
                ...banner,
                ...form,
              }
            : banner
        )

      saveBanners(updated)
    } else {
      const newBanner: Banner = {
        id: `BAN-${String(
          banners.length + 1
        ).padStart(3, '0')}`,
        ...form,
        order:
          banners.length + 1,
        createdAt:
          new Date().toISOString(),
      }

      saveBanners([
        ...banners,
        newBanner,
      ])
    }

    setForm(emptyBanner)
    setEditingId(null)
    setShowForm(false)
  }

  /* DELETE */

  const deleteBanner = (
    id: string
  ) => {
    if (
      !confirm(
        'Delete this banner?'
      )
    ) {
      return
    }

    saveBanners(
      banners
        .filter(
          banner => banner.id !== id
        )
        .map(
          (banner, index) => ({
            ...banner,
            order: index + 1,
          })
        )
    )
  }

  /* STATUS */

  const toggleStatus = (
    id: string
  ) => {
    saveBanners(
      banners.map(banner =>
        banner.id === id
          ? {
              ...banner,
              status:
                banner.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : banner
      )
    )
  }

  /* DUPLICATE */

  const duplicateBanner = (
    banner: Banner
  ) => {
    const copy: Banner = {
      ...banner,
      id: `BAN-${String(
        banners.length + 1
      ).padStart(3, '0')}`,
      title:
        `${banner.title} Copy`,
      order:
        banners.length + 1,
      createdAt:
        new Date().toISOString(),
    }

    saveBanners([
      ...banners,
      copy,
    ])
  }

  /* MOVE ORDER */

  const moveBanner = (
    id: string,
    direction: 'up' | 'down'
  ) => {
    const sorted =
      [...banners].sort(
        (a, b) =>
          a.order - b.order
      )

    const index =
      sorted.findIndex(
        banner =>
          banner.id === id
      )

    const target =
      direction === 'up'
        ? index - 1
        : index + 1

    if (
      index < 0 ||
      target < 0 ||
      target >= sorted.length
    ) {
      return
    }

    const current =
      sorted[index]

    const swap =
      sorted[target]

    current.order =
      swap.order

    swap.order =
      current.order

    /*
     * Recalculate clean order.
     */
    sorted.sort(
      (a, b) =>
        a.order - b.order
    )

    sorted.forEach(
      (banner, i) => {
        banner.order =
          i + 1
      }
    )

    saveBanners(sorted)
  }

  return (
    <div>

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>

          <h1 className="text-2xl font-medium">
            Banners
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage promotional banners across your store.
          </p>
        </div>

        <button
          onClick={openNewBanner}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Add Banner
        </button>

      </div>

      {/* FORM */}

      {showForm && (
        <div className="bg-white border border-v-border p-6 md:p-8 mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-xs tracking-widest uppercase font-medium">
                {editingId
                  ? 'Edit Banner'
                  : 'New Banner'}
              </p>

              <p className="text-xs text-v-gray mt-1">
                Configure banner content, dimensions and display settings.
              </p>
            </div>

            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="p-2 text-v-gray hover:text-black"
            >
              <X size={18} />
            </button>

          </div>

          {/* BASIC INFO */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="md:col-span-2">

              <label className="block text-xs tracking-wider mb-2">
                Banner Title *
              </label>

              <input
                type="text"
                value={form.title}
                onChange={e =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="New Collection"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block text-xs tracking-wider mb-2">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={e =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                rows={3}
                placeholder="Short banner description..."
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black resize-none"
              />

            </div>

            {/* POSITION */}

            <div>

              <label className="block text-xs tracking-wider mb-2">
                Banner Position
              </label>

              <select
                value={form.position}
                onChange={e =>
                  changePreset(
                    e.target.value
                  )
                }
                className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
              >

                {Object.keys(
                  bannerPresets
                ).map(
                  preset => (
                    <option
                      key={preset}
                      value={preset}
                    >
                      {preset}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* TYPE */}

            <div>

              <label className="block text-xs tracking-wider mb-2">
                Banner Type
              </label>

              <select
                value={form.type}
                onChange={e =>
                  setForm({
                    ...form,
                    type:
                      e.target.value as
                        | 'Image'
                        | 'Video',
                  })
                }
                className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
              >
                <option value="Image">
                  Image Banner
                </option>

                <option value="Video">
                  Video Banner
                </option>
              </select>

            </div>

          </div>

          {/* SIZE INFO */}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-100">

            <p className="text-xs tracking-wider uppercase font-medium mb-3">
              Required Banner Size
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>

                <p className="text-xs text-v-gray mb-1">
                  Desktop
                </p>

                <p className="text-sm font-medium">
                  {form.desktopWidth} ×{' '}
                  {form.desktopHeight}px
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  Image will automatically be cropped and optimized to this ratio.
                </p>

              </div>

              <div>

                <p className="text-xs text-v-gray mb-1">
                  Mobile
                </p>

                <p className="text-sm font-medium">
                  {form.mobileWidth} ×{' '}
                  {form.mobileHeight}px
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  Recommended for mobile devices.
                </p>

              </div>

            </div>

          </div>

          {/* IMAGE BANNER */}

          {form.type === 'Image' && (
            <div className="mt-6">

              <p className="text-xs tracking-widest uppercase font-medium mb-4">
                Banner Images
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* DESKTOP */}

                <div>

                  <label className="block text-xs tracking-wider mb-2">
                    Desktop Banner *
                  </label>

                  <div className="border border-v-border">

                    {form.desktopImage ? (

                      <div className="relative">

                        <img
                          src={
                            form.desktopImage
                          }
                          alt="Desktop banner"
                          className="w-full aspect-[12/5] object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              desktopImage:
                                '',
                            })
                          }
                          className="absolute top-2 right-2 bg-black text-white p-2"
                        >
                          <X size={14} />
                        </button>

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          desktopInputRef.current?.click()
                        }
                        className="w-full aspect-[12/5] flex flex-col items-center justify-center hover:bg-gray-50"
                      >

                        <Upload
                          size={24}
                          className="text-gray-400 mb-3"
                        />

                        <span className="text-xs font-medium">
                          Upload Desktop Banner
                        </span>

                        <span className="text-[11px] text-gray-400 mt-1">
                          {form.desktopWidth} ×{' '}
                          {form.desktopHeight}px
                        </span>

                      </button>

                    )}

                  </div>

                  <input
                    ref={desktopInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file =
                        e.target.files?.[0]

                      if (file) {
                        handleDesktopImage(
                          file
                        )
                      }
                    }}
                  />

                </div>

                {/* MOBILE */}

                <div>

                  <label className="block text-xs tracking-wider mb-2">
                    Mobile Banner
                  </label>

                  <div className="border border-v-border">

                    {form.mobileImage ? (

                      <div className="relative">

                        <img
                          src={
                            form.mobileImage
                          }
                          alt="Mobile banner"
                          className="w-full aspect-[4/5] object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              mobileImage:
                                '',
                            })
                          }
                          className="absolute top-2 right-2 bg-black text-white p-2"
                        >
                          <X size={14} />
                        </button>

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={() =>
                          mobileInputRef.current?.click()
                        }
                        className="w-full aspect-[4/5] flex flex-col items-center justify-center hover:bg-gray-50"
                      >

                        <Upload
                          size={24}
                          className="text-gray-400 mb-3"
                        />

                        <span className="text-xs font-medium">
                          Upload Mobile Banner
                        </span>

                        <span className="text-[11px] text-gray-400 mt-1">
                          {form.mobileWidth} ×{' '}
                          {form.mobileHeight}px
                        </span>

                      </button>

                    )}

                  </div>

                  <input
                    ref={mobileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file =
                        e.target.files?.[0]

                      if (file) {
                        handleMobileImage(
                          file
                        )
                      }
                    }}
                  />

                </div>

              </div>

            </div>
          )}

          {/* VIDEO */}

          {form.type === 'Video' && (
            <div className="mt-6">

              <p className="text-xs tracking-widest uppercase font-medium mb-4">
                Video Banner
              </p>

              <div className="border border-v-border">

                {form.video ? (

                  <div className="relative bg-black">

                    <video
                      src={form.video}
                      controls
                      className="w-full max-h-[400px]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          video: '',
                        })
                      }
                      className="absolute top-2 right-2 bg-white text-black p-2"
                    >
                      <X size={14} />
                    </button>

                  </div>

                ) : (

                  <button
                    type="button"
                    onClick={() =>
                      videoInputRef.current?.click()
                    }
                    className="w-full py-16 flex flex-col items-center justify-center hover:bg-gray-50"
                  >

                    <Video
                      size={28}
                      className="text-gray-400 mb-3"
                    />

                    <span className="text-xs font-medium">
                      Upload Video Banner
                    </span>

                    <span className="text-[11px] text-gray-400 mt-1">
                      Recommended MP4 / WebM
                    </span>

                  </button>

                )}

              </div>

              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={e => {
                  const file =
                    e.target.files?.[0]

                  if (file) {
                    handleVideo(file)
                  }
                }}
              />

              <p className="text-[11px] text-gray-400 mt-2">
                Large video compression will be connected with Cloudflare processing later.
              </p>

            </div>
          )}

          {/* CTA */}

          <div className="mt-6">

            <p className="text-xs tracking-widest uppercase font-medium mb-4">
              Call To Action
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Button Text
                </label>

                <input
                  type="text"
                  value={form.buttonText}
                  onChange={e =>
                    setForm({
                      ...form,
                      buttonText:
                        e.target.value,
                    })
                  }
                  placeholder="Shop Now"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Button Link
                </label>

                <input
                  type="text"
                  value={form.buttonLink}
                  onChange={e =>
                    setForm({
                      ...form,
                      buttonLink:
                        e.target.value,
                    })
                  }
                  placeholder="/shop"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

            </div>

          </div>

          {/* SCHEDULE */}

          <div className="mt-6">

            <p className="text-xs tracking-widest uppercase font-medium mb-4">
              Schedule
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  value={form.startDate}
                  onChange={e =>
                    setForm({
                      ...form,
                      startDate:
                        e.target.value,
                    })
                  }
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  value={form.endDate}
                  onChange={e =>
                    setForm({
                      ...form,
                      endDate:
                        e.target.value,
                    })
                  }
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={e =>
                    setForm({
                      ...form,
                      status:
                        e.target.value as
                          | 'Active'
                          | 'Inactive',
                    })
                  }
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* PROCESSING */}

          {processing && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-100 flex items-center gap-3">

              <Loader2
                size={16}
                className="animate-spin"
              />

              <span className="text-xs text-gray-600">
                {processingText}
              </span>

            </div>
          )}

          {/* FORM ACTIONS */}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-v-border">

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="px-5 py-3 border border-v-border text-xs tracking-wider"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={processing}
              onClick={saveBanner}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider disabled:opacity-50"
            >
              {editingId
                ? 'Update Banner'
                : 'Save Banner'}
            </button>

          </div>

        </div>
      )}

      {/* BANNER LIST */}

      <div className="bg-white border border-v-border overflow-hidden">

        {banners.length === 0 ? (

          <div className="py-20 text-center">

            <ImageIcon
              size={30}
              className="mx-auto mb-4 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No banners created yet.
            </p>

            <button
              onClick={openNewBanner}
              className="mt-4 text-xs underline"
            >
              Create your first banner
            </button>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead>

                <tr className="border-b border-v-border bg-v-light">

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Banner
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Type
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Position
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Size
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-v-border">

                {[...banners]
                  .sort(
                    (a, b) =>
                      a.order - b.order
                  )
                  .map(banner => (

                    <tr
                      key={banner.id}
                      className="hover:bg-v-light transition-colors"
                    >

                      {/* BANNER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4">

                          <div className="w-28 h-16 bg-gray-100 flex items-center justify-center overflow-hidden">

                            {banner.type ===
                              'Video' &&
                            banner.video ? (

                              <video
                                src={
                                  banner.video
                                }
                                muted
                                className="w-full h-full object-cover"
                              />

                            ) : banner.desktopImage ? (

                              <img
                                src={
                                  banner.desktopImage
                                }
                                alt={
                                  banner.title
                                }
                                className="w-full h-full object-cover"
                              />

                            ) : (

                              <ImageIcon
                                size={20}
                                className="text-gray-400"
                              />

                            )}

                          </div>

                          <div>

                            <p className="text-sm font-medium">
                              {banner.title}
                            </p>

                            <p className="text-xs text-v-gray mt-1">
                              {banner.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-4">

                        <span className="flex items-center gap-2 text-xs text-v-gray">

                          {banner.type ===
                          'Video' ? (
                            <Video
                              size={13}
                            />
                          ) : (
                            <ImageIcon
                              size={13}
                            />
                          )}

                          {banner.type}

                        </span>

                      </td>

                      {/* POSITION */}

                      <td className="px-6 py-4 text-xs text-v-gray">
                        {banner.position}
                      </td>

                      {/* SIZE */}

                      <td className="px-6 py-4">

                        <p className="text-xs">
                          Desktop
                        </p>

                        <p className="text-[11px] text-v-gray">
                          {
                            banner.desktopWidth
                          }{' '}
                          ×{' '}
                          {
                            banner.desktopHeight
                          }
                        </p>

                        <p className="text-xs mt-2">
                          Mobile
                        </p>

                        <p className="text-[11px] text-v-gray">
                          {
                            banner.mobileWidth
                          }{' '}
                          ×{' '}
                          {
                            banner.mobileHeight
                          }
                        </p>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <button
                          onClick={() =>
                            toggleStatus(
                              banner.id
                            )
                          }
                          className={`text-xs px-2 py-1 ${
                            banner.status ===
                            'Active'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {
                            banner.status
                          }
                        </button>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-1">

                          <button
                            onClick={() =>
                              moveBanner(
                                banner.id,
                                'up'
                              )
                            }
                            className="p-2 text-v-gray hover:text-black"
                            title="Move up"
                          >
                            <ChevronUp
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              moveBanner(
                                banner.id,
                                'down'
                              )
                            }
                            className="p-2 text-v-gray hover:text-black"
                            title="Move down"
                          >
                            <ChevronDown
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              setPreview(
                                banner
                              )
                            }
                            className="p-2 text-v-gray hover:text-black"
                            title="Preview"
                          >
                            <Eye
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              duplicateBanner(
                                banner
                              )
                            }
                            className="p-2 text-v-gray hover:text-black"
                            title="Duplicate"
                          >
                            <Copy
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              editBanner(
                                banner
                              )
                            }
                            className="p-2 text-v-gray hover:text-black"
                            title="Edit"
                          >
                            <Edit
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              deleteBanner(
                                banner.id
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

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* PREVIEW MODAL */}

      {preview && (

        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() =>
            setPreview(null)
          }
        >

          <div
            className="bg-white max-w-6xl w-full max-h-[90vh] overflow-auto p-5"
            onClick={e =>
              e.stopPropagation()
            }
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-sm font-medium">
                  {preview.title}
                </p>

                <p className="text-xs text-v-gray mt-1">
                  {preview.position}
                </p>

              </div>

              <button
                onClick={() =>
                  setPreview(null)
                }
                className="p-2"
              >
                <X size={18} />
              </button>

            </div>

            {preview.type ===
              'Video' ? (

              <video
                src={preview.video}
                controls
                autoPlay
                className="w-full max-h-[70vh] bg-black"
              />

            ) : (

              <div className="space-y-6">

                {preview.desktopImage && (
                  <div>

                    <p className="text-xs text-v-gray mb-2">
                      Desktop
                    </p>

                    <img
                      src={
                        preview.desktopImage
                      }
                      alt={
                        preview.title
                      }
                      className="w-full"
                    />

                  </div>
                )}

                {preview.mobileImage && (
                  <div className="max-w-sm mx-auto">

                    <p className="text-xs text-v-gray mb-2">
                      Mobile
                    </p>

                    <img
                      src={
                        preview.mobileImage
                      }
                      alt={
                        preview.title
                      }
                      className="w-full"
                    />

                  </div>
                )}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  )
}
