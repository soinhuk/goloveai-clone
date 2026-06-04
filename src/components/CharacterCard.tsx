import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Character } from '../types'

interface Props {
  character: Character
  className?: string
}

export default function CharacterCard({ character, className = '' }: Props) {
  const { name, username, avatar, tags = [], bio, isLive, age } = character
  const [hovering, setHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nsfwAvatar = avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')
  const videoAvatar = avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')

  const handleMouseEnter = () => {
    setHovering(true)
    videoRef.current?.play().catch(() => {})
  }
  const handleMouseLeave = () => {
    setHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link
      to={`/chat/${username}`}
      className={`group/card @container relative flex flex-col justify-between overflow-hidden rounded-[22px] select-none
        before:absolute before:inset-x-0 before:bottom-0 before:z-[2] before:h-[60%] before:bg-gradient-to-t before:from-black/90 before:to-transparent
        after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:bg-[linear-gradient(180deg,rgba(232,27,157,0)_56.76%,#E81B9D_100%)] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100
        h-[320px] w-full desktop:h-[420px] min-[1921px]:h-auto min-[1921px]:aspect-[2/3]
        ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid h-full w-full auto-cols-[100%] grid-flow-col">
          <div>
            {/* NSFW Image (hidden by default, shown on hover) */}
            <img
              src={nsfwAvatar}
              alt={name}
              className={`absolute inset-0 z-[0] h-full w-full object-cover transition-opacity duration-300 ${
                hovering ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            {/* SFW Image (shown by default) */}
            <img
              src={avatar}
              alt={name}
              className={`absolute inset-0 z-[0] h-full w-full object-cover transition-opacity duration-300 ${
                hovering ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {/* Video (plays on hover) */}
            {videoAvatar && (
              <video
                ref={videoRef}
                src={videoAvatar}
                loop
                playsInline
                preload="auto"
                className={`pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300 ${
                  hovering ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-[3] mt-auto p-[12px] select-text desktop:p-[16px]">
        <div className="flex items-baseline gap-[4px]">
          <span className="text-[16px] leading-[16px] font-[600] tracking-[-4%] text-white">{name}</span>
          {age && <span className="text-[16px] leading-[16px] font-[400] tracking-[-4%] text-white/50">{age}</span>}
        </div>
        {bio && (
          <div className="mt-[8px] line-clamp-2 text-[12px] leading-[18px] font-[400] tracking-[-4%] text-white/[64%]">
            {bio}
          </div>
        )}
        {tags.length > 0 && (
          <div className="mt-[8px] flex flex-wrap gap-[4px]">
            {tags.slice(0, 4).map((tag, i) => (
              <p key={i} className="rounded-full bg-white/10 px-[8px] py-[5px] text-[10px] leading-[12px] font-[400] tracking-[-4%] capitalize backdrop-blur-[12px]">
                {tag}
              </p>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
